import React, {Component, Fragment} from 'react';
import RelatedVideoCard from "../components/videocard/RelatedVideoCard"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {getResults} from "../redux/actioncreators"
import {connect} from "react-redux";


class SearchResults extends Component {
  
  componentDidMount(){
    this.props.getResults(this.props.navigation.getParam("q",""))
  }
  render() {
    let videos=this.props.searchResults.items.map((video)=>{
      return(
        <RelatedVideoCard video={{...video}} key={video.id.videoId} navigation={{...this.props.navigation}} />
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

export default connect(mapStateToProps,{getResults})(SearchResults)
