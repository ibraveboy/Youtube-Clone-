import React from "react"
import {createStackNavigator} from "react-navigation"
import {BottomTabNavigator} from "./BottomTabNavigator"
import Header from "../header"
import VideoPlayer from "../../screens/VideoPlayer";
import SearchResults from "../../screens/SearchResults"

export const StackNavigator = createStackNavigator(
    {
        Home:{
            screen:BottomTabNavigator,
            navigationOptions:({navigation})=>{
                return {
                    header:<Header navigation={navigation}/>,
                    headerStyle:{
                        backgroundColor:"#c4302b"
                    }
                }
            }
        },
        Play:VideoPlayer,
        Search:{
            screen:SearchResults,
            navigationOptions:({navigation})=>{
                return {
                    header:<Header navigation={navigation}/>,
                    headerStyle:{
                        backgroundColor:"#c4302b"
                    }
                }
            }
        },
    },
    {
        defaultNavigationOptions:({navigation})=>{
            return {
                headerStyle:{
                    backgroundColor:"#c4302b"
                }
            }
        },
        initialRouteName:"Home",
    }
)
 