import React from 'react';
import {render} from 'react-dom';

require('./component.css');

var ComicListItem = require('../ComicListItem/component.jsx'),
    ComicListControls = require('../ComicListControls/component.jsx');

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
            props = self.props,
            comics = props.comics.map(function(comic, i) {
                return <ComicListItem key={i} comic={comic}/>;
            });
        return (
            <div className={self.getClass()}>
                <ComicListControls {...props}/>
                {comics}
            </div>
        );
    }
});