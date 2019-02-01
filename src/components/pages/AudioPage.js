// Vendor Imports
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import axios from 'axios';
import rssParser from 'react-native-rss-parser';

// Custom Imports
import MultiSelectList from '../organisms/MultiSelectList';
import CustomStatusBar from '../atoms/CustomStatusBar';
import AudioActionBar from '../organisms/AudioActionBar';
import { localNotification } from '../../bin/pushNotifications';
import CONFIG from '../../config';

class AudioPage extends React.Component {
  constructor(props) {
    super(props);
    this._onDownloadPress = this._onDownloadPress.bind(this);
    this.handleItemPress = this.handleItemPress.bind(this);
    this.downloadProgressCallback = this.downloadProgressCallback.bind(this);
    this.handleOnPause = this.handleOnPause.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.state = { podcasts: [], downloadProgress: 0, downloading: false, selectedTitle: '' };
  }

  async componentDidMount() {
    let feed;

    try {
      feed = await axios.get('http://feeds.feedburner.com/boundless/podcast')
        .then((response) => response.data)
        .then((responseData) => rssParser.parse(responseData));
    } catch(e) {
      console.log(e);
      return;
    }
    console.log(feed);
    this.setState({ 
      podcasts: feed.items.map(item => ({ 
        key: item.enclosures[0].url,
        url: item.enclosures[0].url.replace(/^http:\/\//, 'https://'),
        title: item.title,
      })),
    });
  }

  async handleItemPress(data) {
    console.log(data);
    this.setState({ downloading: true, selectedTitle: data.title });
    let url;
    try {
      url = await axios.post(`${CONFIG.ProxyUrl}/resolve`, { url: data.url })
        .then(response => response.data);
    } catch(e) {
      console.log(e);
      this.setState({ downloading: false });
      Alert.alert('Oops..', 'Couldn\'t connect to server');
      return;
    }
    console.log(url);
    this._onDownloadPress(url.replace(/^https:/, 'http:'), data.title);
  }

  _onDownloadPress(fromUrl, title) {
    const toFile = `${RNFS.CachesDirectoryPath}/${title.replace(/\s/g, '')}.mp3`;
    RNFS.downloadFile({ fromUrl, toFile, progress: this.downloadProgressCallback })
      .promise.then(() => {
        this.setState({ downloading: false });
        if (this.song) {
          this.song.release();
        }
        this.song = new Sound(toFile, '', error => {
          if (error) {
            console.log(error);
            return;
          }
          this.song.play();
        });
      })
      .catch((error) => {
        this.setState({ downloading: false });
        console.log(error);
      });
  }; 

  downloadProgressCallback(data) {
    this.setState({ downloadProgress: data.bytesWritten / data.contentLength});
    if (this.state.downloadProgress === 1) {
      localNotification();
    }
    console.log(this.state.downloadProgress);
  }

  handleOnPause() {
    if (this.song) {
      this.song.pause();
    }
  }

  handleOnPlay() {
    localNotification();
    if (this.song) {
      this.song.play();
    }
  }

  render() {
    return (
      <View style={style.container}>
        <CustomStatusBar />
        <MultiSelectList 
          data={this.state.podcasts}
          handleItemPress={this.handleItemPress}
        />
        <AudioActionBar 
          downloading={this.state.downloading}
          title={this.state.selectedTitle}
          progress={this.state.downloadProgress}
          onPause={this.handleOnPause}
          onPlay={this.handleOnPlay}
        />
      </View>
    );
  }
}

export default AudioPage;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});