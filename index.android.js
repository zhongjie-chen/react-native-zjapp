/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  AppState,
  View
} from 'react-native';

import App from './zj/App';
import CodePush from 'react-native-code-push';

class ZJApp extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <App name='chenzhongjie'></App>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ZJApp', () => ZJApp);
