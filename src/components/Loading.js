import React, { Component } from 'react';
import {
  View,
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
  StyleSheel
} from 'react-native';

export default () => {
  const Progress = Platform.select({
    ios: ProgressViewIOS,
    android: ProgressBarAndroid
  })

  return (
    <View style={styles.loadingBox}>
      <Progress color="#FF4500" />
    </View>
  );
};
