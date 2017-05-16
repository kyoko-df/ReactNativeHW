import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class ListItem extends PureComponent {
  render() {
    const { navigate, ...data} = this.props
    const { by, descendants, id, score, title, url } = data;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigate('Detail', {data: data});
        }}
      >
        <View>
          <View>
            <Text>{title}</Text>
          </View>
          <View>
            <Text>posted by {by} |</Text>
            <Text>{score} Poinst |</Text>
            <Text>{descendants} Comments</Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  }
}
