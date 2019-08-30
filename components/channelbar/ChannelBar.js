import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Axios from 'axios';

export default class ChannelBar extends Component {
  state = {
    channelIcon: '',
    channelTitle: '',
    subscriberCount: '',
  };

  componentDidMount() {
    Axios.get(
      'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=AIzaSyB5woohTgRFgceCvQsi7kQkGIuf043tfRY&id=' +
        this.props.channelId,
    ).then(res => {
      this.setState({
        channelIcon: (
          <Image
            style={styles.imageCircle}
            resizeMethod="resize"
            resizeMode="cover"
            source={{
              uri: res.data.items[0].snippet.thumbnails.default.url,
            }}
          />
        ),
        channelTitle: res.data.items[0].snippet.title,
        subscriberCount: res.data.items[0].statistics.subscriberCount,
      });
    });
  }

  render() {
    return (
      <View style={styles.channelBar}>
        <View style={styles.channelTextWithIcon}>
          <View style={styles.channelIcon}>
            {this.state.channelIcon == '' ? (
              <View style={styles.viewCircle} />
            ) : (
              this.state.channelIcon
            )}
          </View>
          <View style={styles.channelDetails}>
            <Text style={styles.channelTitle}>{this.state.channelTitle}</Text>
            <View>
              <Text style={{marginRight: 10}}>
                {this.state.subscriberCount}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.channelSubscribeButton}>
          <View>
            <Image
              style={styles.subscriberLogo}
              resizeMethod="resize"
              resizeMode="contain"
              source={require("../../assets/imgs/youtube_logo.png")}
            />
          </View>
          <View>
            <Text style={styles.subscriberText}>Subscribe</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  channelBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: '#787878',
  },
  channelTextWithIcon: {
    flexDirection: 'row',
  },
  channelIcon: {
    width: 50,
    paddingHorizontal: 5,
  },
  imageCircle: {
    height: 40,
    borderRadius: 20,
  },
  viewCircle: {
    height: 40,
    borderRadius: 20,
    backgroundColor: 'grey',
  },
  channelDetails: {
    paddingLeft: 5,
  },
  channelTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  channelSubscribeButton: {
    paddingRight: 10,
    flexDirection:"row",
    alignItems:"center"
  },
  subscriberLogo:{
    height: 15,
    width:15
  },
  subscriberText:{
    color: '#c4302b',
    fontWeight:"bold",
    marginLeft:5
  }
});
