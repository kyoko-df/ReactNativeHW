import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fixCommentText } from '../services/util';

export default props => {
  return (
    <View>
      <View style={styles.commentInnerContainer}>
        <Text style={styles.commentBy}>
          {props.by}:
        </Text>
        <Text style={styles.commentText}>
          {fixCommentText(props.text)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentInnerContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    padding:10,
  },
  commentBy: {
    fontSize: 13,
    marginBottom: 3,
    textAlign: 'left',
    color: '#FF6600'
  },
  commentText: {
    fontSize: 13,
    textAlign: 'left',
    color: '#000000'
  }
});
