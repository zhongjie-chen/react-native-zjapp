import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  ListView,
  RefreshControl,
  Animated,
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
    this.value = new Animated.Value(50);
  }

  componentWillMount(){
    fetch(URL).then(response => response.json())
      .then(responseData  => {this.setState({data: responseData.subjects , isRefreshing: false})})
      .catch((error) => {
			 		console.log(error);
			}).done();
  }

  render() {
    const myData = [];
    for (var i = 0; i < this.state.data.length; i++) {
      myData.push(this.state.data[i].casts)
    }

    return(
      <View style={{flex: 1,}}>
        <Animated.View style={{top: this.value, flex: 1}} >
          <ListView
            style={{flex: 1}}
            dataSource={this.dataSource.cloneWithRowsAndSections(myData)}
            renderRow={this._renderRow.bind(this)}
            renderSectionHeader={this._renderSectionHeader.bind(this)}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
            pageSize={myData.length}
            initialListSize={10}
            renderHeader={()=><View style={{height: 60}}></View>}
            onScroll={this.onScroll.bind(this)}
            onContentSizeChange={()=>console.log('contentHeight')}
            refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  //onRefresh={this._onRefresh.bind(this)}
                  colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                  progressBackgroundColor="#ffffff"/>}
          />
        </Animated.View>
        <HeaderBar ref="headerBar"></HeaderBar>
      </View>
    );
  }

  _renderRow(rowData){
    return(
      <View>
        <Text style={{height: 200}}>{rowData.name}</Text>
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

    let ky = 0;
    if(y < 0){
      ky = 0 ;
    } else if(y > 50) {
      ky = 50;
    }  else {
      ky = y;
    }
    // TODO this.value判断
    if(this.value == 0){
      this.value.setValue(50-ky)
    } else {
      this.value.setValue(50-ky+dy)
    }


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
