'use strict';

import React from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import API from './component/common/API';
import Model from './component/common/Model';
import Loading from './component/common/Loading';

const App = React.createClass({
  getInitialState() {
    return {
      loaded: false
    };
  },
  componentWillMount() {
    console.log(Model)
    Model.latest({
      url: '//news-at.zhihu.com/api/4/news/latest'
    }, (re) => {
      if (re && re.stories && re.top_stories) {
        this.setState({
          loaded: true,
          stories: re.stories,
          topStories: re.top_stories
        });
      }
    });
  },
  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('reactNativeZHDaily', () => App);
