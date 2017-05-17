import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import StoryList from './StoryList';
import StoryDetail from './StoryDetail';
import StoryView from './StoryView';

const Story = StackNavigator(
  {
    List: { screen: StoryList },
    Detail: { screen: StoryDetail },
    View: { screen: StoryView }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#FF6600'
      },
      headerTintColor: '#FFFFFF'
    }
  }
);

export default props => <Story screenProps={props.navigation.state} />;
