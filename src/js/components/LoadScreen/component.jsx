import React from 'react';
import {render} from 'react-dom';

require('./component.css');

module.exports = React.createClass({
  render: function() {
    return (
        <div className="loadScreen">
            LOAD
        </div>
    );
  }
});