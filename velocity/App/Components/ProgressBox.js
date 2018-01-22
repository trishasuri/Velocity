import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  Image

} from 'react-native';
import * as Progress from 'react-native-progress';


export default class ProgressBox extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    showModal: false
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  getTicket = () => {
    // console.log(this.props.progress);
    if (this.props.progress == 1) {
      return (
        <Image
          style={{ width: '40%', height: '75%', left: 10 }}
          source={this.props.couponCode}
        />
      )
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: Dimensions.get('window').width * 0.8,
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <Image
          source={this.props.background}
          style={{ resizeMode: 'cover', width: undefined, flex: 1 }} >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }} />
              <Progress.Bar 
                width={null}
                style={{ flex: 4 }}
                progress={this.props.progress}
                color='white'
                unfilledColor='rgba(255,255,255,0.6)'
                showsText={true}
                borderWidth={2}
              />
              <View style={{ flex: 1 }} />
            </View>
            <View style={{ flex: 1 }} />
            <Text style={{ flex: 5, textAlign: 'center', backgroundColor: 'transparent', color: 'white', fontSize: 20, fontWeight: 'bold' }}>{this.props.progress * 100}%</Text>
            <View style={{ flex: 1 }} />
          </View>
        </Image>
        <View style={{ flex: 0.1 }} />
        <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'flex-start' }}>
            {this.props.progress === 1.0 ? <View><Text style={styles.Quote}>Congrats!</Text><Text style={{ textDecorationLine: 'underline' }}>Click here to redeem your voucher</Text></View> :
              <View>
                <Text style={styles.Quote}>{this.props.displayText}</Text>
                <Text style={styles.smallText}>{this.props.leftKm} km left</Text>
                <Text style={styles.smallText}>
                  {this.props.leftDay} days to go.
                  </Text>
              </View>}
          </View>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Image
              style={{ height: '75%', width: '90%', resizeMode: 'contain' }}
              source={this.props.logo}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Quote: {
    fontSize: 20,
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
  },
  statText: {
    fontSize: 20,
    fontWeight: 'bold',
    // textAlign: 'left',
    color: 'white'
  }

});