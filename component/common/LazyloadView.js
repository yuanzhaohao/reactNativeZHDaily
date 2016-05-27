'use strict';

import React from 'react';
import _ from 'underscore';
import {
  ScrollView,
  NativeModules,
  findNodeHandle,
} from 'react-native';

const UIManager = NativeModules.UIManager;
const noop = function () {};
let INDEX = 0;

const LazyloadView = React.createClass({
  _callbacks: {},

  getDefaultProps: function() {
    return {
      ref: 'lazyloadView',
      scrollEventThrottle: 150,
      diff: {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100
      },
      autoTriggerIsInScreenTime: 1500,
      autoTriggerIsInScreen: false
    };
  },

  componentDidMount() {
    requestAnimationFrame(() => {
      const scrollView = this.getScrollResponder();
      this.scrollView = scrollView;
      this.diff = this._getBoundingRect();
      if (scrollView) {
        this.refreshElements();
        this.measureScrollView();
      }
    });
  },

  measureScrollView() {
    console.log('call measureScrollView');
    UIManager.measureLayoutRelativeToParent(
      findNodeHandle(this.scrollView),
      noop,
      (left, top, width, height) => {
        this.layoutMeasurement = {
          width: width,
          height: height
        };
        this.contentOffset = {
          x: 0,
          y: 0
        }
        this._loadItems();
      }
    )
  },

  refreshElements() {
    var scrollInner = this.scrollView._reactInternalInstance._renderedComponent._renderedChildren['.0'];
    if (__DEV__ && scrollInner._renderedComponent) {
      scrollInner = scrollInner._renderedComponent;
    }
    _.each(scrollInner._renderedChildren, (child, key) => {
      if (child && child._instance && child._instance.props.lazyload) {
        var childInner = child._renderedComponent;
        if (__DEV__ && childInner._renderedComponent) {
          childInner = childInner._renderedComponent;
        }
        this._getElements(childInner._renderedChildren);
      }
    });
  },

  addCallback(el, fn) {
    const callback = {
      el: el || {},
      fn: fn || noop
    };
    const key = ++INDEX;

    this._callbacks[key] = callback;
    return key;
  },

  _getBoundingRect() {
    var diff = this.props.diff;

    if (!_.isObject(diff)) {
      diff = {
        top: diff,
        right: diff,
        bottom: diff,
        left: diff
      };
    }
    return diff;
  },

  _getElements(children) {
    for (var i in children) {
      var child = children[i],
        renderedComponent = child._renderedComponent;

      if (child._instance && child._instance.props.lazySource && !child._instance.state.isLoaded) {
        this.addCallback(child, this.imgHandle);
      }
      if (!renderedComponent || typeof(child._currentElement) === 'string'){
        if (!__DEV__ && child._renderedChildren) {
          this._getElements(child._renderedChildren);
        }
        continue;
      }
      while (renderedComponent) {
        if (renderedComponent._renderedChildren) {
          this._getElements(renderedComponent._renderedChildren);
          break;
        }
        else {
          renderedComponent = renderedComponent._renderedComponent;
        }
      }
    }
  },

  _loadItems() {
    var callbacks = this._callbacks;
    // console.log(callbacks);
    if (!_.isEmpty(callbacks)) {
      _.each(callbacks, (callback, key) => {
        if (callback) {
          try {
            UIManager.measureLayout(
              findNodeHandle(callback.el._instance),
              this.scrollView.getInnerViewNode(),
              noop,
              (left, top, offsetWidth, offsetHeight) => {
                this._loadItem.call(this, key, callback, left, top, offsetWidth, offsetHeight);
              }
            );
          } catch (e) {}
        }
      });
    }
  },

  _loadItem(key, callback, left, top, offsetWidth, offsetHeight) {
    var el = callback.el,
      fn = callback.fn,
      remove = false,
      w = this.layoutMeasurement.width,
      h = this.layoutMeasurement.height,
      x = this.contentOffset.x,
      y = this.contentOffset.y,
      diff = this.diff;
    if (!(h + y <= top - diff.bottom)
      && !(w + x <= left - diff.right)
      && !(y >= top + offsetHeight + diff.top)
      && !(x > left + offsetWidth + diff.left)) {
      try {
        remove = fn.call(this, el);
      }
      catch (e) {
        setTimeout(function () {
          throw e;
        }, 0);
      }
    }
    if (remove !== false) {
      delete this._callbacks[key];
    }
    return remove;
  },

  imgHandle(el) {
    var component = el._instance;
    if (component && component.setState) {
      requestAnimationFrame(() => {
        component.setState({
          isLoaded: true
        });
      });
    }
  },

  _onScroll(e) {
    var ne = e.nativeEvent;
    this.contentOffset = ne.contentOffset;
    this.layoutMeasurement = ne.layoutMeasurement;
    requestAnimationFrame(() => {
      this._loadItems();
    });
    this.props._onScroll && this.props._onScroll(e);
  },

  getScrollResponder() {
    var scrollView = this.refs[this.props.ref];
    return scrollView && scrollView.getScrollResponder ? scrollView.getScrollResponder() : scrollView;
  },

  render() {
    return (
      <ScrollView
        {...this.props}
        onScroll={this._onScroll}
        ref={this.props.ref}
      >{this.props.children}</ScrollView>
    );
  }
});

module.exports = LazyloadView;
