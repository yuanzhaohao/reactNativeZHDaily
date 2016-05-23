'use strict';

import React from 'react';
import {
  Dimensions,
} from 'react-native';

const Utils = (() => {
  let self = {};

  const screenWidth = Dimensions.get('window').width;
  self.getScreenInfo = () => {
    const {
      width, height, scale
    } = Dimensions.get('window');

    return {
      width: width,
      height: height,
      scale: scale,
    };
  };

  self.getSize = (w = 0, h = 0) => {
    const standardWidth = 375;
    const ratio = screenWidth / standardWidth;

    return {
      width: w * ratio,
      height: h * ratio,
    };
  };

  self.fixSchema = (url = '', schema = 'https') => {
    return url.match(/^\/\//) ? schema + ':' + url : url;
  };

  return self;
})();

module.exports = Utils;
