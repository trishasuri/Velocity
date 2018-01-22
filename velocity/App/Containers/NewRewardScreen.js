import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  BackHandler,
  Image,
  ScrollView,
  StatusBar
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ENTRIES1, ENTRIES2 } from './NewCarouselList.js'
import ChallengeModal from './ChallengeModal.js'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'
import SliderEntry from './SliderEntry'

import { sliderWidth, itemWidth } from './Styles/SliderEntryStyles';
import styles from './Styles/SliderStyles'
var { windowHeight, windowWidth } = Dimensions.get('window');

export default class NewRewardScreen extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Icon name='ios-home' size={30} color='black' />
    )
  }

  getSlides(entries, colors) {
    if (!entries) {
      return false;
    }

    return entries.map((entry, index) => {
      return (
        <SliderEntry
          navigation={this.props.navigation}
          key={`carousel-entry-${index}`}
          even={(index + 1) % 2 === 0}
          colors={colors}
          {...entry}
        />
      );
    });
  }

  get example1() {
    return (
      <Carousel
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        autoplay={false}
        autoplayDelay={500}
        autoplayInterval={2500}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContainer}
        showsHorizontalScrollIndicator={false}
        snapOnAndroid={true}
        removeClippedSubviews={false}
      >
        {this.getSlides(ENTRIES1, ['#5CD0A0', '#D2F29F'])}
      </Carousel>
    );
  }

  get example2() {
    return (
      <Carousel
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        autoplay={false}
        autoplayDelay={500}
        autoplayInterval={2500}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContainer}
        showsHorizontalScrollIndicator={false}
        snapOnAndroid={true}
        removeClippedSubviews={false}
      >
        {this.getSlides(ENTRIES2, ['#FF530D', '#FCD116'])}
      </Carousel>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <Text style={styles.title}>Select your reward</Text>
          <Text style={styles.subtitle}>Get better rewards the more you cycle</Text>
        </View>
        <View style={{ flex: 3 }}>
          {this.example1}
        </View>
        <View style={{ flex: 3 }}>
          {this.example2}
        </View>
      </View>
    );
  }
}