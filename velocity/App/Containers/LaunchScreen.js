import React from 'react'
import { ScrollView, Text, Image, View, TextInput, Button, Dimensions, TouchableHighlight } from 'react-native'
import LoginButton from './LoginButton'
import GetStartedButton from '../Components/GetStartedButton'
import DeviceInfo from 'react-native-device-info'
// import BackgroundGeolocation from 'react-native-background-geolocation'
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';

import { Metrics, Colors, Images } from '../Themes'
var { width, height } = Dimensions.get('window')

// Styles
import styles from './Styles/LaunchScreenStyles'
import geo from '../Components/GeoCoding'

const buttonStyle = {
  marginBottom: 50,
  height: 55,
  width: 300,
  alignSelf: 'center',
  borderRadius: 10,
  marginHorizontal: Metrics.section,
  marginVertical: Metrics.baseMargin,
  backgroundColor: 'white',
  justifyContent: 'center'
}

export default class LaunchScreen extends React.Component {
  state = {
    shouldDisableStartButton: true
  }

  componentWillMount() {
    // BackgroundGeolocation.configure({
    //   // Geolocation Config
    //   desiredAccuracy: 0,
    //   stationaryRadius: 10,
    //   distanceFilter: 50,
    //   minimumActivityRecognitionConfidence: 90,
    //   // Activity Recognition
    //   stopTimeout: 1,
    //   // Application config
    //   // debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    //   logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    //   stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
    //   startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    // }, function (state) {
    //   console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

    //   if (!state.enabled) {
    //     BackgroundGeolocation.start(function () {
    //       console.log("- Start success");
    //     });
    //   }
    // });
  }

  onAnimatePress = () => {
    this.refs.view.transitionTo({ opacity: 1 }, 1000)
    setTimeout(() => {
      this.refs.hiddenView.transitionTo({ width: 800 }, 1000)
      setTimeout(() => {
        this.props.onBeginPress()
      }, 1000)
    }, 200);
  }

  render() {
    return (
      <LinearGradient colors={['#5CD0A0', '#D2F29F']} style={styles.linearGradient}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 8, flexDirection: 'row' }}>
          <Animatable.View ref='hiddenView' style={{ width: width / 2 - 80 }} />
          <Animatable.View ref="view" style={{ opacity: 0.2 }}>
            <Image
              source={require('../Images/velocity-logo.png')}
              style={{ resizeMode: 'contain', flex: 1 }} />
          </Animatable.View>
        </View>
        <View style={{ flex: 1 }} />
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 48 }}>
          VELOCITY
        </Text>
        <View style={{ flex: 1 }} />
        <Animatable.Text style={{ textAlign: 'center', fontSize: 24, color: 'white' }} animation='zoomInUp' duration={2000}>Your Healthy Commute</Animatable.Text>
        <Animatable.Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }} animation='zoomInUp' duration={2000} delay={1000}>hassle free | relaxing | motivating</Animatable.Text>
        <View style={{ flex: 1 }} />
        <Animatable.Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }} animation='zoomInUp' duration={2000} delay={2000}>Sponsored by your employer</Animatable.Text>
        <View style={{ flex: 1 }} />
        <GetStartedButton
          disabled={false}
          newStyle={buttonStyle}
          onPress={this.onAnimatePress}
        />
      </LinearGradient>
    )
  }
}