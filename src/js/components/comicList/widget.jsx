import React from 'react';
import {render} from 'react-dom';

require('./widget.css');

var ComicListItem = require('../comicListItem/widget.jsx'),
    ComicListControls = require('../comicListControls/widget.jsx');

module.exports = React.createClass({
    getClass: function() {
        var self = this,
            props = self.props,
            className = 'comicList';
        
        if(props.filter) {
            className += ' ' + props.filter;
        }

        return className;
    },

    render: function() {
        var self = this,
            comics = self.props.comics.map(function(comic, i) {
                return <ComicListItem key={i} comic={comic}/>;
            });
        return (
            <div className={self.getClass()}>
                <ComicListControls toggleMine={self.props.toggleMine}/>
                {comics}
            </div>
        );
    }
});