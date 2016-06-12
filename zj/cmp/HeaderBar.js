import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Animated,
  View
} from 'react-native';

const sizeLimit = (minValue, maxValue) => {
  let prevValue = 0;
  let delta;

  let actualValue = maxValue;

  return {
    process: (value) => {
      if (value < minValue) {
        value = minValue;
      }

      delta = value - prevValue;
      prevValue = value;

      actualValue -= delta;

      if (actualValue < minValue) {
        actualValue = minValue;
      } else if (actualValue > maxValue) {
        actualValue = maxValue;
      }

      return actualValue;
    },
    //we need to reset because if `show` method is called we need
    //to make sure that the actualValue is set properly to prevent
    //jaggy animation.
    reset: (value) => actualValue = value
  };
};

class HeaderBar extends Component {

  constructor(props, context) {
    super(props, context);
    this.value = new Animated.Value(0);
    this._sizeLimit = sizeLimit(-58, 0);
  }

  render() {
    return(
      <Animated.View style={[{top: this.value}, styles.container]}>
        <View style={styles.box}>
          <View style={styles.wrap}>
            <Image style={styles.img} source={require('../img/abc_ic_search_api_mtrl_alpha.png')}></Image>
            <Text style={styles.tex}>搜索话题、问题或问人</Text>
          </View>
          <Image style={styles.img} source={require('../img/fab_add.png')}></Image>
        </View>
      </Animated.View>
    );
  }

  setBarHeight(value) {
    const size = 0;
    const actualValue = this._sizeLimit.process(value) - size;
    this.value.setValue(actualValue);
  }

  show(enable=false, duration=1000) {
    const toValue = enable ? 0 : -58;
    Animated.timing(this.value, {
      duration: duration,
      toValue
    }).start();
     this.setState({
     isShow: !this.state.isShow
    })
  }

}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 58,
    backgroundColor: '#4848FF',
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    width: width
  },
  box: {
    backgroundColor: '#A3A3FE7F',
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
