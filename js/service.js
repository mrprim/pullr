var pullr = pullr || {};

pullr.getComics = function(storeDate, page, options) {
    page = page || 1;
    options = options || {};

    var offset = ((page-1)*options.pageSize),
        comics = [],
        totalPages;

    function buildUrl() {
        var apiUrl = '';

        apiUrl += options.apiBaseUrl; 
        apiUrl += "api_key=" + options.apiKey;
        apiUrl += "&format=" + options.apiFormat;
        apiUrl += "&offset=" + offset;
        apiUrl += "&filter=store_date:" + storeDate;
        apiUrl += "&sort=" + options.apiSort;
        apiUrl += "&json_callback=" + options.apiJsonCallback;
        apiUrl += "&callback=" + options.apiCallback;
    }

    $.ajax({
        url: buildUrl(),
        dataformat: options.apiDataFormat,
        dataType:options.apiDataType
    }).done(function(resp) {
        if(!totalpages) {
          totalpages = Math.ceil(resp.number_of_total_results/100);   
        }
        $.merge(comics, resp.results);
        if(page === totalPages) {
            pullr.getComics(storeDate, page + 1, options);
        } else {
            console.log(resp);
        }
    });
};

module.exports = pullr;