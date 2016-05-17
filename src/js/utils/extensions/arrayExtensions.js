Array.prototype.find = function (searchStr) {
    var returnArray = false;
    for (i = 0; i < this.length; i++) {
        if (searchStr instanceof RegExp) {
            if (searchStr.test(this[i])) {
                if (!returnArray) {
                    returnArray = []
                }
                returnArray.push(i);
            }
        } else {
            if (this[i] === searchStr) {
                if (!returnArray) {
                    returnArray = []
                }
                returnArray.push(i);
            }
        }
    }
    return returnArray;
};

Array.prototype.findanddeletebysubtitle = function (val) {
    var new_arr = [];
    for ( var i = 0; i < this.length; i++ ) {
        if ( this[i].name !== val ) {
            new_arr.push(this[i]);
        }
    }
    return new_arr;
};