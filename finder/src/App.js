import React, { Component } from 'react';
import logo from './logo.svg';
import finderLogo from './finderLogo.png';
import './App.css';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Flexbox from 'flexbox-react';
import _ from 'lodash'
import moment from 'moment';
import { Button,  ButtonGroup} from 'react-bootstrap';

export class Container extends React.Component {

    constructor(props) {
    super(props);
    this.playCPR = this.playCPR.bind(this)
    this.playEp = this.playEp.bind(this)
    this.state = {
      phone_num: "n/a",
      name: "n/a",
      age: "n/a",
      lat: 38.541830,
      long: -121.759823,
      conditions: "n/a",
      medications: "n/a"
    }
    const config = {
      apiKey: "AIzaSyCCIi25i67u4nNQ77ITLeYlm4fp9rnaB18",
      authDomain: "finder-hackdavis.firebaseapp.com",
      databaseURL: "https://finder-hackdavis.firebaseio.com",
      projectId: "finder-hackdavis",
      storageBucket: "finder-hackdavis.appspot.com",
      messagingSenderId: "239431044518"
    };
    firebase.initializeApp(config);
  }

  componentWillMount() {
    var self = this;
    let messagesRef = firebase.database().ref('calls').orderByChild('timestamp');
    messagesRef.on('value', function(snapshot) {
          const calls = snapshot.val();

          const orderedCalls = _.sortBy(calls, [(call) => call.timestamp])

          const mostRecent = _.last(orderedCalls)
          console.log(orderedCalls);
          console.log(mostRecent);
          //const length = Object.keys(calls).length;
          //const call = calls[[Object.keys(calls)[length-1]]];
          //const currentCall = calls['current_call'];
          const key = mostRecent.phoneNumber;
          const call = calls[key];
          console.log(call);
          self.setState({
            phone_num: call.phoneNumber,
            name: call.name,
            age: call.age,
            lat: call.latitude,
            long: call.longitude,
            conditions: call.health_info,
            medications: call.medication
          })
          if (call.health_info == null) {
            self.setState({conditions: "n/a"})
          }
          if (call.medication == null) {
            self.setState({medications: "n/a"})
          }
        })
  }

  playCPR() {
    firebase.database().ref('playCPR').set({
      CPR: true,
      timestamp: moment().format('HH:mm:ss.SSS'),
    });
  }

  playEp() {
    firebase.database().ref('playEp').set({
      Ep: true,
      timestamp: moment().format('HH:mm:ss.SSS'),
    });
  }

  render() {
    var rowStyle = {
            display:'flex',
            flexDirection:'column'
    };
    return (
      <div className="Testing">

      <header className="App-header">
        <img src={finderLogo} style={{height:"50%"}}/>
        <h1>Caller Number: {this.state.phone_num}</h1>
      </header>

        <div className='Wrapper'>
        <Flexbox flexDirection="row" >

          <Flexbox flexGrow={1} marginRight="50%">
            <Map
              google={this.props.google}
              style = {{width: '50%',height: '80%'}}
              initialCenter={{
                lat: this.state.lat,
                lng: this.state.long
              }}
              zoom = {16}>
              <Marker
                name={'Caller Location'}
                position={{lat: this.state.lat, lng: this.state.long}}>
              </Marker>
            </Map>

          </Flexbox>

          <Flexbox flexDirection="column" flexGrow={10}>
            <Flexbox flexGrow={1}>
              <ButtonGroup style={{ marginTop: 10 }}>
                <Button bsStyle="danger" bsSize="large" onClick={this.playCPR}>
                  Send CPR
                </Button>
                <Button bsStyle="warning" bsSize="large" onClick={this.playEp}>
                  Send EpiPen
                </Button>
              </ButtonGroup>
            </Flexbox>
            <Flexbox flexGrow={1}>
              <h1>{"Caller Information"}</h1>
            </Flexbox>
            <Flexbox flexGrow={1}>
              <h2>Name: {this.state.name}</h2>
            </Flexbox>
            <Flexbox flexGrow={1}>
              <h2>Age: {this.state.age}</h2>
            </Flexbox>
            <Flexbox flexGrow={1}>
              <h2>Latitude: {this.state.lat}</h2>
            </Flexbox>
            <Flexbox flexGrow={1}>
              <h2>Longitude: {this.state.long}</h2>
            </Flexbox>
            <Flexbox flexGrow={1}>
              <h2>Pre-existing Conditions: {this.state.conditions}</h2>
            </Flexbox>
            <Flexbox flexGrow={1}>
              <h2>Medications: {this.state.medications}</h2>
            </Flexbox>
            <Flexbox flexGrow={1}>

            </Flexbox>

          </Flexbox>

        </Flexbox>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDX-Ds8aRPvo2PHK6uVBH25zaqGJ5n2dIQ",
})(Container)
