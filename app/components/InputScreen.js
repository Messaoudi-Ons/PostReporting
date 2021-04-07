/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Background from './Background';
import Button from './Button';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { View, Text, Alert } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import Header from './header';
const axios = require('axios');
export default class InputScreen extends Component {

  constructor(props) {

    super(props);
    this.state = {
      WONUM: '',

      FINISHTIME: '',
      STARTTIME: '',


      LABORCODE: '',
      STARTDATE: '',
      FINISHDATE: '',



    }
  }


  submit = e => {
    e.preventDefault();
    var that = this;

    axios.post('http://maxgps.smartech-tn.com:9876/maxrest/rest/os/MXEMPACT',
      null,
      {
        params: {


          FINISHTIME: this.state.FINISHTIME,
          STARTTIME: this.state.STARTTIME,



          STARTDATE: this.state.STARTDATE,
          FINISHDATE: this.state.FINISHDATE,
          LABORCODE: this.state.LABORCODE,
          WONUM: this.state.WONUM,
          SITEID: 'BEDFORD',
          _format: 'json',
          _lid: 'maxadmin',
          _lpwd: 'maxadmin',

        }
      }).then(function (result) {
        // console.log(result);
        console.log('here')
        if (!result.error) {
          that.setState({
            status: result.error,
            wholeResult: result,
          });
          Alert.alert("User register successfully ");
          console.log(that.state.wholeResult);
        } else {
          Alert.alert(JSON.stringify(result))
          console.log(result);
        }
      }).catch(function (error) {
        console.log("-------- error ------- " + error);
        alert("result:" + error)
      });



  }
  render() {
    const { WONUM, STARTDATE, STARTTIME, FINISHDATE, FINISHTIME, LABORCODE } = this.state;
    return (
      <Background  >

        <View style={{ width: '100%' }}>
          <Header title="Labor Reporting" />
        </View>




        <Input name="WONUM" onChangeText={(WONUM) => this.setState({ WONUM })} value={WONUM.value}
          placeholder='work Order'
          leftIcon={

            <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
          }
        />
        <Input name="LABORCODE" onChangeText={(LABORCODE) => this.setState({ LABORCODE })} value={LABORCODE.value}
          label='Labor' returnKeyType="next"
          leftIcon={
            <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
          }
        />


        <Button mode="contained" >
          Show configurations
          </Button>



        <View style={{ flexDirection: 'row', flex: 0.2, justifyContent: 'space-between' }}>
          <View style={{ width: 200 }}>
            <Input name="STARTDATE" onChangeText={(STARTDATE) => this.setState({ STARTDATE })} value={STARTDATE.value} type="text"


              placeholder='Start Date'
              leftIcon={
                <FontAwesome name="calendar" size={24} color="black" />
              }
            />
          </View>
          <View style={{ width: 200 }}>
            <Input name="FINISHDATE" onChangeText={(FINISHDATE) => this.setState({ FINISHDATE })} value={FINISHDATE.value}

              placeholder='End Date'
              leftIcon={
                <FontAwesome name="calendar" size={24} color="black" />
              }
            />
          </View>

        </View>
        <View style={{ flexDirection: 'row', flex: 0.2, justifyContent: 'space-between' }}>
          <View style={{ width: 200 }}>

            <Input
              name="STARTTIME" onChangeText={(STARTTIME) => this.setState({ STARTTIME })} value={STARTTIME.value}
              type="time" placeholder='Start Time'
              leftIcon={
                <MaterialCommunityIcons name="clock-time-four-outline" size={24} color="black" />}

            />
          </View>
          <View style={{ width: 200 }}>
            <Input name="FINISHTIME" onChangeText={(FINISHTIME) => this.setState({ FINISHTIME })} value={FINISHTIME.value}
              type="time"
              placeholder='End Time'
              leftIcon={
                <MaterialCommunityIcons name="clock-time-four-outline" size={24} color="black" />}
            />
          </View>
        </View>

        <Button onPress={this.submit}> Submit </Button>

      </Background>

    );
  }
}
