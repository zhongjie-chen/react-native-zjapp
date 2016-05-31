import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native';

import ZJBar from './ZJBar';


class ZJTabBar extends Component {

  static propTypes = {
    //barHeight: React.PropTypes.number,
  };

  static defaultProps = {
    //barHeight: 200,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 0
    }
  }

  getChildContext() {
    return {
      getBarRef: this.setBarHeight.bind(this),
      color: "purple"
    };
  }

  onItemChanged(i){
    this.setState({index: i})
  }

  setBarHeight(value) {
   this.refs['ZJBar'].setBarHeight(value);
  }

  render() {
    let children = this.props.children;
    return(
      <View style={styles.container}>
        {
          children.map((c,i)=>{
            let style;
            if(i == this.state.index){
              style = styles.show;
            } else {
              style = styles.hide;
            }
            return(
              <View key={i} style={[style, {height:height-100}]}>
                {this.props.children[i]}
              </View>
            )
          })
        }
        <ZJBar ref='ZJBar' onItemChanged={(i)=>this.onItemChanged(i)}></ZJBar>
      </View>
    );
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
  show: {
   flex: 1,
   position: 'relative',
   backgroundColor:'transparent'
  },
  hide: {
    flex: 1,
    position: 'absolute',
    top: 10000
  }
});

ZJTabBar.childContextTypes = {
  getBarRef: React.PropTypes.func,
  color: React.PropTypes.string
};
export{ ZJTabBar as default };
