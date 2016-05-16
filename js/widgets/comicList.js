require('./comicListItem.js');

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