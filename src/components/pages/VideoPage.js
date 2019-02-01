// Vendor Imports
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

class VideoPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          style={styles.backgroundVideo}
          muted={false}
          repeat={true}
          controls={true}
          volume={1.0}
          paused={true}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
        />
      </View>
    );
  }
}

export default VideoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})