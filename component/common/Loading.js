'use strict';

import React from 'react';
import {
  Image,
  View,
  StyleSheet,
} from 'react-native';
import Utils from './Utils';

const Loading = React.createClass({
  render() {
    return (
      <View style={styles.view}>
        <Image style={styles.img}
          source={{uri: Utils.fixSchema('//img.alicdn.com/tps/i2/TB1ZvX3HVXXXXXhXVXX864cTXXX-200-120.gif')}} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  img: {
    width: 150,
    height: 90
  }
});

module.exports = Loading;
