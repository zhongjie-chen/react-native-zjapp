import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  CameraRoll,
  Platform,
  Image,
  Dimensions,
  ScrollView,
  ListView,
  TouchableHighlight,
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
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
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
    fetchParams.first = 500;
    //fetchParams.groupName = "pics";
    //对edges数组进行分类 可以做到类似选择相册的功能
    //TODO
    CameraRoll.getPhotos(fetchParams)
      .then((data) => {console.log(data);this.setState({images: data.edges})}, (e) => logError(e));
  }

  _renderRow(rowData, sectionID, rowID, highlightRow){
    return(
      <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>console.log(rowID)}>
        <View style={{flexDirection:'row',padding:12,borderBottomWidth:StyleSheet.hairlineWidth,borderColor:'#c9c9c9'}}>
          <Image
            source={rowData.node.image}
            style={{height:80,width:120}}
          />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
      return(
        <View style={styles.container}>
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
          <ListView
            style={styles.container}
            contentContainerStyle={styles.list}
            dataSource={this.dataSource.cloneWithRows(this.state.images)}
            renderRow={this._renderRow.bind(this)}
          />
        </View>
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
  list: {
    marginTop:5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

export{ ZJMyPhotoSelectPage as default };
