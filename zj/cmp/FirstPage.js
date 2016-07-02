import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  ListView,
  RefreshControl,
  Animated,
  Image,
  View
} from 'react-native';

import HeaderBar from './HeaderBar';

const URL = 'https://api.douban.com/v2/movie/in_theaters';

class FirstPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      isRefreshing: true
    }
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (row1, row2) => row1 !== row2,
    });
    //this.value = new Animated.Value(50);
  }

  async getData(url){
    console.log(`begin  ${url}`);
    let response = await fetch(url);
    console.log(`end  ${url}`);
    let responseData = await response.json();
    return responseData;
  }

  componentWillMount(){
		this.getData(URL).then(responseData => {this.setState({data: responseData.subjects, isRefreshing: false})})
    .catch((error) => {
			 	console.log(error);
		})
  }

  render() {
    const myData = [];
    for (var i = 0; i < this.state.data.length; i++) {
      myData.push(this.state.data[i].casts)
    }

    return(
      <View style={{flex: 1,}}>
        <ListView
          dataSource={this.dataSource.cloneWithRowsAndSections(myData)}
          renderRow={this._renderRow.bind(this)}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
          pageSize={myData.length}
          initialListSize={10}
          renderHeader={()=><View style={{height: 60}}></View>}
          onScroll={this.onScroll.bind(this)}
          contentContainerStyle={{paddingTop: 50}}
          refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                progressViewOffset ={50}
                colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                progressBackgroundColor="#ffffff"/>}
        />
        <HeaderBar ref="headerBar"></HeaderBar>
      </View>
    );
  }

  _renderRow(rowData){
    console.log(rowData);
    return(
      <View>
        <Text style={{height: 50}}>{rowData.name}</Text>
        <Image style={{height: 100, width:80}} source={{uri: rowData.avatars.medium}}></Image>
      </View>
    )
  }

  _renderSectionHeader(sectionData, sectionID){
    return(
      <View style={{backgroundColor: 'blue', height: 40, justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 18, margin: 8}}>{this.state.data[sectionID].title}</Text>
      </View>
    )
  }

  onScroll(e) {
    const {
      nativeEvent: {
        contentOffset: { y }
      }
    } = e;
    console.log(y);
    let dy = y < 0 ? 0 : y;
    const { setBar } = this.context;
    this.refs['headerBar'].setBarHeight(dy);
    setBar(dy);

  }

}

FirstPage.contextTypes = {
  setBar: React.PropTypes.func,
  color: React.PropTypes.string
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    height: 20,
    backgroundColor: '#CCCCCC',
  },
});

export{ FirstPage as default };
