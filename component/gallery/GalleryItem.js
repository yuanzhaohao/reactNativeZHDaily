'use strict';

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Utils from '../common/Utils';

const GalleryItem = React.createClass({
  getInitialState() {
    return {
      showItem: this.props.showItem
    };
  },

  render() {
    const itemData = this.props.itemData;
    return (
      <View style={[styles.item, size]}>
        {this.state.showItem
          ? <Image style={[styles.img, size]} source={{uri: itemData.image}} />
          : null
        }
        <Text style={styles.title} numberOfLines={1}>{itemData.title}</Text>
      </View>
    );
  }
});

const size = Utils.getSize(375, 225);
const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
  },
  title: {
    position: 'absolute',
    left: 0,
    bottom: 3,
    width: size.width,
    height: 30,
    paddingLeft: 7,
    paddingRight: 7,
    lineHeight: 22,
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,.8)',
    color: '#fff',
  }
});

module.exports = GalleryItem;
