import React from 'react';
import {render} from 'react-dom';

require('./widget.css');

module.exports = React.createClass({
  render: function() {
  	var comic = this.props.comic;

    return (
        <div className="comicDetail">
        	<img className="thumbnail" src={comic.thumbnailUrl}/>
        	<div dangerouslySetInnerHTML={{__html: comic.description}}></div>
        </div>
    );
  }
});