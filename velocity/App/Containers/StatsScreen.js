import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import DemoActions from '../Redux/DemoRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/StatsScreenStyle'
import Carousel from 'react-native-snap-carousel';
import { currentChallenge, userData, completedChallenges } from './UserData.js'
import * as Progress from 'react-native-progress';
import ProgressBox from '../Components/ProgressBox.js'
import Icon from 'react-native-vector-icons/Ionicons'

var { windowHeight, windowWidth } = Dimensions.get('window');

const stateList = [
  { motivationText: 'Hey Serena! Prepare for your next challenge. Ready, set, go!', weekKm: '0', totalKm: '36', progress: '0', leftKm: '100', leftDay: '7' },
  { motivationText: "Hey Serena, you're doing great. \nKeep it up, finish strong!", weekKm: '15', totalKm: '51', progress: '15', leftKm: '70', leftDay: '7' },
  { motivationText: "Hey Serena, you're doing great. \nKeep it up, finish strong!", weekKm: '30', totalKm: '66', progress: '30', leftKm: '40', leftDay: '7' },
  { motivationText: 'Congrats on completing your challenge, Serena!', weekKm: '100', totalKm: '136', progress: '100' },
]

class StatsScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    totalKM: 0,
    weeklyKM: 0,
    quote: "Hey Serena!. Start Your Biking Journey With Us, by Selecting a Challenge"
  };

  static navigationOptions = {
    tabBarIcon: () => (
      <Icon name='md-trophy' size={30} color='black' />
    )
  }

  getProgressBox() {
    return (
      <Carousel
        ref={(carousel) => { this._carousel = carousel; }}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.8}
        snapOnAndroid={false}
        firstItem={2}
      >

        {this.getPreviousCodes()}
        {this.getCurrentSlide()}
      </Carousel>);
  }

  getCurrentSlide() {
    const { appState } = this.props
    return (
      <ProgressBox
        displayText={currentChallenge.displayText}
        slideColor={currentChallenge.slideColor}
        leftKm={parseInt(stateList[appState].leftKm)}
        leftDay={parseInt(stateList[appState].leftDay)}
        discount={currentChallenge.discount}
        progress={parseInt(stateList[appState].progress)/100}
        logo={currentChallenge.logo}
        background={currentChallenge.background}
        couponCode={currentChallenge.couponCode}
      />
    );
  }


  getPreviousCodes() {
    return completedChallenges.map((entry, index) => {
      return (

        <ProgressBox
          displayText={entry.displayText}
          slideColor={entry.slideColor}
          totalDistance={entry.totalDistance}
          totalDays={entry.totalDays}
          discount={entry.discount}
          logo={entry.logo}
          background={entry.background}
          progress={entry.progress}
          key={`entry-${index}`}
          couponCode={entry.couponCode}
        />

      )
    })
  }

  render() {
    const { appState } = this.props
    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: 1, backgroundColor: '#5CD0A0', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.increaseAppState()}>
              <Image source={require('../Images/serena.png')} style={{ width: 96, height: 96 }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', color: 'dimgray' }}>{stateList[appState].motivationText}</Text>

          <View style={{ flexDirection: 'row' }}>

            <View style={{ alignItems: 'center', borderRightWidth: 0.5, paddingHorizontal: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 36 }}>{stateList[appState].weekKm} km</Text>
              <Text style={{ color: 'grey', fontSize: 20 }}>This week</Text>
            </View>

            <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 36 }}>{stateList[appState].totalKm} km</Text>
              <Text style={{ color: 'grey', fontSize: 20 }}>Total</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 3, backgroundColor: 'grey' }} >
          <View style={{ flex: 4, backgroundColor: 'white' }} >
            <View style={{ flex: 1 }} />
            <View style={{ flex: 10, backgroundColor: 'white', alignItems: 'center' }}>
              {this.getProgressBox()}
            </View>
            <View style={{ flex: 1 }} />
          </View>
        </View>
      </View >
    )
  }
}

const mapStateToProps = (state) => ({
  appState: state.demo.appState
})

const mapDispatchToProps = (dispatch) => {
  return {
    increaseAppState: () => dispatch(DemoActions.demoIncreaseAppState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen)
