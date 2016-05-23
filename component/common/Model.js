'use strict';

import underscore from 'underscore';
import API from './API';

const api = {
  'latest': '//news-at.zhihu.com/api/4/news/latest',
};

module.exports = {
  latest(opts, succCallback, failCallback) {

    opts = Object.assign(opts, {
      url: api.latest,
      cacheValidTime: 5 * 60 * 60 * 1000,
      success: succCallback,
      error: failCallback
    });
    API.dlp(opts);
  }
};
