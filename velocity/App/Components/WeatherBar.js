import React from 'react'
import { View, Modal, Text, Dimensions, TouchableOpacity } from 'react-native'
import DebugConfig from '../../App/Config/DebugConfig'
// import BackgroundGeolocation from 'react-native-background-geolocation'
import Icon from 'react-native-vector-icons/Ionicons'
var { width, height } = Dimensions.get('window')

export default class WeatherBar extends React.Component {
  constructor(props) {
    super(props)
  }

  // Weather API functionality
  // fetchWeatherForLatLon = (lat, lon) => {
  //   var APIkey = encodeURIComponent('988c5818473102a92f426f3f3d52af10');
  //   return fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + APIkey)
  //     .then((response) => {
  //       this.setState({ weather: JSON.parse(response._bodyInit).weather });
  //     }).catch((reason) => { console.error(error) });
  // }

  // componentWillMount = () => {
  //   BackgroundGeolocation.getCurrentPosition((location) => this.fetchWeatherForLatLon(location.coords.latitude, location.coords.longitude)
  //     , function (errorCode) {
  //       alert('An location error occurred: ' + errorCode);
  //     });
  // }

  render() {
    //var currentWeather = this.state.weather[0].main;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={this.props.icon} size={80} color='white' />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 20, color: 'white', paddingLeft: width * 0.03 }}>{this.props.weather}</Text>
            <Text style={{ fontSize: 16, color: 'white', paddingLeft: width * 0.03 }}>{this.props.day}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}