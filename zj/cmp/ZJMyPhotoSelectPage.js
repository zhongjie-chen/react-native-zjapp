import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  CameraRoll,
  Platform,
  Image,
  Dimensions,
  ScrollView,
  View
} from 'react-native';

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';

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
      images: []
    }

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
    fetchParams.first = 300;
    //fetchParams.groupName = "pics";
    CameraRoll.getPhotos(fetchParams)
      .then((data) => {console.log(data);this.setState({images: data.edges})}, (e) => logError(e));
  }

  render() {
      return(
        <ScrollView>
          <View>
            <MKButton
              backgroundColor={MKColor.Teal}
              shadowRadius={2}
              shadowOffset={{width:0, height:2}}
              shadowOpacity={.7}
              shadowColor="black"
              onPress={() => {
                console.log('hi, raised button!');
                this._fetch();
              }}
              >
                <Text pointerEvents="none"
                      style={{height: 80, color: 'white', fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center'}}>
                  IMAGE
                </Text>
            </MKButton>

            <Image source={{uri:"content://media/external/images/media/45715"}} style={{height: 100, width: 100}}></Image>
            {
                this.getImageView()
            }

          </View>
        </ScrollView>
      );
  }

  getImageView(){
    return(
      this.state.images.map((c,i)=>{
        console.log(c);
        return(
          <Image source={c.node.image} style={{height: 100, width: 100}}></Image>
        )
      })
    )
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
