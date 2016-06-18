import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  CameraRoll,
  Image,
  View
} from 'react-native';

class ZJMyPhotoSelectPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      image: null
    }
    CameraRoll.getPhotos({first: 1,}, function(obj){
      console.log(obj);
      this.setState({uri: obj.edges[0].node.image});
    }, function(obj){
      console.log(obj);
    });
  }

  render() {
    if(this.state.image){
      return(
        <View>
          <Image style={{height:200, width:200}} source={this.state.image}></Image>
        </View>
      );
    } else {
      return(
        <View>
          <Image source={{uri: 'content://media/external/images/media/36044.png'}}></Image>
        </View>
      );
    }

  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export{ ZJMyPhotoSelectPage as default };
