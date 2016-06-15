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
        <TouchableOpacity style={{alignItems: 'center', }} onPress={()=>this._onPress(true)}>
          <View style={{borderWidth: StyleSheet.hairlineWidth, borderColor: '#c9c9c9', borderRadius: 4, padding: 10, backgroundColor: 'blue', marginTop: 4}}>
            <Text style={{color: 'white'}}>得到通讯录</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', marginBottom: 10 }} onPress={()=>this._onPress(false)}>
          <View style={{borderWidth: StyleSheet.hairlineWidth, borderColor: '#c9c9c9', borderRadius: 4, padding: 10, backgroundColor: 'red'}}>
            <Text style={{color: 'white'}}>清楚通讯录</Text>
          </View>
        </TouchableOpacity>
        {
          this.state.contacts.map((c, i)=>{
            let middleName = "";
            let phone = "";
            c.middleName && ( middleName = c.middleName );
            c.phoneNumbers[0] && (phone = c.phoneNumbers[0].number);
            return(
              <View style={{height: 100, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#c9c9c9', justifyContent: 'center'}} key={i}>
                <Text style={{margin: 10, color: 'black', fontSize: 20}}>{c.familyName+ c.givenName+ middleName}</Text>
                <Text style={{margin: 10}}>{phone}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    );
  }

  _onPress(isShow){
    if(isShow){
      Contacts.getAll((err, contacts) => {
        if(err && err.type === 'permissionDenied'){
          console.log(err);
        } else {
          console.log(contacts)
          this.setState({contacts: contacts})
        }
      })
    } else {
      this.setState({contacts: []})
    }
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
