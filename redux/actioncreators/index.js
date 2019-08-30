import * as constants from "../constants"
import Axios from "axios"
export const searchButtonPress = ()=>{
    return {
        type:constants.SEARCHBUTTONPRESS
    }
}

export const getResults = (q)=>{
    return dispatch => {
        Axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&key=AIzaSyB5woohTgRFgceCvQsi7kQkGIuf043tfRY&q="+q)
        .then((res)=>{
            res.data.q=q
            return dispatch({type:constants.GETRESULTS,payload:res.data})
        })
    }
}

export const loadHomeVideos = ()=>{
    return dispatch => {
        Axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyB5woohTgRFgceCvQsi7kQkGIuf043tfRY")
        .then((res)=>{
            res.data.q=""
            return dispatch({type:constants.LOADHOMEVIDEOS,payload:res.data})
        })
    }
}