import React from 'react';
import {render} from 'react-dom';

require('./widget.css');

module.exports = React.createClass({
  render: function() {
    return (
        <div className="loadScreen">
            LOAD
        </div>
    );
  }
});