import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import StoryList from './StoryList';
import StoryDetail from './StoryDetail';

const Story = StackNavigator({
  List: { screen: StoryList },
  Detail: { screen: StoryDetail }
});



export default (props) => <Story screenProps={props.navigation.state} />;
