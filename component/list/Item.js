'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const List = React.createClass({
  render() {
    return (
      <View style={styles.container}></View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

module.exports = List;
