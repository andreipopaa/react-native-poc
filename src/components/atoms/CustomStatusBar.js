import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, Platform } from 'react-native';

const MyStatusBar = (props) => (
    <View style={styles.statusBar}>
      <StatusBar translucent barStyle='dark-content' {...props} />
    </View>
  );

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

export default MyStatusBar;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});