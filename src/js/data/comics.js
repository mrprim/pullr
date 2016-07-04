require('../utils/extensions/dateExtensions.js');
var request = require('request');

var $ = require('jquery'),
    moment = require('moment'),
    sortComicsFuncs = require('../utils/sortComicsFuncs.js'),
    api = api || {},
    apiDefaults = {
        apiBaseUrl: "https://www.comicvine.com/api/issues/?",
        apiKey: "bbcc02c540fae8bc000887561a696eb2a0a851f9",
        pageSize: 100,
        apiFormat: "jsonp",
        apiSort: "volume:asc",
        apiJsonCallback: "?",
        apiCallback: "?",
        apiDataformat: "json",
        apiDataType: "jsonp"
    };

api.getComics = function(user, storeDate, options) {
    storeDate = getStoreDate(storeDate);
    options = options || apiDefaults;

    var comicResponse = [],
        comics = [],
        totalPages;
//        dfd = $.Deferred();

    function getStoreDate(date) {
        var ret = new Date(date||new Date());
        if (ret.getDay() == 2) {
            ret.setDate(ret.getDate() + (3 - 1 - ret.getDay() + 7) % 7 + 1);
        } else {
            ret.setDate(ret.getDate() + (3 - 1 - ret.getDay() + 7) % 7 + 1 - 7);
        };
        return ret.yyyymmdd();
    };

    function getData(page) {
        page = page || 1;

        var offset = ((page-1)*options.pageSize);

        request(buildUrl(offset), function(err, resp, body) {
           body = JSON.parse(body);
           return body;
         });
    };

    function buildUrl(offset) {
        var apiUrl = '';

        apiUrl += options.apiBaseUrl; 
        apiUrl += "api_key=" + options.apiKey;
        apiUrl += "&format=" + options.apiFormat;
        apiUrl += "&offset=" + offset;
        apiUrl += "&filter=store_date:" + storeDate;
        apiUrl += "&sort=" + options.apiSort;
        apiUrl += "&json_callback=" + options.apiJsonCallback;
        apiUrl += "&callback=" + options.apiCallback;

        return apiUrl;
    };

    function handleSuccess(page, resp) {
        getTotalPages(resp);
        if(totalPages === 0) {
            console.log('No records returned.');
            dfd.reject();
            return;
        }
        comicResponse = comicResponse.concat(resp.results);

        console.log('Data Retrieved - ' + page + '/' + totalPages)
        if(page < totalPages) {
            getData(page + 1);
        } else {
            processComics();
            dfd.resolve({
                storeDate: storeDate,
                comics: comics.sort(sortComicsFuncs.sortByUserSearchAndSeriesTitle)
            });
        }
    }

    function handleError(err) {
        console.log(err);
        dfd.reject();
    };

    function getTotalPages(resp) {
        if(!totalPages) {
          totalPages = Math.ceil(resp.number_of_total_results/100);   
        }
    };

    function processComics() {
        $.each(comicResponse, function(i, oComic) {
            var comic = mapComic(oComic);
            markUserInfo(comic);
            comics.push(comic);
        });
    };

    function mapComic(comic) {
        return {
            seriesTitle: comic.volume.name,
            issueNumber: comic.issue_number,
            issueTitle: comic.name,
            description: comic.description,
            thumbnailUrl: comic.image.icon_url,
            link: comic.site_detail_url
        };
    };

    function markUserInfo(comic) {
        markSavedComic(comic);
        markSearchTerms(comic);
    };

    function markSavedComic(comic) {
        $.each(user.comics, function(i, savedComic) {
            if(comic.seriesTitle.toUpperCase() === savedComic.toUpperCase()) {
                comic.saved = true;
                return false;
            }
        });
    }

    function markSearchTerms(comic) {
        $.each(user.searchTerms, function(i, searchTerm) {
            var re = new RegExp(searchTerm, "i");
            if(comic.seriesTitle.match(re)) {
                comic.searched = true;
                return false;
            }
        });
    }
    getData();

    return dfd.promise();
};

module.exports = api;