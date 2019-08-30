import React from "react"
import {createBottomTabNavigator} from "react-navigation"
import Icon from "react-native-vector-icons/MaterialIcons" 
import HomeTab from "../../screens/HomeTab.js"
import TrendingTab from "../../screens/TrendingTab.js"
import LibraryTab from "../../screens/LibraryTab.js";

export const BottomTabNavigator=createBottomTabNavigator(
    {
        HomeTab:{
            screen:HomeTab,
        },
        TrendingTab:{
            screen:TrendingTab
        },
        LibraryTab:{
            screen:LibraryTab
        }

    },
    {
        defaultNavigationOptions:({navigation})=>{
            let {routeName} = navigation.state
            if(routeName=="HomeTab")
                return {
                    tabBarLabel:"Home",
                    tabBarIcon:({tintColor})=>{return <Icon size={25} name="home" color={tintColor}/>}
                }
            else if(routeName=="TrendingTab")
                return {
                    tabBarLabel:"Trending",
                    tabBarIcon:({tintColor})=>{return <Icon size={25} name="whatshot" color={tintColor}/>}
                }
            else if(routeName=="LibraryTab")
                return{
                    tabBarLabel:"Library",
                    tabBarIcon:({tintColor})=>{return <Icon size={25} name="folder" color={tintColor}/>}
                }
        },
        initialRouteName:"HomeTab",
        tabBarOptions:{
            tabStyle:{
                backgroundColor:"#c4302b"
            },
            inactiveTintColor:"white",
            activeTintColor:"black",
            labelStyle:{
                fontSize:12
            }
        },
    }
)