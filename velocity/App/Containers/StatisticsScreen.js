import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  Image

} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { currentChallenge, userData, completedChallenges } from './UserData.js'
import * as Progress from 'react-native-progress';
import ProgressBox from '../Components/ProgressBox.js'
import Icon from 'react-native-vector-icons/Ionicons'

var { windowHeight, windowWidth } = Dimensions.get('window');

export default class Tuesday extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    currentState: 0,
    totalKM: 0,
    weeklyKM: 0,
    quote: "Hey Serena!. Start Your Biking Journey With Us, by Selecting a Challenge"
  };

  static navigationOptions = {
    tabBarIcon: () => (
      <Icon name='md-trophy' size={30} color='black' />
    )
  }

  componentDidMount() {
    var i = this.getCurrentState();
    console.log(userData[i])
    if(i<=4)this.setState(userData[i])
    else this.setState(userData[4])
  }

  componentWillUnmount() {
  }

  getCurrentState() {
    //return a number from 1 to 4
    return 2;
  }

  getTotalKM() {
    return this.state.totalKM;
  }

  /*
    switchState = () =>{
      if(this.state.currentState<3){
      this.setState({currentState:++this.state.currentState})
    }
    else this.setState({currentState:1})
    }
  */
  getWeeklyKM() {
    return this.state.weeklyKM;
  }

  getProgressBox() {
    console.log('current state ' + this.state.currentState);
    if (this.state.currentState == 0) {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: Dimensions.get('window').width / 1.2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 2
          }}
          onPress={() => { //navigate to browse challenge screen './App/Images/plus1600.png'
          }}>
          <Image
            style={{ width: Dimensions.get('window').width / 10, borderRadius: 500, height: Dimensions.get('window').width / 10 }}
            source={{ uri: 'https://maxcdn.icons8.com/Share/icon/p1em/Very_Basic//plus1600.png' }}
          />
          <Text style={styles.Quote}>Click to Add Challenge</Text>
        </TouchableOpacity>
      );
    }
    
    else {
      return (
        <Carousel
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={Dimensions.get('window').width / 1.1}
          itemWidth={Dimensions.get('window').width}
          snapOnAndroid={false}
          firstItem={2}
          slideStyle={{ width: Dimensions.get('window').width }}
        >

          {this.getPreviousCodes()}
          {this.getCurrentSlide()}
        </Carousel>);
    }
  }

  getCurrentSlide() {
    return (
      <ProgressBox
        displayText={currentChallenge.displayText}
        slideColor={currentChallenge.slideColor}
        totalDistance={currentChallenge.totalDistance}
        totalDays={currentChallenge.totalDays}
        discount={currentChallenge.discount}
        progress={this.state.progress}
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
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.5, backgroundColor: '#5CD0A0', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'gray',
              borderRadius: 500,
              flex: 0.4,
              width: Dimensions.get('window').width / 4
            }}
          //onPress={this.switchState()}
          //onPress={() => {this.setState({'currentState':0})}}
          >
            <Image
              style={{ width: Dimensions.get('window').width / 4, borderRadius: 500, height: '100%' }}
              source={require('../Images/serena.png')}
            >
            </Image>
          </TouchableOpacity>
          <View style={{ flex: 0.4, backgroundColor: 'white', justifyContent: 'center' }}>
            <Text style={styles.Quote}>
              {this.state.quote}
            </Text>
          </View>
          <View style={{ flex: 0.3, backgroundColor: 'white', flexDirection: 'row', width: Dimensions.get('window').width }}>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} >
              <Text style={styles.Quote}>
                {this.getWeeklyKM()} Km
              </Text>
              <Text style={styles.Quote}>
                This Week
                  </Text>
            </View>
            <View style={{ flex: 0.03, backgroundColor: 'gray' }} />
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} >
              <Text style={styles.Quote}>
                {this.getTotalKM()} Km
              </Text>
              <Text style={styles.Quote}>
                TOTAL
                  </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }} >
          <View style={{ top: 20, flex: 0.7, backgroundColor: 'white', alignItems: 'center' }}>
            {this.getProgressBox()}
          </View>
          <View style={{ flex: 0.3 }}>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Quote: {
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  smallText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    //resizeMode: 'cover', // or 'stretch'
  }

});