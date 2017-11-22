import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import HomeScreen from './HomeScreen.js';
import ChatScreen from './ChatScreen.js';
import EmpPerDet from './EmpPerDet.js';

var Dimensions = require('Dimensions');
var window = Dimensions.get('window');

var headerHeight = (window.width >= 375 ? 55 : 48 );

let navigationOptions = ({ navigation }) => {
  return {
    headerTintColor: '#2F95D6',
    headerStyle: {
      backgroundColor: '#f5f5f5',
      borderBottomColor: '#2F95D6',
      borderBottomWidth: 3,
      height: headerHeight,
      paddingTop: 2,
      paddingBottom: 2,
      justifyContent: 'center',
      width: window.width,
    },   
  }
}

const SimpleApp = StackNavigator({
  Home: { 
          screen: HomeScreen,
          navigationOptions: navigationOptions,
        },
  Chat: { 
          screen: ChatScreen,
          navigationOptions: navigationOptions,
        },
  EmpPerDet: { 
          screen: EmpPerDet,
          navigationOptions: navigationOptions,
        },
});

export default class App extends React.Component {
  render() {
    return (
      <View style ={styles.container}>
        <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
        <SimpleApp/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight
  },
});
