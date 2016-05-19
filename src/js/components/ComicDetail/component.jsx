import React from 'react';
import {render} from 'react-dom';

require('./component.css');

module.exports = React.createClass({
	loadImage: function() {
		var self = this,
			props = self.props;
		if(props.imageLoaded) {
			return <img className="thumbnail" src={props.comic.thumbnailUrl}/>;
		}
	},
	render: function() {
  		var self = this,
  			comic = this.props.comic;

    	return (
        	<div className="comicDetail">
        		{self.loadImage()}
        		<div dangerouslySetInnerHTML={{__html: comic.description}}></div>
        		}
        	</div>
    	);
  	}
});