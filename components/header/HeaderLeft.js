import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import {connect} from "react-redux";

class HeaderLeft extends Component {
  render() {
    let d = (this.props.searchPress)? "none" : "flex"
    return (
      <View
        style={{
          display: d,
          height: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          style={{height: '50%',width:40}}
          source={require('../../assets/imgs/youtube_logo.png')}
        />
        <Text style={{
            fontSize:25,
            fontWeight:"bold",
            color:"white"
        }}>Youtube</Text>
      </View>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
      ...state
  }
}

export default connect(mapStateToProps,null)(HeaderLeft);