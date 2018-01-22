import React from 'react'
import { BackHandler, Button, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import BackgroundGeolocation from 'react-native-background-geolocation'
import MapView from 'react-native-maps'
import styles from './Styles/TrackingScreenStyles'
import elastic from '../Components/ElasticFunctions'

export default class TrackingScreen extends React.Component {
  constructor(props) {
    super(props);
    var tmp = this.props.navigation.state.params;
    console.log(tmp)
    this.state = {
      activityName: 'still',
      activities: [{ timestamp: (new Date()).toUTCString(), activity: 'still', distance: 0, confidence: 0 }],
      locations: [],
      markers: [],
      coordinateArray: [],
      markerCount: 0,
      error: null,
      lastRideDistance: null,
      trackingStatus: "True",
      destination: {
        coordinates: { latitude: tmp.lat, longitude: tmp.lng },
        title: 'destination'
      }
    }
  }

  componentWillMount() {
    // 1.  Wire up event-listeners
    console.log('inside componentWillMount');

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation)

    // This handler fires whenever bgGeo receives an error
    BackgroundGeolocation.on('error', this.onError)

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange)

    // This event fires when a chnage in motion activity is detected
    BackgroundGeolocation.on('activitychange', this.onActivityChange)

    // This event fires when the user toggles location-services
    BackgroundGeolocation.on('providerchange', this.onProviderChange)
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    console.log("component will unmount");
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('error', this.onError);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
    BackgroundGeolocation.un('activitychange', this.onActivityChange);
    BackgroundGeolocation.un('providerchange', this.onProviderChange);
  }

  onLocation = (position) => {
    const { activityName } = this.state.activities[this.state.activities.length - 1]
    console.warn('position change detected');
    var newMarkers = clone(this.state.markers);
    var newCount = ++this.state.markerCount;
    var newCoordinateArray = clone(this.state.coordinateArray);
    markerData = {};
    markerData.coordinates = {};
    markerData.coordinates.latitude = position.coords.latitude;
    markerData.coordinates.longitude = position.coords.longitude;
    markerData.key = newCount;
    markerData.title = markerData.key + ' ' + position.coords.accuracy;
    markerData.description = markerData.coordinates.latitude +
      '\n' + markerData.coordinates.longitude;
    if (position.coords.accuracy <= 20) {
      newMarkers.push(markerData);
      newCoordinateArray.push({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        key: newCount
      });
      this.setState({
        markers: newMarkers,
        markerCount: newCount,
        coordinateArray: newCoordinateArray,
        locations: [{ timestamp: (new Date()).toUTCString(), activity: activityName, position }, ...this.state.locations]
      });
      // console.log(this.state.markerCount + " " + this.state.markers);
    }
    else console.warn("Reading not accurate enough " + position.coords.accuracy);

  }
  onError(error) {
    var type = error.type;
    var code = error.code;
    alert(type + " Error: " + code);
  }

  onActivityChange = (activityName) => {
    BackgroundGeolocation.getOdometer((distance) => {
      this.setState({
        activityName,
        activities: [{ timestamp: (new Date()).toUTCString(), activity: activityName, distance }, ...this.state.activities]
      });
    });
    console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
  }
  onProviderChange(provider) {
    console.log('- Location provider changed: ', provider.enabled);
  }
  onMotionChange(location) {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  onClickStartGPS = () => {
    console.log("onClickStartGPS ");
  }

  onClickStopGPS = () => {
    console.log("onClickStopGPS " + JSON.stringify(this.state));
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('error', this.onError);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
    BackgroundGeolocation.un('activitychange', this.onActivityChange);
    BackgroundGeolocation.un('providerchange', this.onProviderChange);
    this.setState({
      lastRideDistance: "Yay! You Rode " +
      calculateDistanceLocally(this.state.markers) +
      " Kms.",
      trackingStatus: 'False'
    });
    elastic.addNewDocument(elastic.endPoints.bikesDB, this.state);
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          {this.state.locations.length == 0 &&
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 48.176535,
                longitude: 11.5926,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <MapView.Marker
                coordinate={this.state.destination.coordinates}
                title={this.state.destination.title}
                key={-1}
              />
            </MapView>
          }
          {this.state.locations.length > 0 &&
            <MapView
              style={styles.map}
              region={{
                latitude: this.state.locations[0].position.coords.latitude,
                longitude: this.state.locations[0].position.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              {this.state.markers.length > 0 &&
                <MapView.Marker
                  coordinate={this.state.markers[this.state.markers.length - 1].coordinates}
                  title={this.state.markers[this.state.markers.length - 1].title}
                  description={this.state.markers[this.state.markers.length - 1].description}
                  key={this.state.markers[this.state.markers.length - 1].key}
                />
              }
              {this.state.coordinateArray.length > 0 &&
                <MapView.Polyline
                  coordinates={this.state.coordinateArray}
                  strokeWidth={mapProperties.Polyline.strokeWidth}
                />
              }
            </MapView>
          }
        </View>
        <View style={styles.buttonBar}>
          <TouchableOpacity onPress={this.onClickStopGPS}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Stop Tracking</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.titleText} >
            TrackingEnabled - {this.state.trackingStatus}!
          </Text>
          <Text style={styles.text} >
            {this.state.activityName}
          </Text>
          {this.state.activities &&
            <View >
              <Text style={styles.sectionText}>{this.state.activities[this.state.activities.length - 1].activity}</Text>
              <Text style={styles.sectionText}>{this.state.activities[this.state.activities.length - 1].distance}</Text>
            </View>
          }
          <Button
            title="Show Stats"
            onPress={() => {
              this.props.navigation.navigate('StatisticsScreen')
            }}
          />
          <Text style={styles.titleText}>{this.state.lastRideDistance}</Text>
        </View>
      </View>
    );
  }
}

//uility function to clone objects
function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

function calculateDistanceLocally(markers) {
  var R = 6371e3; // Avg Earth radius in metres
  var distance = 0;
  var length = markers.length;
  for (i = 1; i < length; i++) {
    var lat1 = markers[i].coordinates.latitude;
    var lat2 = markers[i - 1].coordinates.latitude;
    var lon1 = markers[i].coordinates.longitude;
    var lon2 = markers[i - 1].coordinates.longitude;
    console.log(lat1 + " " + lon1 + " " + lon2);
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2 - lat1).toRadians();
    var Δλ = (lon2 - lon1).toRadians();
    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c / 1000;    //kms
    distance = distance + d;
  }
  return distance.toFixed(2);
}

/** Extend Number object with method to convert numeric degrees to radians */
if (Number.prototype.toRadians === undefined) {
  Number.prototype.toRadians = function () { return this * Math.PI / 180; };
}

const mapProperties = {
  Polyline: {
    strokeWidth: 2
  }
}
