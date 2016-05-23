'use strict';

import React from 'react';

const Utils = (() => {
  let self = {};

  self.fixSchema = (url = '', schema = 'https') => {
    return url.match(/^\/\//) ? schema + ':' + url : url;
  };

  return self;
})();

module.exports = Utils;
