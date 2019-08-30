import React, {Component, Fragment} from 'react';
import VideoCard from "../components/videocard/VideoCard"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {loadHomeVideos} from "../redux/actioncreators"
import {connect} from "react-redux";


class HomeTab extends Component {
  
  componentDidMount(){
    this.props.loadHomeVideos()
  }
  render() {
    let videos=this.props.videos.items.map((video)=>{
      return(
        <VideoCard video={{...video}} key={video.id.videoId} navigation={{...this.props.navigation}} />
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

const mapStateToProps= (state)=>{
  return {
    ...state
  }
}

export default connect(mapStateToProps,{loadHomeVideos})(HomeTab)
