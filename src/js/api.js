var $ = require('jquery'),
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

api.getComics = function(storeDate, options) {
    storeDate = storeDate || '2016-05-11';
    options = options || apiDefaults;

    var comicResponse = [],
        comics = [],
        totalPages,
        dfd = $.Deferred();

    function getData(page) {
        page = page || 1;

        var offset = ((page-1)*options.pageSize);

        $.ajax({
            url: buildUrl(offset),
            dataformat: options.apiDataFormat,
            dataType:options.apiDataType
        }).done(function(resp) {
            handleSuccess(page, resp);
        }).fail(function(err) {
            handleError(err);
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
        comicResponse = comicResponse.concat(resp.results);

        console.log('Data Retrieved - ' + page + '/' + totalPages)
        if(page < totalPages) {
            getData(page + 1);
        } else {
            processFinalData();
            dfd.resolve(comics.sort(sortBySeriesTitle));
        }
    }

    function sortBySeriesTitle(a,b) {
        if(a.seriesTitle < b.seriesTitle) {
            return -1;
        }
        if(a.seriesTitle > b.seriesTitle) {
            return 1;
        }
        return 0;
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

    function processFinalData() {
        $.each(comicResponse, function(i, oComic) {
            var comic = {
                seriesTitle: oComic.volume.name,
                issueNumber: oComic.issue_number,
                issueTitle: oComic.name,
                description: oComic.description,
                thumbnailUrl: oComic.image.icon_url,
                link: oComic.site_detail_url
            }
            comics.push(comic);
        });
    }

    getData();

    return dfd.promise();
};

module.exports = api;