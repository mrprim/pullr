import React from 'react';
import {render} from 'react-dom';

require('./component.css');

module.exports = React.createClass({
  render: function() {
    return (
        <div className="loadScreen">
            <div className="title">Pullr</div>
             <div className="spinner spin">
             	<span className="fa fa-circle-o-notch pulse"></span>
             </div>
             <div className="subtitle">Loading</div>
        </div>
    );
  }
});