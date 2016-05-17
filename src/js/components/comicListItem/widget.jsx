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
	handleWidgetState: function() {
		var self = this,
			comic = self.props.comic;

		if(this.state.mode == 'collapsed') {
			return;
		} else {
			return <ComicDetail comic={comic}/>;
		}
	},
	render: function() {
		var self = this,
			comic = self.props.comic;
		return (
		    <div className="comicListItem" onClick={this.handleClick}>
		    	{comic.seriesTitle} #{comic.issueNumber}
		    	{this.handleWidgetState()}
		    </div>
		);
  }
});