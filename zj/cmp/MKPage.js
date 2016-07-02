import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native';

import {
  MKTextField,
  MKColor,
  mdl,
  MKButton,
  MKSpinner,
  MKSlider,
  getTheme,
  MKIconToggle,
  MKSwitch,
  MKCheckbox,
  MKRadioButton,
} from 'react-native-material-kit';


class MKPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.radioGroup = new MKRadioButton.Group();
    this.state = {
      rb: true,
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <MKTextField
          tintColor={MKColor.Lime}
          textInputStyle={{color: MKColor.Orange}}
          placeholder="text..."
          style={styles.textfield}
          />
        <TextfieldWithFloatingLabel ref="defaultInput"/>
        <View style={{margin: 10}}>
          <MKButton
            backgroundColor={MKColor.Orange}
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.7}
            shadowColor="black"
            onPress={() => {
              console.log('hi, raised button!');
            }}
            >
            <Text pointerEvents="none"
                  style={{color: 'white', fontWeight: 'bold', height: 80,}}>
              RAISED BUTTON
            </Text>
          </MKButton>
          <ColoredRaisedButton></ColoredRaisedButton>
        </View>
        <mdl.Progress
          style={styles.progress}
          progress={0.2}
        />
        <View style={{flexDirection: 'row'}}>
          <mdl.Spinner style={{height:50, width: 50}}/>
          <SingleColorSpinner></SingleColorSpinner>
        </View>
        <MKSlider
          ref="sliderWithValue"
          min={10}
          max={100}
          value={25}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MKIconToggle
            checked={true}
            onCheckedChange={this._onIconChecked}
            onPress={this._onIconClicked}
          >
            <Text
              pointerEvents="none"
              style={styles.toggleTextOff}>Off</Text>
            <Text state_checked={true}
                  pointerEvents="none"
                  style={[styles.toggleText, styles.toggleTextOn]}>On</Text>
          </MKIconToggle>
          <MKSwitch style={styles.appleSwitch}
              trackSize={30}
              trackLength={52}
              onColor="rgba(255,152,0,.3)"
              thumbOnColor={MKColor.Orange}
              rippleColor="rgba(255,152,0,.2)"
              onPress={() => console.log('orange switch pressed')}
              onCheckedChange={(e) => console.log('orange switch checked', e)}
              />
          <MKCheckbox
            checked={true}
          />
          <MKRadioButton
            checked={this.state.rb}
            group={this.radioGroup}
          />
          <MKRadioButton
            checked={!this.state.rb}
            group={this.radioGroup}
          />
        </View>
  
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
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
  },
  toggleText: {
   fontSize: 16,
   fontStyle: 'italic',
   fontWeight: 'bold',
   color: '#616161',
 },
 toggleOnText: {
   color: getTheme().primaryColor,
 },
 switch: {
   marginTop: 2,
   // marginBottom: 5,
 },
 appleSwitch: {
   marginTop: 7,
   marginBottom: 7,
 },
});

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Number...')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withFloatingLabelFont({
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .withKeyboardType('numeric')
.build();
const ColoredRaisedButton = MKButton.accentColoredFab()
  .withText('+')
  .withOnPress(() => {
    console.log("Hi, it's a colored button!");
  }).build();
const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .build();
export{ MKPage as default };
