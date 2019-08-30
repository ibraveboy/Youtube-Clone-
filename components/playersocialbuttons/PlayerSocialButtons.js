import React, { Component } from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

export default class PlayerButtons extends Component {
    render() {
        return (
            <View style={styles.playerBtns}>
              <TouchableOpacity style={styles.center}>
                <Icon name="thumb-up" size={25} color="black"/>
                <Text>
                    {this.props.likeCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.center}>
                <Icon name="thumb-down" size={25} color="black"/>
                <Text>
                    {this.props.dislikeCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.center}>
                <Icon name="reply" size={25} color="black"/>
                <Text>
                    Share
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.center}>
                <Icon name="get-app" size={25} color="black"/>
                <Text>
                    Download
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.center}>
                <Icon name="playlist-add" size={25} color="black"/>
                <Text>
                    Save
                </Text>
              </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    center:{
        alignItems:"center"
    },
    playerBtns:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        paddingVertical:10
    }
})