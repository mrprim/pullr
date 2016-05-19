module.exports = {
	sortBySeriesTitle: function(a,b) {
        if(a.seriesTitle < b.seriesTitle) {
            return -1;
        }
        if(a.seriesTitle > b.seriesTitle) {
            return 1;
        }
        return 0;
    },
	sortByUserSearchAndSeriesTitle: function(a,b) {
        if(a.saved && !b.saved) {
            return -1;
        }
        if(!a.saved && b.saved) {
            return 1;
        }
        if(a.searched && !b.searched) {
            return -1;
        }
        if(!a.searched && b.searched) {
            return 1;
        }
        if(a.seriesTitle < b.seriesTitle) {
            return -1;
        }
        if(a.seriesTitle > b.seriesTitle) {
            return 1;
        }
        return 0;
    },

}