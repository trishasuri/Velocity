import React from 'react'
import { connect } from 'react-redux'
import DemoActions from '../Redux/DemoRedux'
import { Button, BackHandler, Text, View } from 'react-native'
// import BackgroundGeolocation from 'react-native-background-geolocation'
import MapView from 'react-native-maps'
import elastic from '../Components/ElasticFunctions'
import DeviceInfo from 'react-native-device-info'
import CustomCallout from '../Components/CustomCallout'
import Icon from 'react-native-vector-icons/Ionicons'
import RoundedButton from '../../App/Components/RoundedButton'
import { Constants, Location, Permissions } from 'expo'

import { Images } from '../Themes'

import styles from './Styles/TrackingScreenStyles'
import mapStyle from './Styles/CustomMapStyles'

const tmp = { lat: 48.176478, lng: 11.592637 }

const buttonStyle = {
  height: 45,
  width: 100,
  padding: 3,
  marginTop: 10,
  alignSelf: 'center',
  borderRadius: 10,
  backgroundColor: 'white',
  justifyContent: 'center'
}

class SocialScreen extends React.Component {

  constructor(props) {
    super(props)
    // var tmp = this.props.navigation.state.params;
    this.state = {
      currentLocation: {
        latitude: tmp.lat, longitude: tmp.lng, latitudeDelta: 0.015, longitudeDelta: 0.0121
      },
      userMarkers: [],
      circle: {
        center: {
          latitude: tmp.lat,
          longitude: tmp.lng,
        },
        radius: 700,
      },
      destination: {
        coordinates: { latitude: tmp.lat, longitude: tmp.lng },
        title: 'destination'
      },
      locationUpdate: true,
      isPeterShown: true,
    }
  }

  static navigationOptions = {
    tabBarIcon: () => (
      <Icon name='md-contact' size={30} color='black' />
    )
  }

  componentWillMount = () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    // 1.  Wire up event-listeners
    // console.log('inside componentWillMount');

    // This handler fires whenever bgGeo receives a location update.
    // BackgroundGeolocation.on('location', this.onLocation)

    // This handler fires whenever bgGeo receives an error
    // BackgroundGeolocation.on('error', this.onError)

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    // BackgroundGeolocation.on('motionchange', this.onMotionChange);

    // This event fires when a chnage in motion activity is detected
    // BackgroundGeolocation.on('activitychange', this.onActivityChange);

    // This event fires when the user toggles location-services
    // BackgroundGeolocation.on('providerchange', this.onProviderChange)

    // BackgroundGeolocation.getCurrentPosition((location) => this.onLocation
    // , function (errorCode) {
    //   alert('An location error occurred: ' + errorCode);
    // });
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    // console.log("component will unmount");
    // // Remove BackgroundGeolocation listeners
    // BackgroundGeolocation.un('location', this.onLocation);
    // BackgroundGeolocation.un('error', this.onError);
    // BackgroundGeolocation.un('motionchange', this.onMotionChange);
    // BackgroundGeolocation.un('activitychange', this.onActivityChange);
    // BackgroundGeolocation.un('providerchange', this.onProviderChange);
  }

  onLocation = (position) => {
    if (position.coords.accuracy <= 20) {
      var body = this.createElasticBody()
      var query = this.createElasticQuery()
      elastic.addNewDocument(elastic.endPoints.socialDB + DeviceInfo.getUniqueID(), body)
        .then((res) => {
          elastic.querySocialService(elastic.endPoints.socialDB + "_search", query)
            .then((queryResponse) => {
              var responseJSON = JSON.parse(queryResponse._bodyText)
              //console.log(responseJSON)
              var newMarkers = []
              if (responseJSON.hits.total > 0) {
                for (var i in responseJSON.hits.hits) {
                  if (responseJSON.hits.hits[i]._id != DeviceInfo.getUniqueID()) {
                    var marker = {
                      coordinate: {
                        latitude: responseJSON.hits.hits[i]._source.current_location.lat,
                        longitude: responseJSON.hits.hits[i]._source.current_location.lon,
                      },
                      id: responseJSON.hits.hits[i]._id
                    }
                    newMarkers.push(marker);
                  }
                }
              }
              this.setState({
                currentLocation: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121
                },
                //userMarkers: newMarkers,
                userMarkers: [{
                  coordinate: { latitude: 48.176578, longitude: 11.594637 },
                  id: 0
                }],
                circle: {
                  center: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                  },
                  radius: 700,
                },
                locationUpdate: true
              });
            }).catch((reason) => {
              console.log("reason for POST failure " + reason)
            })
        }).catch((rsn) => { console.log("reason for POST failure " + reason) })
    }
  }

  createElasticQuery = () => {
    var query = {
      "query": {
        "bool": {
          "filter": {
            "bool": {
              "must": [
                {
                  "range": {
                    "timestamp": {
                      "gte": new Date().toISOString() + "||-15m"
                    }
                  }
                },
                {
                  "geo_distance": {
                    "distance": "1km",
                    "current_location": {
                      "lat": this.state.currentLocation.latitude,
                      "lon": this.state.currentLocation.longitude
                    }
                  }
                },
                {
                  "geo_distance": {
                    "distance": "2km",
                    "destination": {
                      "lat": this.state.destination.coordinates.latitude,
                      "lon": this.state.destination.coordinates.longitude
                    }
                  }
                }
              ]
            }
          }
        }
      }
    }
    return query
  }

  createElasticBody = () => {
    var body = {
      "current_location": {
        "lat": this.state.currentLocation.latitude,
        "lon": this.state.currentLocation.longitude
      },
      "destination": {
        "lat": this.state.destination.coordinates.latitude,
        "lon": this.state.destination.coordinates.longitude
      },
      "timestamp": new Date().toISOString()
    }
    return body
  }

  onError(error) {
    var type = error.type;
    var code = error.code;
    alert(type + " Error: " + code);
  }

  onActivityChange(activityName) {
    // console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
  }

  onProviderChange(provider) {
    // console.log('- Location provider changed: ', provider.enabled);
    //TODO: remind user to enable GPS for feature to work
  }

  onMotionChange(location) {
    // console.log('- [js]motionchanged: ', JSON.stringify(location));
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  render() {
    const { destination, currentLocation, circle, locationUpdate } = this.state;
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: currentLocation.latitudeDelta,
              longitudeDelta: currentLocation.longitudeDelta,
            }}
            customMapStyle={mapStyle}
            showsUserLocation={true}
            followsUserLocation={true}
            loadingEnabled={true}
            onMapReady={() => {
              this.setState({
                isPeterShown: true
              })
            }}>
            {this.state.isPeterShown &&
              <MapView.Marker
                image={Images.peter}
                coordinate={{ latitude: tmp.lat + 0.001, longitude: tmp.lng + 0.001 }}>
                <MapView.Callout tooltip
                  onPress={() => {
                    console.log("Peter was notified")
                  }}>
                  <CustomCallout>
                    <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Peter is leaving work on his bike in 5 minutes.</Text>
                    <RoundedButton
                      onPress={() => {
                        this.props.increaseAppState()
                        {/* this.props.navigation.navigate('StatsStackNav') */ }
                      }}
                      disabled={false}
                      newStyle={buttonStyle}
                    >
                      Join Peter
                      </RoundedButton>
                  </CustomCallout>
                </MapView.Callout>
              </MapView.Marker>}
          </MapView>
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  appState: state.demo.appState
})

const mapDispatchToProps = (dispatch) => ({
  increaseAppState: () => dispatch(DemoActions.demoIncreaseAppState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SocialScreen)