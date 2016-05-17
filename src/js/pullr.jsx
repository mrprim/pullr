import React from 'react';
import {render} from 'react-dom';

var $ = require('jquery'),
    PullrApp = require('./components/pullrApp/widget.jsx');

render(<PullrApp/>, document.getElementById('pullr'));

//pullr.api = require('./api.js');


//require('./widgets/comicList.js');

/*
$.fn.pullr = function(options) {
    var self = this,
        opts = $.extend({}, $.fn.pullr.defaults, options);

    function build() {
        self.addClass('pullr');
        buildList();
        load();
    }

    function buildList() {
        self.list = $('<div/>').comicList().appendTo(self);
    }

    function load(storeDate) {
        pullr.api.getComics(storeDate).done(function(resp) {
            self.list.set();
        });
    }

    build();

    return self;
};

$.fn.pullr.defaults = {};
*/

module.exports = pullr;
/*
$(function($){
    //OnPageLoad
    _user = getUser(GetQueryStringParams('u'));
    _store_date = getStoreDate(GetQueryStringParams('d'));
    $("#list").hide();
    $("#loadingmessage").html("Connecting to the ComicVine API");
    getComics(0);
    $("#showones").click(function(e) {
        getNumberOnes();
    });
    $("#thisweek").click(function(e) {
        getThisWeek();
    });

    function titleSort(a,b) {
        if (a.volume.name < b.volume.name)
            return -1;
        if (a.volume.name > b.volume.name)
            return 1;
        return 0;
    };

    function mycomicSort(a,b) {
        if (a.mycomic < b.mycomic)
            return 1;
        if (a.mycomic == b.mycomic) {
            if (a.volume.name < b.volume.name) {
                return -1
            }
            if (a.volume.name > b.volume.name) {
                return 1
            }
        }
        if (a.mycomic > b.mycomic)
            return -1;
        return 0;
    };

    function getUser(userid) {
        userid = userid||0;
        var user = users[userid];
        $("#myModalLabel").html(user.firstname + "'s Account");
        for (i = 0; i < user.comics.length; i++) {
            $("#mycomics").append("<li><div class='label label-info' style='inline'>" + user.comics[i] + "</div></li>");
        }
        for (i = 0; i < user.searchterms.length; i++) {
            $("#mysearch").append("<li><div class='label label-default'>" + user.searchterms[i] + "</div></li>");
        }
            
        return user;
    };

    function setLabels() {
        $("#datelabel").html(_user.firstname + "'s Comics for " + _store_date)
        var thisweek = filterList.issuetitle(_comictypes.trades,_comics,true);
        var numberones = filterList.issuetitle(_comictypes.trades,filterList.issuenumber(["1"],_comics),true);
        $("#thisweek").find(".badge").html(thisweek.length);
        $("#showones").find(".badge").html(numberones.length);
    };



    function getNumberOnes(){
        var numberones = filterList.issuetitle(_comictypes.trades,filterList.issuenumber(["1"],_comics),true);
        numberones.sort(mycomicSort);
        buildComicList(numberones);
        $("#navbarbuttons li").removeClass("bg-primary");
        $("#showones").closest("li").addClass("bg-primary");
    };

    function getThisWeek(){
        var thisweek = filterList.issuetitle(_comictypes.trades,_comics,true)
        thisweek.sort(mycomicSort);
        buildComicList(thisweek);
        $("#navbarbuttons li").removeClass("bg-primary");
        $("#thisweek").closest("li").addClass("bg-primary");
    };

    function cleanupComics() {
        // THIS IS NOT WORKING
        // comics.findanddeletebysubtitle("Part One, In Which Wicked Somethings This Way Come");
        _comics.sort(titleSort);
        addListIndex(_comics);
        for (i=0;i <_comics.length; i++) {
            _comics[i].mycomic = 0;
        }
        markMySearches(_user.searchterms,_comics);
        markMyComics(_user.comics,_comics);
        console.log("Added List Index");
        console.log(_comics);

    }

    function addListIndex(array) {
        for(i=0; i < array.length; i++) {
            array[i].listindex = i;
        }
    };
		
    function buildComicList(comics) {
        $("#titlelist").empty("");
        $("#titlelist").append("<li class='list-group-item list-group-item-info'>" + comics.length + " Issues</li>")
        for (i=0; i < comics.length; i++) {
            var name = comics[i].volume.name + ' #' + comics[i].issue_number;
            var listindex = comics[i].listindex
            var star = "";
            if (comics[i].mycomic == 2) {
                star = "<span class='pull-right'><span class='glyphicon glyphicon-star blue'></span></span>"
            } else if (comics[i].mycomic == 1){
                star = "<span class='pull-right'><span class='glyphicon glyphicon-search'></span></span>"
            }
            //FOR CALLING DETAILS FROM THE COMICSVINE API -- REMOVED
            //var detailHref = _comics[i].api_detail_url;
            //var link ="<li><a href='#' class='comiclink list-group-item' data-detailHref='" + detailHref + "'>"+name+"</a></li>";

            var link ="<li class=''><a href='#' class='comiclink list-group-item' data-listindex='" + listindex + "'>"+star+name+"</a></li>";
            $("#titlelist").append(link);
        }
        $(".comiclink").on("click",function(e) {
            $(".comiclink").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
            getComicDetail($(this));
            return false;
        });

    }

    function getComicDetail(tar) {
        $(".listcomicdetail").remove();
        $("#comicdetail").empty();
        var target = tar;
        var comic = _comics[target.data("listindex")];
        var title = comic.volume.name||'';
        var issuenumber = comic.issue_number||'';
        var issuetitle = comic.name||'';
        var desc  = comic.description||'No description provided.'
        var thumb = 'http://static.comicvine.com/' + comic.image.icon_url||''
        var link = comic.site_detail_url||''
        var html = "<div class='comicdetail'>"+
                "<h1>"+title + " #" + issuenumber +"</h1>" +
                "<h3>" + issuetitle + "</h3>" +
                "<img src='" + thumb + "'/>" +
                "<p>" + desc + "</p>" +
                "</div>";
        $("#comicdetail").html(html);
        $(target).append("<div class='visible-sm visible-xs listcomicdetail'>"+html+"</div>");

        // $('html, body').animate({
        //     scrollTop: $(target).offset().top
        // }, 500);

        //FOR USE WITH PULLING DETAIL INFO FROM COMICVINE API - REMOVED
        //$.ajax({
        //    url: tar.data("detailhref") + "?" +
        //    "api_key=" + _apiKey +
        //    "&format=jsonp" +
        //    "&json_callback=?" +
        //    "&callback=?",
        //    dataformat:"json",
        //    dataType:"jsonp",
        //    qty_input:tar,
        //    cache:true,
        //    success:function(result) {
        //        var target = this.qty_input;
        //        var comic = result.results;
        //        var name = comic.volume.name||'';
        //        var desc  = comic.description||'No description provided.'
        //        var thumb = 'http://static.comicvine.com/' + comic.image.icon_url||''
        //        var link = comic.site_detail_url||''
        //        var html = "<div class='comicdetail'>"+
        //                "<h3>"+name+"</h3>" +
        //                "<img src='" + thumb + "'/>" +
        //                "<p>" + desc + "</p>" +
        //                "</div>";
        //        target.after(html);
        //    }
        //});
    };

    var filterList = {
        issuetitle:function (searchArray, srcArray, boolreturninverse) {
            boolreturninverse = boolreturninverse || false;
            var src = [];
            var result = [];
            var fin = [];

            for (i = 0; i < srcArray.length; i++) {
                src.push(srcArray[i].name)
            }

            for (v = 0; v < searchArray.length; v++) {
                var srch = searchArray[v]
                var a = src.find(RegExp(srch, "i"))
                console.log(a)
                if (a) {
                    var result = result.concat(a);
                }
            }

            if (srcArray[result[0]] == undefined && result.length == 1) {
                return []
            } else {
                for (i = 0; i < result.length; i++) {
                    fin.push(srcArray[result[i]])
                }
                if (boolreturninverse) {
                    var diff = $(srcArray).not(fin).get();
                    fin = diff
                }
                return fin;
            }
        },
        issuenumber:function (searchArray,srcArray, boolreturninverse) {
            boolreturninverse = boolreturninverse || false;
            var src = [];
            var result = [];
            var fin = [];

            for (i = 0; i < srcArray.length; i++) {
                src.push(srcArray[i].issue_number)
            }

            for (v = 0; v < searchArray.length; v++) {
                var srch = searchArray[v]
                var a = src.find(srch)
                console.log(a)
                if (a) {
                    var result = result.concat(a);
                }
            }

            if (srcArray[result[0]] == undefined && result.length == 1) {
                return []
            } else {
                for (i = 0; i < result.length; i++) {
                    fin.push(srcArray[result[i]])
                }
                if (boolreturninverse) {
                    var diff = $(srcArray).not(fin).get();
                    fin = diff
                }
                return fin;
            }
        }

    }

    function markMySearches(searchArray, srcArray){
        var src = [];
        var result = [];
        var fin = [];

        for (i = 0; i < srcArray.length; i++) {
            src.push(srcArray[i].volume.name)
        }

        for (v = 0; v < searchArray.length; v++) {
            var srch = searchArray[v]
            var a = src.find(RegExp(srch, "i"))
            console.log(a)
            if (a) {
                var result = result.concat(a);
            }
        }

        if (srcArray[result[0]] == undefined && result.length == 1) {
        } else {
            for (i = 0; i < result.length; i++) {
                srcArray[result[i]].mycomic=1;
            }
        }
    }

    function markMyComics(searchArray, srcArray){
        var src = [];
        var result = [];
        var fin = [];

        for (i = 0; i < srcArray.length; i++) {
            src.push(srcArray[i].volume.name)
        }


        for (v = 0; v < searchArray.length; v++) {
            var srch = searchArray[v]
            var a = src.find(srch)
            console.log(a)
            if (a) {
                var result = result.concat(a);
            }
        }

        if (srcArray[result[0]] == undefined && result.length == 1) {
        } else {
            for (i = 0; i < result.length; i++) {
                srcArray[result[i]].mycomic=2;
            }
        }
    }

    function getStoreDate(date) {
        var ret = new Date(date||new Date());
        if (ret.getDay() == 2) {
            ret.setDate(ret.getDate() + (3 - 1 - ret.getDay() + 7) % 7 + 1);
        } else {
            ret.setDate(ret.getDate() + (3 - 1 - ret.getDay() + 7) % 7 + 1 - 7);
        };
        return ret.yyyymmdd();
    };

    function GetQueryStringParams(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            };
        };
    };
})*/

module.exports = $.fn.pullr;