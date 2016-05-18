import React from 'react';
import {render} from 'react-dom';

require('./widget.css');

var ComicDetail = require('../comicDetail/widget.jsx');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			mode: 'collapsed'
		}
	},
	handleClick: function() {
		var self = this;

		if(self.state.mode == 'collapsed') {
			self.setState({mode:'expanded'});
		} else {
			self.setState({mode: 'collapsed'});
		}
	},
	isCollapsed: function() {
		var self = this,
			state = self.state;
		if(state.mode == 'collapsed') {
			return 'hidden';
		} else {
			return '';
		};
	},
	render: function() {
		var self = this,
			state = self.state,
			comic = self.props.comic;
		return (
		    <div className="comicListItem" onClick={this.handleClick}>
		    	{comic.seriesTitle} #{comic.issueNumber}
		    	<div className={self.isCollapsed()}>
			    	<ComicDetail comic={comic}/>
			    </div>
		    </div>
		);
  }
});