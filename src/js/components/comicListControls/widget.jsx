import React from 'react';
import {render} from 'react-dom';

require('./widget.css');

module.exports = React.createClass({
    handleClick: function() {
        var self = this;

        self.props.toggleMine();
    },

    render: function() {
        var self = this;

        return (
            <div onClick={self.handleClick}>Click Me</div>
        );
    }
});