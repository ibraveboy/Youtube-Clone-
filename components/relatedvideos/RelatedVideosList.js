import React, { Component } from 'react'
import {View} from "react-native"
import Axios from "axios"
import RelatedVideoCard from "../videocard/RelatedVideoCard"

export default class RelatedVideosList extends Component {

    state={
        videos:{
            items:[]
        }
    }
    componentDidMount(){
        Axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyB5woohTgRFgceCvQsi7kQkGIuf043tfRY&relatedToVideoId="+this.props.videoId)
        .then((res)=>{
            this.setState({
                videos:res.data,
            })
        })
    }
    render() {
        let list = this.state.videos.items.map((video)=>{
            return <RelatedVideoCard video={video} key={video.id.videoId} />
        })
        return (
            <View>
                {list}
            </View>
        )
    }
}
