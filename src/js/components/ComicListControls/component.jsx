import React from 'react';
import {render} from 'react-dom';

require('./component.css');

module.exports = React.createClass({
    handleFilterClick: function(filter) {
        var self = this;

        self.props.setComicsFilter(filter);
    },

    handleSortClick: function(sortFuncName) {
        var self = this;

        self.props.setComicsSort(sortFuncName);        
    },
    
    render: function() {
        var self = this;

        return (
            <div>
                <span className="fa fa-star" onClick={self.handleFilterClick.bind(self,'mine')}></span>
                <span className="fa fa-sort-alpha-asc" onClick={self.handleSortClick.bind(self,'sortByUserSearchAndSeriesTitle')}></span>
            </div>
        );
    }
});