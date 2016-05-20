import React from 'react';
import {render} from 'react-dom';

require('./component.css');

module.exports = React.createClass({
  handleSearch: function(event) {
    var self = this;

    self.props.search(event.target.value);
  },
  render: function() {
  		var self = this;

    	return (
        	<div className="comicSearch">
            <input name="search" onChange={self.handleSearch}/>
        	</div>
    	);
  	}
});