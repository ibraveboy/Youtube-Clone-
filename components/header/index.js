import React, {Component} from 'react';
import HeaderRight from './HeaderRight';
import HeaderLeft from './HeaderLeft';
import {View} from 'react-native';
import {connect} from 'react-redux';

class Header extends Component {
  render() {
    let flexDirec = this.props.searchPress ? 'column' : 'row';
    let jContent = this.props.searchPress ? 'center' : 'space-between';
    return (
      <View
        style={{
          height: 50,
          display: 'flex',
          flexDirection: flexDirec,
          backgroundColor: '#c4302b',
          justifyContent: jContent,
        }}>
        <HeaderLeft />
        <HeaderRight navigation={this.props.navigation}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Header);
