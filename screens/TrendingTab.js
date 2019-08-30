import React, {Component, Fragment} from 'react';
import VideoCard from "../components/videocard/VideoCard"
import Axios from "axios"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

export default class TrendingTab extends Component {
  state={
    data:{
      items:[]
    }
  }
  componentDidMount(){
    Axios.get("https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&part=snippet&type=video&key=AIzaSyB5woohTgRFgceCvQsi7kQkGIuf043tfRY")
    .then((res)=>{
      this.setState({
        data:res.data
      })
    })
  }
  render() {
    let videos=this.state.data.items.map((video)=>{
      return(
        <VideoCard video={{...video}} key={video.id} navigation={{...this.props.navigation}} />
      )
    })
    return (
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#c4302b" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            >
            {videos}
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}
