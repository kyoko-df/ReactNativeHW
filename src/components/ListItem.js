import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class ListItem extends PureComponent {
  render() {
    const { navigate, ...data } = this.props;
    const { by, descendants, id, score, title, url } = data;
    return (
      <TouchableOpacity onPress={() => navigate('Detail', { ...data })}>

        <View style={styles.container}>
          <View style={{paddingBottom: 10}}>
            <Text style={{fontSize: 16, color: '#FF6600'}}>{title}</Text>
          </View>
          <View>
            <Text style={{fontSize: 12}}>
              posted by {by} | {score} Poinst | {descendants} Comments
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  }
});
