'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  RecyclerViewBackedScrollView,
} from 'react-native';
import Item from './Item';

const List = React.createClass({
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.stories);
    return (
      <ListView
        dataSource={dataSource}
        renderRow={this._renderRow}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
      />
    );
  },

  _renderRow(itemData, sectionId, rowId) {
    return (
      <Item key={rowId} itemData={itemData} />
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
