import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Image,
  View
} from 'react-native';

class HeaderBar extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.wrap}>
            <Image style={styles.img} source={require('../img/abc_ic_search_api_mtrl_alpha.png')}></Image>
            <Text style={styles.tex}>搜索话题、问题或问人</Text>
          </View>
          <Image style={styles.img} source={require('../img/fab_add.png')}></Image>
        </View>
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 58,
    backgroundColor: '#4848FF',
    justifyContent: 'center',
    padding: 10
  },
  box: {
    backgroundColor: '#A3A3FE',
    height: 48,
    alignItems: 'center',
    flexDirection: 'row'
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  img: {
    height: 40,
    width: 40
  },
  tex: {
    flex: 1,
    fontSize: 16,
    color: 'white'
  }


});

export{ HeaderBar as default };
