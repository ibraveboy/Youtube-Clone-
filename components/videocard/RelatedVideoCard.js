import React, { Component } from 'react'
import {View,Text,Image,TouchableOpacity,StyleSheet} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Axios from "axios"
import {withNavigation,StackActions,NavigationActions} from "react-navigation"

class RelatedVideoCard extends Component {

    state={
        videoViews:"",
    }
    playVideo=(video)=>{
        this.props
          .navigation
          .dispatch(StackActions.reset(
            {
              index:0,
              actions:[
                NavigationActions.navigate({routeName:"Play",params:{video}})
              ]
            }
          ))
    }
    goBack=()=>{
        this.props
          .navigation
          .dispatch(StackActions.reset(
            {
              index:0,
              actions:[
                NavigationActions.navigate({routeName:"Home"})
              ]
            }
          ))
          this.props.searchButtonPress()
      }
    componentDidMount(){
        Axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&type=video&key=AIzaSyB5woohTgRFgceCvQsi7kQkGIuf043tfRY&id="+this.props.video.id.videoId)
        .then((res)=>{
            this.setState({
                videoViews:res.data.items[0].statistics.viewCount,
            })
        })
    }
    render() {
        let {video} = this.props
        return (
            <View style={styles.listView}>
                <TouchableOpacity>
                    <Image
                        resizeMethod="resize"
                        resizeMode="cover"
                        style={{height: 90,width:180}}
                        source={{
                        uri: video.snippet.thumbnails.default.url,
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.videoDetails} onPress={()=>{this.playVideo(video)}}>
                    <Text numberOfLines={2} style={styles.sectionTitle}>
                        {video.snippet.title}
                    </Text>
                    <Text>
                        {video.snippet.channelTitle}
                    </Text>
                    <Text>{this.state.videoViews} Views</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="more-vert" size={25} />
                </TouchableOpacity> 
            </View>
        )
    }
}

export default withNavigation(RelatedVideoCard)

const styles = StyleSheet.create({
    listView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
    videoDetails: {
        flex: 1,
        paddingLeft: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
})