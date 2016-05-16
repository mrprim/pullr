/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var pullr = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./pullr.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./pullr.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n\tbackground-color: green;\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["pullr"] = __webpack_require__(6);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var users = __webpack_require__(7);
	var _comictypes = {
	    trades: ["TPB","HC","SC","HC/SC","Volume","Vol.","GN"]
	};

	var pullr = {};
	pullr.api = __webpack_require__(8);


	__webpack_require__(9);

	$.fn.pullr = function(options) {
	    var self = this,
	        opts = $.extend({}, $.fn.pullr.defaults, options);

	    function build() {
	        self.addClass('pullr');
	        buildList();
	        load();
	    };

	    function buildList() {
	        self.list = $('<div/>').comicList().appendTo(self);
	    };

	    function load(storeDate) {
	        pullr.api.getComics(storeDate).done(function(resp) {
	            self.list.set();
	        });
	    };

	    build();

	    return self;
	};

	$.fn.pullr.defaults = {};

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

/***/ },
/* 7 */
/***/ function(module, exports) {

	var users = [
	    {
	        firstname:"Sergio",
	        lastname:"Rodriguez",
	        role:"Admin",
	        searchterms:[
	            "Unwritten"
	            ,"B.P.R.D."
	            ,"Creepy"
	            ,"Abe Sapien"
	            ,"Hellboy"
	            ,"Atomic Robo"
	            ,"Witch"
	            ,"Adr"
	        ],
	        comics: [
	            "Ghost Racers"
	            ,"Inhumans"
	            ,"Thors"
	        ]
	    }
	    ,{
	        firstname:"Steele",
	        lastname:"Simpson",
	        role:"User",
	        searchterms:[
	            "Sonja"
	            ,"Deadpool"
	            ,"Thor"
	            ,"Conan"
	            ,"Loki"
	            ,"Turtles"
	        ],
	        comics: [
	            "Weirdworld"
	            ,"Deadpool's Secret Secret Wars"
	        ]
	    }
	]

	module.exports = users;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var api = api || {},
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
	            dfd.resolve(comics);
	        }
	    };

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
	                thumbnailUrl: 'http://static.comicvine.com/' + oComic.image.icon_url,
	                link: oComic.site_detail_url
	            }
	            comics.push(comic);
	        });
	    }

	    getData();

	    return dfd.promise();
	};

	module.exports = api;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);

	$.fn.comicList = function(options) {
	    var self = this,
	        opts = $.extend({}, $.fn.comicList.defaults, options);

	    function build() {
	        self.addClass('comicList');
	    };

	    function set(data) {
	        $.each(data, function(i, obj) {
	            $('<div/>').comicListItem().appendTo(self);
	        });
	    };

	    build();

	    return self;
	};

	$.fn.comicList.defaults = {};

/***/ },
/* 10 */
/***/ function(module, exports) {

	$.fn.comicListItem = function(options) {
	    var self = this,
	        opts = $.extend({}, $.fn.comicListItem.defaults, options);

	    function build() {
	        self.addClass('comicListItem');
	    };

	    function set() {

	    };

	    build();

		return self;
	};

	$.fn.comicListItem.defaults = {};

/***/ }
/******/ ]);