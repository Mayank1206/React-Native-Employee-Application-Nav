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

import EmpPerDet from './EmpPerDet';

import SearchBar from './SearchBar';

// import * as employeeService from './employee-service-mock';

import { Constants } from 'expo';

var Dimensions = require('Dimensions');
var window = Dimensions.get('window');

export default class HomeScreen extends Component {
  
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,  
      asdf: [],  
      pqrs: [],  
      navigate: this.props.navigation.navigate,
      searchEmp: false,
    }
  }

  componentDidMount() {
    return fetch('http://employee-directory-services.herokuapp.com/employees')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          asdf: responseJson,
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _keyExtractor = (item, index) => item.id;

    // findByName = (name) => new Promise((resolve, reject) => {
    //     let filtered = this.state.asdf.filter(this.state.asdf => (this.state.asdf.firstName + ' ' + this.state.asdf.lastName).toLowerCase().indexOf(name.toLowerCase()) > -1);
    //     resolve(filtered);
    //     });
  search(key) {

    let EmpArr = this.state.asdf;

      (key) => new Promise((resolve, reject) => {
              let filtered = EmpArr.filter(EmpArr => (EmpArr.firstName + ' ' + EmpArr.lastName).toLowerCase().indexOf(key.toLowerCase()) > -1);
              resolve(filtered);
              }).then(employees => {
          this.setState({
              pqrs: employees,
              searchEmp: true,
          });
      });
  }

  showAllEmp() {
    this.setState({
                    searchEmp: false,
                  });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container0}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container0}>
        <View style={styles.header}>
          <Text style={styles.heading}>Employee List</Text>
        </View>
        {
        this.state.searchEmp 
        ?
        <View>
          <View>
            <TouchableHighlight onPress={this.showAllEmp.bind(this)}>
              <Text style = {{ backgroundColor: "blue", color: "#fff" }}>
                Show All Employee List
              </Text>
            </TouchableHighlight>
          </View>
          <FlatList
            data= {this.state.pqrs}
            renderItem={({item}) => this.employeesData(item)}
            keyExtractor={this._keyExtractor}
            ListHeaderComponent={() => <SearchBar onChange={this.search.bind(this)} />}
          />
        </View>
        :
          <FlatList
            data= {this.state.asdf}
            renderItem={({item}) => this.employeesData(item)}
            keyExtractor={this._keyExtractor}
            ListHeaderComponent={() => <SearchBar onChange={this.search.bind(this)} />}
          />
        }
        </View>
    );
  }

  employeesData(emp) {
    return(
      <View>
        <TouchableHighlight onPress={() => this.state.navigate('EmpPerDet', { empId: emp.id, 
                                                                              empNameF:emp.firstName, 
                                                                              empNameL:emp.lastName,
                                                                              empTitle: emp.title,
                                                                              empEmail: emp.email,
                                                                              empPhone: emp.phone,
                                                                              empMobile: emp.mobilePhone,
                                                                              empPicture: emp.picture,
                                                                              title: `${emp.firstName} ${emp.lastName}`,
                                                                             })} 
                            underlayColor="#8b97a1">
          <View style= {styles.mainBox}>
            <Image
              source = {{uri: emp.picture}}
              style = {styles.empImage}
            />
            <View style= {styles.innerMainBox}>          
                <View>
                  <Text style={styles.empNameStyle}>
                    {emp.firstName} {emp.lastName}
                  </Text>
                  <Text>
                    {emp.title}
                  </Text>
                </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container0: {
    flex: 1, 
    paddingTop: 25,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderBottomColor: '#2F95D6',
    borderBottomWidth: 3,
    width: window.width,
  },
  heading: {
    fontWeight: '600',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  mainBox: {
    flexDirection: 'row',
    width: window.width,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: '#2F95D6',
    borderBottomWidth: 3,
  },
  innerMainBox: {
    width: window.width - 100,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  empNameStyle: {
    fontWeight: '600',
    fontSize: 15,
  },
});