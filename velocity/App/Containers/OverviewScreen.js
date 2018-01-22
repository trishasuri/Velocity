import React from 'react'
import { connect } from 'react-redux'
import DemoActions from '../Redux/DemoRedux'
import { BackHandler, Button, View, Text, Image, TouchableOpacity, Dimensions, Modal } from 'react-native'
import WeatherBar from '../Components/WeatherBar'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import { Video } from 'expo'

import styles from './Styles/OverviewScreenStyles'

const { width, height } = Dimensions.get('window')

const mobilityList = [
  { quote: "Welcome back Serena. It's a beautiful day! Go for your next cycling reward.", boldQuote: null, weather: "Sunny, 23 °C", weatherImage: "ios-sunny-outline", buttonText: "Pick your next reward", challengeImage: "ios-trophy", rewardMessage: null, backgroundImage: "sunny_cycle", day: "Monday", rewardMultiplier: null },

  { quote: "Hooray, weather is bad enough to", boldQuote: 'earn double kilometers.', weather: "Cloudy, 15°", weatherImage: "ios-cloudy", buttonText: "Continue Challenge", challengeImage: "ios-trophy", rewardMessage: null, backgroundImage: "sunny_cycle", day: "Thursday", rewardMultiplier: '2x' },
  { quote: "Hooray, weather is bad enough to", boldQuote: 'earn double kilometers.', weather: "Cloudy, 15°", weatherImage: "ios-cloudy", buttonText: "Continue Challenge", challengeImage: "ios-trophy", rewardMessage: null, backgroundImage: "sunny_cycle", day: "Thursday", rewardMultiplier: '2x' },
  { quote: "Hooray, weather is bad enough to", boldQuote: 'earn double kilometers.', weather: "Cloudy, 15°", weatherImage: "ios-cloudy", buttonText: "Continue Challenge", challengeImage: "ios-trophy", rewardMessage: null, backgroundImage: "sunny_cycle", day: "Thursday", rewardMultiplier: '2x' },
]

class OverviewScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    isDriveNowVisible: false,
  }

  static navigationOptions = {
    tabBarIcon: () => (
      <Icon name='ios-home' size={30} color='black' />
    )
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack(null));
  };

  toggleDriveNow = () => {
    this.setState({ isDriveNowVisible: !this.state.isDriveNowVisible })
  }

  render() {
    const { appState } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Video
          source={require('../Videos/zoomcycle.mp4')}   // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref
          }}                                      // Store reference
          rate={1.0}                              // 0 is paused, 1 is normal.
          volume={1.0}                            // 0 is muted, 1 is normal.
          muted={false}                           // Mutes the audio entirely.
          paused={false}                          // Pauses playback entirely.
          resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
          repeat={true}                           // Repeat forever.
          playInBackground={false}                // Audio continues to play when app entering background.
          playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
          ignoreSilentSwitch={'ignore'}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
          progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
          onError={(e) => { console.warn(JSON.stringify(e)) }}               // Callback when video cannot be loaded
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          shouldPlay
          isLooping
        />

        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <View style={{ flex: 1 }} />

          <View style={{ flex: 8 }}>
            <View style={{ flex: 1 }} />

            <WeatherBar weather={mobilityList[appState].weather} icon={mobilityList[appState].weatherImage} day={mobilityList[appState].day} onPress={() => {
              this.props.increaseAppState()
            }} />

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 36, color: 'gold', fontWeight: 'bold' }}>
                {mobilityList[appState].rewardMultiplier}
              </Text>
            </View>

            <Text>
              <Text style={styles.quote}>
                {mobilityList[appState].quote}{' '}
              </Text>
              {mobilityList[appState].boldQuote ?
                <Text style={[styles.quote, { fontWeight: 'bold', color: 'gold' }]}>
                  {mobilityList[appState].boldQuote}
                </Text>
                : null}
            </Text>

            <View style={{ flex: 1 }} />
            <Icon.Button name='ios-bicycle-outline' size={32} backgroundColor='gold' onPress={() => {
              if (this.props.appState === 0) {
                this.props.navigation.navigate('RewardScreen')
              } else {
                this.props.navigation.navigate('StatsStackNav')
              }
            }}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{mobilityList[appState].buttonText}</Text>
            </Icon.Button>

            <View style={{ flex: 1 }} />

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Icon.Button name='ios-bus-outline' size={32} backgroundColor='gold' iconStyle={{ marginRight: 0 }} style={{ flex: 1, minWidth: 100, justifyContent: 'center' }} onPress={() => { }} />

              <View style={{ flex: 1 }} />

              <Icon.Button name='ios-car-outline' size={32} backgroundColor='gold' iconStyle={{ marginRight: 0 }} style={{ flex: 1, minWidth: 100, justifyContent: 'center' }} onPress={this.toggleDriveNow} />

            </View>
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ flex: 1 }} />
        </View>

        <Modal
          visible={this.state.isDriveNowVisible}
          onRequestClose={() => { }}
          animationType={'slide'}>
          <TouchableOpacity onPress={() => {
            this.toggleDriveNow()
            {/* this.props.increaseAppState() */ }
          }}>
            <Image source={require('../Images/drivenow.png')} resizeMode='stretch' style={{ width, height, alignSelf: 'stretch' }} />
          </TouchableOpacity>
        </Modal>

      </View >
    )
  }
}

const mapStateToProps = (state) => ({
  appState: state.demo.appState
})

const mapDispatchToProps = (dispatch) => ({
  increaseAppState: () => dispatch(DemoActions.demoIncreaseAppState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(OverviewScreen)