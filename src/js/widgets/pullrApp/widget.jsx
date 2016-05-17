import React from 'react';
import {render} from 'react-dom';

require('./widget.css');

var api = require('../../api.js'),
	ComicList = require('../comicList/widget.jsx'),
	loadScreen = require('../loadScreen/widget.jsx');

module.exports = React.createClass({
	getInitialState: function(){
		this.handleLoad();
		return {
			appName: 'Pullr',
			comics: [],
			mode: 'loading'
		}
	},
	handleWidgetState: function() {
		if(this.state.mode === 'loading') {
			return <h1>LOADING</h1>
		} else {
			return <ComicList comics={this.state.comics} />;
		}
	},
	handleLoad: function() {
		var self = this;
		api.getComics().done(function(resp) {
			self.setState({
				storeDate: resp.storeDate,
				comics: resp.comics,
				mode: 'list'
			});
		});
	},
	render: function() {
    	return (
    		<div className="pullrApp">
				<h1>{this.state.appName}</h1>
				<h3>{this.state.storeDate}</h3>
				{this.handleWidgetState()}
			</div>
    	);
  	}
});