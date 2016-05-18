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

	setIcons: function() {
		var self = this,
			comic = self.props.comic,
			icons = [];

		if(comic.issueNumber == 1) {
			icons.push(<span>#1</span>);
		}

		if(comic.saved) {
			icons.push(<span className="fa fa-star"></span>);
		} 

		if (comic.searched) {
			icons.push(<span className="fa fa-search"></span>);
		}

		return icons;
	},

	setClass: function() {
		var self = this,
			comic = self.props.comic,
			className = 'comicListItem';

		if(comic.issueNumber == 1) {
			className += ' number-one';
		}

		if(comic.saved) {
			className += ' saved';
		}

		if (comic.searched) {
			className += ' searched';
		}

		return className;
	},

	render: function() {
		var self = this,
			state = self.state,
			comic = self.props.comic;

		return (
		    <div className={self.setClass()} onClick={self.handleClick}>
		    	{comic.seriesTitle} #{comic.issueNumber}
		    	<div className="icons">
			    	{self.setIcons()}
			    </div>
		    	<div className={self.isCollapsed()}>
			    	<ComicDetail comic={comic}/>
			    </div>
		    </div>
		);
  }
});