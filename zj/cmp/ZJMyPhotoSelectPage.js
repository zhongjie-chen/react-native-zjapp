import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  CameraRoll,
  Platform,
  Image,
  Dimensions,
  View
} from 'react-native';

class ZJMyPhotoSelectPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      assets: ([]: Array<Image>),
      groupTypes: this.props.groupTypes,
      lastCursor: (null : ?string),
      assetType: this.props.assetType,
      noMore: false,
      loadingMore: false,
      image: null
    }
    this._fetch();
  }

  _fetch() {
    var fetchParams: Object = {
      first: this.props.batchSize,
      groupTypes: this.props.groupTypes,
      assetType: this.props.assetType,
    };
    if (Platform.OS === 'android') {
      // not supported in android
      delete fetchParams.groupTypes;
    }
    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }
    fetchParams.first = 2;
    CameraRoll.getPhotos(fetchParams)
      .then((data) => {console.log(data);this.setState({image: data})}, (e) => logError(e));
  }

  render() {
      return(
        <View>
          <Image source={{height:300,uri:"content://media/external/images/media/36044",width:200}}></Image>
        </View>
      );


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
