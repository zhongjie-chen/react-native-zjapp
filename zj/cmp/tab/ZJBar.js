import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
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

class ZJBar extends Component {

  static propTypes = {
    barHeight: React.PropTypes.number,
    icons: React.PropTypes.array,
    onItemChanged: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    barHeight: 58,
    icons: [1, 2, 3, 4, 5],
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isShow: false,
      index: 0,
    }
    this.value = new Animated.Value(0);
    this._sizeLimit = sizeLimit(-58, 0);
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

  setBarHeight(value) {
   //const { size } = this.props;
   const size = 0;
   const actualValue = this._sizeLimit.process(value) - size;
   this.value.setValue(actualValue);
  }

  onItemClick(i){
    this.setState({
      index: i
    });
    this.props.onItemChanged(i);
  }

  render() {
    return(
      <Animated.View style={[styles.container,{height: this.props.barHeight, bottom: this.value}]}>
        {
          this.props.icons.map((c, i)=>{
            return(
              <TouchableOpacity style={styles.item} key={i} onPress={()=>this.onItemClick(i)}>
                <Image style={{backgroundColor: this.state.index == i ? 'blue':undefined}} source={require('./img/ic_write_setting.png')}></Image>
              </TouchableOpacity>
            )
          })
        }
      </Animated.View>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#9c9c9c',
    width: width,

  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0'
  },
});

export{ ZJBar as default };
