import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Container, Content, Text, Button, Form, Item, Input, Card, Label } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import call from 'react-native-phone-call';
import moment from 'moment';
import Video from 'react-native-video';
import * as firebase from 'firebase';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';


class HomeScreen extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       phone_num: '8189703554',
       name: 'John Doe',
       age: '21',
       health: 'High Blood Pressure',
       medication: 'Chlorthalidone',
       cpr: false,
       ep: false,
      };
   }

  static navigationOptions = {
    title: (
      <Image
      style={{
        width: 150,
        height: 36,}}

      source={require('/Users/skrut/Developer/HackDavis18/finder/src/\&finder.png')}
      />
  ),
}

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyCCIi25i67u4nNQ77ITLeYlm4fp9rnaB18",
      authDomain: "finder-hackdavis.firebaseapp.com",
      databaseURL: "https://finder-hackdavis.firebaseio.com",
      projectId: "finder-hackdavis",
      storageBucket: "finder-hackdavis.appspot.com",
      messagingSenderId: "239431044518"
    };
    const firebaseApp = firebase.initializeApp(config);
    const database = firebase.database();
    let messageRef = firebase.database().ref('playCPR');
    messageRef.on('child_changed', (snapshot) => {
      this.setState({ cpr: true })
    });
    let messageEp = firebase.database().ref('playEp');
    messageEp.on('child_changed', (snapshot) => {
      this.setState({ ep: true })
    });
  }

  writeData(lat, long) {
    firebase.database().ref('calls/' + this.state.phone_num).set({
      timestamp: moment().format('HH:mm:ss.SSS'),
      phoneNumber: this.state.phone_num,
      name: this.state.name,
      age: this.state.age,
      latitude: lat,
      longitude: long,
      health_info: this.state.health,
      medication: this.state.medication,
    });
  }

  onCallPress() {
    const args = {
      number: '8184255189', // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.writeData(position.coords.latitude, position.coords.longitude);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    call(args);
  }

  render() {

    let show = null;
    if (this.state.cpr) {
      show = <Video
        volume={1.0}
        muted={false} 
        source={require('./cpr.mp4')}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        resizeMode={'contain'}
        onEnd={() => { this.setState({ cpr: false }) }}
        repeat={false}
      />
    } else if (this.state.ep) {
        show = <Video
          source={require('./ep.mp4')}
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          resizeMode={'contain'}
          onEnd={() => { this.setState({ ep: false }) }}
          repeat={false}
        />
    }
     else {
      show = <Grid>
        <Row size={80}>
          <Card style={{ margin: 10}}>
            <Form>
              <Item floatingLabel>
                <Label>Phone Number</Label>
                <Input  keyboardType = 'numeric' placeholder="Phone Number" value={this.state.phone_num} onChangeText={(text) => this.setState({ phone_num: text })}/>
              </Item>
              <Item floatingLabel>
                <Label>Name</Label>
                <Input placeholder="Name" value={this.state.name} onChangeText={(text) => this.setState({ name: text })}/>
              </Item>
              <Item floatingLabel>
                <Label>Age</Label>
                <Input keyboardType = 'numeric' placeholder="Age" value={this.state.age} onChangeText={(text) => this.setState({ age: text })} />
              </Item>
              <Item floatingLabel>
                <Label>Health Information</Label>
                <Input placeholder="Health Information" value={this.state.health} onChangeText={(text) => this.setState({ health: text })}/>
              </Item>
              <Item floatingLabel>
                <Label>Medication</Label>
                <Input placeholder="Medication" value={this.state.medication} onChangeText={(text) => this.setState({ medication: text })}/>
              </Item>
            </Form>
            </Card>
          </Row>
          <Row size={20} >
            <Button block large danger style={{ flex: 1, marginTop: 25, marginLeft: 10, marginRight: 10 }} onPress={ () => this.onCallPress()}><Text>Call 911</Text></Button>
          </Row>
        </Grid>
    }

    const { navigate } = this.props.navigation;
    return (
      <Container>
        {show}
      </Container>
      );
  }
}

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen }
})

export default class App extends Component<{}> {
  render() {
    return <NavigationApp />
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 7,
  },
  container: {
    marginTop: 10,
  },
  content:{
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'center'
},
});
