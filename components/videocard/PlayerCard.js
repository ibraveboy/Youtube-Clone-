import React, {Component,Fragment} from 'react';
import {TouchableOpacity, StyleSheet, Image, View, Text,ScrollView} from 'react-native';
import {WebView} from "react-native-webview"
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Axios from 'axios';
import PlayerButtons from "../playersocialbuttons/PlayerSocialButtons"
import ChannelBar from "../channelbar/ChannelBar"
import RelatedVideosList from "../relatedvideos/RelatedVideosList" 

export default class VideoCard extends Component {
    state={
        videoViews:"",
        channelIcon:"",
        likeCount:"",
        dislikeCount:""
    }

    componentDidMount(){
      let videoId=this.props.video.id.videoId || this.props.video.id
        Axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&type=video&key=AIzaSyB5woohTgRFgceCvQsi7kQkGIuf043tfRY&id="+videoId)
        .then((res)=>{
            this.setState({
                videoViews:res.data.items[0].statistics.viewCount,
                likeCount:res.data.items[0].statistics.likeCount,
                dislikeCount:res.data.items[0].statistics.dislikeCount
            })
        })
        Axios.get("https://www.googleapis.com/youtube/v3/channels?part=snippet&key=AIzaSyB5woohTgRFgceCvQsi7kQkGIuf043tfRY&id="+this.props.video.snippet.channelId)
        .then((res)=>{
            this.setState({
                channelIcon:<Image
                style={styles.imageCircle}
                resizeMethod="resize"
                resizeMode="cover"
                source={{
                  uri:res.data.items[0].snippet.thumbnails.default.url,
                }}
              />,
            })
        })
    }
  render() {
      let {video} = this.props
      let videoId=video.id.videoId || video.id
    return (
    <Fragment>
        <View style={{height: 200}}>
            <WebView
            style={{flex:1}}
            javaScriptEnabled={true}
            source={{
                uri: "https://www.youtube.com/embed/"+videoId+"?allowfullscreen=true",
            }}
            allowsFullscreenVideo={true}
            />
        </View>
        <ScrollView style={styles.videoCard}>
            <View style={styles.videoCardBody}>
                
                <TouchableOpacity style={styles.videoDetails}>
                    <Text style={styles.sectionTitle}>
                        {video.snippet.title}
                    </Text>
                    <View style={styles.sectionDescription}>
                        <Text style={{marginRight: 10}}>{this.state.videoViews} views</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <PlayerButtons likeCount={this.state.likeCount} dislikeCount={this.state.dislikeCount} />
            <ChannelBar channelId={video.snippet.channelId} />
            <RelatedVideosList videoId={videoId} />
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  videoCard: {
    marginBottom: 10,
    flex:1,
  },
  videoCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    flex:1
  },
  videoDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  
  viewCircle: {height: 60, borderRadius: 40,backgroundColor:"grey"},
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    flexDirection: 'row',
  }
});
