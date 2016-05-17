import React from 'react';
import {render} from 'react-dom';

require('./widget.css');

var api = require('../../api.js'),
	ComicList = require('../comicList/widget.jsx'),
	loadScreen = require('../loadScreen/widget.jsx');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			appName: 'Pullr',
			mode: 'loading'
		}
	},

	componentDidMount: function() {
		var self = this;

		self.load();
	},

	handleWidgetState: function() {
		var self = this,
			state = self.state;

		if(state.mode === 'loading') {
			return <h1>LOADING</h1>
		} else {
			return <ComicList comics={state.comics} />;
		}
	},

	load: function() {
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
		var self = this,
			state = self. state;

    	return (
    		<div className="pullrApp">
				<h1>{state.appName}</h1>
				<h3>{state.storeDate}</h3>
				{self.handleWidgetState()}
			</div>
    	);
  	}
});