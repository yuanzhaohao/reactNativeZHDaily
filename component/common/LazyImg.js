'use strict';

import React from 'react';
import { Image } from 'react-native';

const LazyImg = React.createClass({
  getInitialState() {
    return {
      isLoaded: false
    }
  },

  getDefaultProps: function() {
    return {
      ref: 'LazyImg'
    };
  },

  render() {
    if (this.state.isLoaded) {
      return null;
    }
    return (
      <Image style={this.props.imgStyle} source={this.props.lazySource} />
    );
  }
});

module.exports = LazyImg;
