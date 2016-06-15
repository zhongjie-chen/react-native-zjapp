import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';

import Contacts from 'react-native-contacts';

class ContactsPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      contacts: []
    }
  }

  render() {
    return(
      <ScrollView>
        <TouchableOpacity style={{alignItems: 'center', }} onPress={()=>this._onPress()}>
          <View style={{borderWidth: StyleSheet.hairlineWidth, borderColor:'#c9c9c9'}}>
            <Text >得到通讯录列表</Text>
          </View>

        </TouchableOpacity>
        {
          this.state.contacts.map((c, i)=>{
            return(
              <View key={i}>
                <Text>{c.familyName}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    );
  }

  _onPress(){
    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        console.log(err);
      } else {
        console.log(contacts)
        this.setState({contacts: contacts})
      }
    })
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
});

export{ ContactsPage as default };
