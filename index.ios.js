'use strict';

import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import API from './component/common/API';
import Model from './component/common/Model';
import Loading from './component/Loading';
import Index from './component/Index';

const App = React.createClass({
  getInitialState() {
    return {
      loaded: false,
      stories: [],
      topStories: []
    };
  },
  componentWillMount() {
    Model.latest({}, (re) => {
      if (re && re.stories && re.top_stories) {
        let stories = this.state.stories;
        this.setState({
          loaded: true,
          stories: stories.concat(re.stories),
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
      <Index stories={this.state.stories} topStories={this.state.topStories} />
    );
  }
});

AppRegistry.registerComponent('reactNativeZHDaily', () => App);
