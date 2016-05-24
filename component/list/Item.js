'use strict';

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Utils from '../common/Utils';
import LazyImg from '../common/LazyImg';

const List = React.createClass({
  render() {
    const itemData = this.props.itemData;
    return (
      <View style={[styles.item, size]}>
        <LazyImg imgStyle={[styles.img, imgSize]} lazySource={{uri: itemData.images[0]}} />
        <Text style={styles.title} numberOfLines={2}>{itemData.title}</Text>
      </View>
    );
  }
});

const size = Utils.getSize(375, 90);
const imgSize = Utils.getSize(95, 70);
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  img: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#eee',
  },
  title: {
    position: 'absolute',
    top: 10,
    right: 10,
    left: imgSize.width + 10 * 2,
    fontSize: 16,
    lineHeight: 20,
    color: '#262b31',
  }
});

module.exports = List;
