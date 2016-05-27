'use strict';

import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import LazyloadView from './common/LazyloadView';
import List from './list/List';
import Gallery from './gallery/Gallery';

const Index = React.createClass({
  _onScroll(e) {
    console.log('call _onScroll');
  },

  render() {
    return (
      <View style={styles.root}>
        <ScrollView
          ref={'Lazyload'}
          style={styles.lazy}
          diff={0}
          _onScroll={this._onScroll}
        >
          <Gallery topStories={this.props.topStories} />
          <List stories={this.props.stories} />
        </ScrollView>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  lazy: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

module.exports = Index;
