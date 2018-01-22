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
  Image

} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselList from './CarouselList.js'
import ChallengeModal from './ChallengeModal.js'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'

var { windowHeight, windowWidth } = Dimensions.get('window');
var categoryViewHeight = 1 / (CarouselList.length);

export default class RewardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    }
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  static navigationOptions = {
    tabBarIcon: () => (
      <Icon name='ios-home' size={30} color='black' />
    )
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack(null));
  }

  componentWillUnmount() {

  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const slides = CarouselList.map((entry, index) => {
      return (
        <View key={`entry-${index}`} style={styles.categoryView}>
          <View style={styles.displayTextContainer}>
          </View>
          <View style={styles.carouselContainer}>
            <Carousel
              ref={(carousel) => { this._carousel = carousel; }}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
              snapOnAndroid={false}
              firstItem={1}
              slideStyle={{ height: '100%' }}
            >
              {entry.Items.map((entry, index) => {
                console.log(entry.color1 + ' ' + entry.color2)
                console.log(entry.colorArray)
                //{[entry.color1,entry.color2]}
                //{['yellow','green']}x`
                return (
                  <LinearGradient
                    colors={entry.hexArray}
                    style={{ borderRadius: 10 }}
                    key={`entry-${index}`}>
                    <TouchableOpacity
                      style={{
                        height: '100%',
                        width: Dimensions.get('window').width / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        borderWidth: 0,
                      }}
                      key={`entry-${index}`}
                      onPress={() => {
                        this.setState({
                          displayText: entry.displayText,
                          challengeDescription: entry.descriptionText,
                          modalVisible: true,
                          slideColor: entry.slideColor,
                          categoryId: entry.categoryId,
                          offerID: entry.offerID,
                          totalDistance: entry.totalDistance,
                          totalDays: entry.totalDays,
                          discount: entry.discount,
                          hexArray: entry.hexArray,
                          logo: entry.logo
                        })
                      }}>
                      <Text style={styles.titleText}>{entry.displayText}</Text>
                      <Image
                        style={{ width: '50%', height: '50%' }}
                        source={entry.logo}
                      />
                    </TouchableOpacity>
                  </LinearGradient>
                );
              })}
            </Carousel>
          </View>
        </View>
      );
    });

    return (
      <View style={styles.screen}>
      <View style={styles.buttonBar}>
          <Text style={styles.headerText1}>Select your reward</Text>
          <Text style={styles.titleText}>Get better rewards the more you cycle</Text>
      </View>
        <View style= {styles.container}>
        {slides}
         </View>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(false) }}
          transparent={true}
        >
          <ChallengeModal
            displayText={this.state.displayText}
            toggleModal={this.setModalVisible.bind(this)}
            slideColor={this.state.slideColor}
            challengeDescription={this.state.challengeDescription}
            offerID={this.state.offerID}
            categoryId={this.state.categoryId}
            totalDistance={this.state.totalDistance}
            totalDays={this.state.totalDays}
            discount={this.state.discount}
            hexArray={this.state.hexArray}
            logo={this.state.logo}
            navigation={this.props.navigation}
          />
        </Modal>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 9 / 10,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonBar: {
    flex: 1 / 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems:'center'
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryView: {
    flex: categoryViewHeight,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  displayTextContainer: {
    flex: 1 / 5
  },
  carouselContainer: {
    backgroundColor: 'white',
    flex: 4 / 5,
    flexDirection: 'row',
  },
  headerText1: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});