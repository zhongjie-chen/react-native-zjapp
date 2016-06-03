import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  View
} from 'react-native';

import ZJTabBar from './cmp/tab/ZJTabBar';
import HeaderBar from './cmp/HeaderBar';


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
          <View style={[styles.show,{backgroundColor: 'green', flex: 1,}]}>
            <HeaderBar></HeaderBar>
          </View>
          <Text style={{backgroundColor: 'green', flex: 1, }}>
            22222222
          </Text>
          <View style={{backgroundColor: 'green', flex: 1}}>
            <TextInput style={{height: 40, borderColor: 'gray'}}></TextInput>
          </View>

          <View style={{flex:1}}>
            <MyLongScrollView ></MyLongScrollView>
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

    const { getBarRef } = this.context;
    getBarRef(y);
    // console.log(this.props.zj);
    // this.props.zj.setBarHeight(y);
  }

  render() {
    return (
      <ScrollView
        onScroll={this.onScroll.bind(this)}
        scrollEventThrottle={16}
        style={{ flex: 1}}
        contentContainerStyle={{ alignItems: 'center' }}>
        {this.generateContents()}
      </ScrollView>
    );
  }
}
MyLongScrollView.contextTypes = {
  getBarRef: React.PropTypes.func,
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
