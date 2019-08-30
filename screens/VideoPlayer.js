import React, {Component, Fragment} from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {HeaderBackButton} from 'react-navigation';
import PlayerCard from "../components/videocard/PlayerCard"
import {StackActions,NavigationActions} from "react-navigation"
import {connect} from "react-redux"
import {searchButtonPress} from "../redux/actioncreators"

class VideoPlayer extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <HeaderBackButton
          tintColor="white"
          title={'Home'}
          backTitleVisible={true}
          onPress={() => {
            navigation.dispatch(StackActions.reset({
              index:0,
              actions:[
                NavigationActions.navigate({routeName:"Home"})
              ]
            }))
          }}
        />
      ),
    };
  };

  componentDidMount(){
    
  }
  componentWillUnmount(){
    this.props.searchButtonPress()
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#c4302b" />
        <SafeAreaView style={{flex:1}}>
            <PlayerCard video={this.props.navigation.getParam("video","no video")} />  
        </SafeAreaView>
      </Fragment>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state
  }
}

export default connect(mapStateToProps,{searchButtonPress})(VideoPlayer)