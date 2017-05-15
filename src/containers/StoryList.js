import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

export default class StoryList extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.routeName
  });

  render() {
    const { routeName } = this.props.screenProps;

    return (
      <View>
        <Text>{ routeName }</Text>
      </View>
    );
  }
}