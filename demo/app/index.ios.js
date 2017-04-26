/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Linking,
  ListView,
  Image,
  Dimensions,
} from 'react-native';

const {width,height} = Dimensions.get("window")

import DeepLinking from 'react-native-deep-linking';

import RNYoutubeOAuth from 'react-native-youtube-oauth';

const youtube = {
  client_id: '****.apps.googleusercontent.com',
  redirect_uri: `http://localhost:3000/handle_youtube_callback`,
};

import YouTube from 'react-native-youtube'

export default class app extends Component {
  constructor() {
    super();

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      videos: [],
      auth: false,
    };

    this.video = this.video.bind(this);
    this.videos = this.videos.bind(this);
    this.youtubeAuth = this.youtubeAuth.bind(this);
  }
  videos(code) {
    fetch(`http://localhost:3000/videos?code=${code}`)
      .then(response => response.json())
      .then(videos => {
        this.setState({
          videos,
        });
      })
      .done();
  }
  video(item){
    console.log(item)
    return (<View style={{
      padding: 20,
    }}>
      <YouTube
        ref="youtubePlayer"
        videoId={item.snippet.resourceId.videoId}
        play={false}
        hidden={false}
        rel={false}
        fullscreen={true}
        loop={false}
        onReady={(e)=>{this.setState({isReady: true})}}
        onChangeState={(e)=>{this.setState({status: e.state})}}
        onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
        onError={(e)=>{this.setState({error: e.error})}}
        onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}
        style={{alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10}}
      />
    </View>)
  }
  youtubeAuth() {
    RNYoutubeOAuth(
      {
        scheme: 'app://',
        client_id: youtube.client_id,
        redirect_uri: youtube.redirect_uri,
        state: '0123456789',
      },
      code => {
        this.setState({
          auth: true,
        })

        this.videos(code)
      },
    );
  }
  render() {
    return (
      <View style={this.state.auth ? {} : styles.container}>
        {this.state.auth
          ? <ListView
              dataSource={this.ds.cloneWithRows(this.state.videos)}
              renderRow={this.video}
              enableEmptySections={true}
            />
          : <TouchableHighlight onPress={this.youtubeAuth}>
              <View>
                <Text style={styles.button}>Youtube Auth</Text>
              </View>
            </TouchableHighlight>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f22',
    padding: 20,
    color: '#fff',
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('app', () => app);
