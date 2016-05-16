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