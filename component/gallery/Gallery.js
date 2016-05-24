'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Utils from '../common/Utils';
import GalleryItem from './GalleryItem';

let loaded = {
  0: true,
  1: true
};
const Gallery = React.createClass({
  _onMomentumScrollEnd(e, state, context) {
    let next = Utils.circle(state.index + 1, state.total);
    if (!loaded[next]) {
      loaded[next] = true;
      const child = this.refs['item' + next];
      child.setState({
        showItem: true
      });
    }
  },

  render() {
    return (
      <Swiper
        style={[styles.box]}
        height={size.height}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        dot={<View style={styles.dot} />}
        activeDot={<View style={[styles.dot, styles.activeDot]} />}
        paginationStyle={styles.pagination}
        loop={true}>
        {this.props.topStories.map((item, i) =>
          <GalleryItem key={i} itemData={item} itemIndex={i} showItem={i < 2} ref={'item' + i} />
        )}
      </Swiper>
    );
  }
});

const size = Utils.getSize(375, 225);
const styles = StyleSheet.create({
  box: {
    overflow: 'hidden',
  },
  dot: {
    flex: 1,
    height: 3,
    backgroundColor: '#d0d1d3',
  },
  activeDot: {
    backgroundColor: '#3e98f0',
  },
  pagination: {
    left: 0,
    bottom: 0,
    width: size.width,
  }
});

module.exports = Gallery;
