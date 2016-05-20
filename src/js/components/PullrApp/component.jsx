import React from 'react';
import {render} from 'react-dom';

require('./component.css');

var $ = require('jquery'),
	api = require('../../data/api.js'),
	ComicList = require('../ComicList/component.jsx'),
	LoadScreen = require('../LoadScreen/component.jsx'),
	ComicSearch = require('../ComicSearch/component.jsx'),
	sortComicsFuncs = require('../../utils/sortComicsFuncs.js');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			appName: 'Pullr',
			mode: 'loading',
			sort: 'sortByUserSearchAndSeriesTitle'
		}
	},

	componentDidMount: function() {
		var self = this;

		self.load();
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

	search: function(searchTerm) {
		var self = this,
			comics = self.state.comics;

		$.each(comics, function(i, comic) {
            var re = new RegExp(searchTerm, "i");

            if(comic.seriesTitle.match(re)) {
                comic.hidden = false;
            } else {
            	comic.hidden = true;
            }
		});

		self.setState({comics: comics});
	},

	setComicsFilter: function(filter) {
		var self = this;

		if(self.state.filter === filter) {
			self.setState({filter: null});
		} else {
			self.setState({filter: filter});
		}
	},

	setComicsSort: function(sortFuncName) {
		var self = this,
			comics = self.state.comics;

		if(typeof sortComicsFuncs[sortFuncName] !== 'function') {
			return;
		}

		if(self.state.sort === sortFuncName) {
			self.setState({
				comics: comics.reverse()
			});
		} else {
			self.setState({
				sort: sortFuncName, 
				comics: comics.sort(sortComicsFuncs[sortFuncName])
			});
		}
	},

	handleLoadingState: function() {
		var self = this,
			state = self.state;

		if(state.mode === 'loading') {
			return <LoadScreen/>
		} else {
			return (
				<div>
					<ComicSearch search={self.search}/>
					<ComicList {...state} setComicsSort={self.setComicsSort} setComicsFilter={self.setComicsFilter}/>
				</div>
			)
		}
	},

	render: function() {
		var self = this,
			state = self.state;

    	return (
    		<div className={self.getClass()}>
				<h1>{state.appName}</h1>
				<h3>{state.storeDate}</h3>
				{self.handleLoadingState()}
			</div>
    	);
  	}
});