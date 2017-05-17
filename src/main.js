import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Story from './containers/Story';

const App = TabNavigator({
  Ask: {
    screen: Story,
    navigationOptions: {
      tabBarLabel: 'Ask HN'
    }
  },
  Show: {
    screen: Story,
    navigationOptions: {
      tabBarLabel: 'Show HN'
    }
  },
  Top: {
    screen: Story,
    navigationOptions: {
      tabBarLabel: 'Top Stories'
    }
  },
  New: {
    screen: Story,
    navigationOptions: {
      tabBarLabel: 'New Stories'
    }
  },
  Job: {
    screen: Story,
    navigationOptions: {
      tabBarLabel: 'Jobs'
    }
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  lazy: true,
  initialRouteName: 'Top',
  tabBarOptions: {
    activeTintColor: '#FF6600',
    labelStyle: {
      marginBottom: 16
    }
  }
});

export default App;