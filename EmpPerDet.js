import React, { Component } from 'react';

import { 
  ActivityIndicator, 
  AsyncStorage,
  Button, 
  FlatList,
  Image,
  Navigator,
  StyleSheet, 
  Text,
  TouchableHighlight,
  View 
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import { Constants } from 'expo';

import ActionBar from './ActionBar';

var Dimensions = require('Dimensions');
var window = Dimensions.get('window');

export default class EmpPerDet extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });
  render(){
    const {state} = this.props.navigation;
    var empId = state.params ? state.params.empId : "<undefined>";
    var empNameF = state.params ? state.params.empNameF : "<undefined>";
    var empNameL = state.params ? state.params.empNameL : "<undefined>";
    var empTitle = state.params ? state.params.empTitle : "<undefined>";
    var empEmail = state.params ? state.params.empEmail : "<undefined>";
    var empPhone = state.params ? state.params.empPhone : "<undefined>";
    var empMobile = state.params ? state.params.empMobile : "<undefined>";
    var empPicture = state.params ? state.params.empPicture : "<undefined>";
    return(
      <View style= {styles.container1}>
        <View style = {styles.perEmp}>
            <Image
              source = {{uri: empPicture}}
              style = {styles.imageEmp}
            />
            <Text style={styles.perName}>{empNameF} {empNameL}</Text>
            <Text style={styles.perPost}>{empTitle}</Text>
        </View>
        <View style={styles.actonBar}>
          <ActionBar mobilePhone={empMobile} email={empEmail} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1, 
    paddingTop: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageEmp: {
    height: 100,
    borderRadius: 50,
    width: 100
  },
  perEmp: {
    alignItems: 'center',
  },
  perName: {
    fontWeight: '400',
    fontSize: 20,
    paddingTop: 15,
  },
  perPost: {
    fontSize: 18,
    fontWeight: '400',
    color: '#ccc',
  },
  actonBar: {
    paddingTop: 15,
    width: window.width,
  }
});
