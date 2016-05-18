import React from 'react';
import {render} from 'react-dom';

require('./widget.css');

var api = require('../../data/api.js'),
	ComicList = require('../comicList/widget.jsx'),
	loadScreen = require('../loadScreen/widget.jsx');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			appName: 'Pullr',
			mode: 'loading',
			filter: 'mine'
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
			return <ComicList comics={state.comics} filter={state.filter} toggleMine={self.toggleMine}/>;
		}
	},

	load: function() {
		var self = this;

		self.setState({mode: 'loading'});
		self.loadUser().done(function(user) {
			self.loadComics(user).done(function() {
				self.setState({mode: 'list'});
			});
		})
	},

	loadUser: function(id) {
		id = id || 1;
		var self = this;

		return api.users.getUser(id).done(function(resp) {
			self.setState({
				user: resp
			});
		});
	},

	loadComics: function(user) {
		var self = this;

		return api.comics.getComics(user).done(function(resp) {
			self.setState({
				storeDate: resp.storeDate,
				comics: resp.comics
			});
		});
	},

	getClass: function() {
		var self = this,
			className = "pullrApp";

		return className;
	},

	toggleMine: function() {
		var self = this;

		if(self.state.filter === 'mine') {
			self.setState({filter: null});
		} else {
			self.setState({filter: 'mine'});			
		}
	},

	render: function() {
		var self = this,
			state = self.state;

    	return (
    		<div className={self.getClass()}>
				<h1>{state.appName}</h1>
				<h3>{state.storeDate}</h3>
				{self.handleWidgetState()}
			</div>
    	);
  	}
});