'use strict';

import underscore from 'underscore';

const api = {
  'lastest': '//news-at.zhihu.com/api/4/news/latest',
};

module.exports = {
  lastest(opts, succCallback, failCallback) {
    this._fetchData.call(this, opts, succCallback, failCallback);
  },

  _fetchData(opts, succCallback, failCallback) {
    opts = Object.assign({
      success: succCallback,
      error: failCallback,
      cacheValidTime: 5 * 60 * 60 * 1000,
    }, opts);
    API.dlp(opts);
  }
};
