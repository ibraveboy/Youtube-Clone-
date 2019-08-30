import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Image, View, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Axios from 'axios';


export default class VideoCard extends Component {
    state={
        videoViews:"",
        channelIcon:""
    }

    playVideo=(video)=>{
        this.props.navigation.navigate("Play",{video})
    }
    componentDidMount(){
        let videoId=this.props.video.id.videoId || this.props.video.id
        Axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&type=video&key=AIzaSyB5woohTgRFgceCvQsi7kQkGIuf043tfRY&id="+videoId)
        .then((res)=>{
            this.setState({
                videoViews:res.data.items[0].statistics.viewCount,
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
    return (
      <View style={styles.videoCard}>
        <TouchableOpacity onPress={()=>{this.playVideo(video)}}>  
          <Image
            resizeMethod="resize"
            resizeMode="cover"
            style={{height: 200}}
            source={{
              uri: video.snippet.thumbnails.high.url,
            }}
          />
        </TouchableOpacity>
        <View style={styles.videoCardBody}>
          <TouchableOpacity style={styles.channelIcon} >
            {(this.state.channelIcon=="")? <View style={styles.viewCircle}/> : this.state.channelIcon }
          </TouchableOpacity>
          <TouchableOpacity style={styles.videoDetails} onPress={()=>{this.playVideo(video)}}>
            <Text style={styles.sectionTitle} numberOfLines={2}>
              {video.snippet.title}
            </Text>
            <View style={styles.sectionDescription}>
              <Text style={{marginRight: 10}}>{video.snippet.channelTitle}</Text>
              <Text style={{marginRight: 10}}>{this.state.videoViews} views</Text>
              <Text style={{marginRight: 10}}>{video.snippet.publishedAt.split('T')[0]}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  videoCard: {
    paddingBottom: 10,
  },
  videoCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  videoDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  channelIcon: {width: 70, paddingHorizontal: 5},
  imageCircle: {height: 60, borderRadius: 40},
  viewCircle: {height: 60, borderRadius: 40,backgroundColor:"grey"},
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    flexDirection: 'row',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
