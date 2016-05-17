import React from 'react';
import {render} from 'react-dom';

require('./widget.css');

var ComicListItem = require('../comicListItem/widget.jsx');

module.exports = React.createClass({
  render: function() {
    var comics = this.props.comics.map(function(comic, i) {
        return <ComicListItem key={i} comic={comic}/>;
    });
    return (
        <div className="comicList">
            {comics}
        </div>
    );
  }
});