import React, {Component, Fragment} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {searchButtonPress,submitEditingHandler} from '../../redux/actioncreators';
import {StackActions,NavigationActions} from "react-navigation"

class HeaderRight extends Component {
  state={
    query:""
  }
  searchBarTextChangeHandler = (text)=>{
    this.setState({
      query:text
    })
  }

  searchBarButtonPressHandler = ()=>{
    if(this.state.query=="")
    {
      Alert.alert("Enter Something First.")
      return false
    }
    if(this.props.navigation.state.routeName=="Search"){
      this.props.navigation.push("Search",{q:this.state.query})
    }else{
      this.props.navigation.navigate("Search",{q:this.state.query})
    }
      this.setState({
        query:""
      })
  }
  goBack=()=>{
    this.props
      .navigation
      .dispatch(StackActions.reset(
        {
          index:0,
          actions:[
            NavigationActions.navigate({routeName:"Home"})
          ]
        }
      ))
      this.props.searchButtonPress()
  }

  render() {
    let searchPress = this.props.searchPress;
    let {routeName} = this.props.navigation.state
    return (
      <Fragment>
        {searchPress ? (
          <View style={styles.searchWrapper}>
            <TouchableOpacity
              style={styles.backButton}
              returnKeyType={"done"}
              onPress={(routeName=="Search")?this.goBack:this.props.searchButtonPress}>
              <Icon name="arrow-back" size={25} color="white" />
            </TouchableOpacity>
            <TextInput
              placeholder={'Search ...'}
              placeholderTextColor="white"
              autoFocus={(routeName!="Search")}
              style={styles.searchBar}
              onChangeText={this.searchBarTextChangeHandler}
              onSubmitEditing={this.searchBarButtonPressHandler}
            />
          </View>
        ) : (
          <View style={styles.iconsWrapper}>
            <TouchableOpacity style={styles.center}>
              <Icon name="cast-connected" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.center}>
              <Icon name="videocam" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.searchButtonPress}
              style={styles.center}>
              <Icon name="search" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.center}>
              {/* 
                    if image is available then we can use this
                    <Image
                            style={styles.imageCircle}
                            resizeMethod="resize"
                            resizeMode="cover"
                            source={{
                            uri: res.data.items[0].snippet.thumbnails.default.url,
                            }}
                        /> 
                    else we can use View to show a circle there
                    */}
              <View style={styles.viewCircle} />
            </TouchableOpacity>
          </View>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  searchWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 40,
    paddingBottom: 10,
  },
  searchBar: {
    backgroundColor: 'transparent',
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    left: 10,
  },
  imageCircle: {
    height: 40,
    borderRadius: 20,
  },
  viewCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'grey',
  },
});

const mapStateToProps = state => {
  return {
    ...state,
  };
};

export default connect(
  mapStateToProps,
  {searchButtonPress,submitEditingHandler},
)(HeaderRight);
