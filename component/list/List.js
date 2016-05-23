'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Item from './Item';

const List = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        {this.props.stories.map((item, i) =>
          <Item key={i} itemData={item} />
        )}
      </View>
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
