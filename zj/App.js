import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  RefreshControl,
  View
} from 'react-native';

import ZJTabBar from './cmp/tab/ZJTabBar';
import FirstPage from './cmp/FirstPage';
import ContactsPage from './cmp/ContactsPage';
import ZJPhotoPage from './cmp/ZJPhotoPage';
import ZJMyPhotoSelectPage from './cmp/ZJMyPhotoSelectPage';

class App extends Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    name: 'ZJApp',
  };

  constructor(props, context) {
    super(props, context);

  }

  render() {
    return(
      <View style={styles.container}>
        <ZJTabBar>
          <View style={{flex: 1,}}>
            <FirstPage></FirstPage>
          </View>
          <View style={{flex: 1,}}>
            <ContactsPage></ContactsPage>
          </View>
          <View style={{flex: 1}}>
            <ZJPhotoPage></ZJPhotoPage>
          </View>

          <View style={{flex:1}}>
            <ZJMyPhotoSelectPage></ZJMyPhotoSelectPage>
          </View>

          <Text style={{backgroundColor: 'green', flex: 1}}>
            55555555
          </Text>
        </ZJTabBar>
      </View>
    );
  }
}

class MyLongScrollView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  generateContents() {
    let contents = [];
    for (let i = 0; i < 20; i++) {
      contents.push(
        <View key={i}>
          <Text>My Awesome Content {i}</Text>
          <TextInput style={{height: 40, borderColor: 'gray'}}></TextInput>
        </View>
      );
    }

    return contents;
  }

  onScroll(e) {
    const {
      nativeEvent: {
        contentOffset: { y }
      }
    } = e;

    const { setBar } = this.context;
    setBar(y);
    // console.log(this.props.zj);
    // this.props.zj.setBarHeight(y);
  }

  render() {
    return (
      <ScrollView
        onScroll={this.onScroll.bind(this)}
        scrollEventThrottle={16}
        style={{ flex: 1}}
        contentContainerStyle={{paddingTop: 50}}
        refreshControl={
            <RefreshControl
              refreshing={false}
              //onRefresh={this._onRefresh.bind(this)}
              //progressViewOffset ={50}
              colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
              progressBackgroundColor="#ffffff"/>}
        contentContainerStyle={{ alignItems: 'center' }}>
        {this.generateContents()}
      </ScrollView>
    );
  }
}
MyLongScrollView.contextTypes = {
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
});

export{ App as default };
