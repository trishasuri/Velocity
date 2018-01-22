import React, { Component } from 'react';
import { Modal, Text, Image, TouchableOpacity, View, StyleSheet, Dimensions, Button, TouchableHighlight } from 'react-native';
import RoundedButton from '../Components/RoundedButton';
import { currentChallenge, userData } from './UserData.js'
import CarouselList from './CarouselList.js'
import LinearGradient from 'react-native-linear-gradient';

export default class ChallengeModal extends React.Component {

    constructor(props) {
        super(props);
        console.log(JSON.stringify(this.props))
        this.addChallenge = this.addChallenge.bind(this);
        this.state=this.props;
        console.log(this.props);
    }

    addChallenge() {
        var categoryId = this.props.categoryId;
        var offerID = this.props.offerID;
        currentChallenge.displayText = CarouselList[categoryId].Items[offerID].displayText;
        currentChallenge.totalDays = CarouselList[categoryId].Items[offerID].totalDays;
        currentChallenge.icon = CarouselList[categoryId].Items[offerID].icon;
        currentChallenge.slideColor = CarouselList[categoryId].Items[offerID].slideColor;
        currentChallenge.totalDistance = CarouselList[categoryId].Items[offerID].totalDistance
        this.props.toggleModal(false)
        this.props.navigation.goBack()
        this.props.navigation.navigate('StatisticsScreen')
    }


    render() {
        return (
            <View style={styles.modalScreen}>
                <TouchableHighlight onPress={() => this.props.toggleModal(false)}
                    style={styles.closeBar}>
                    <Text style={styles.titleText}>CLOSE</Text>
                </TouchableHighlight>
                <LinearGradient 
                              colors= {this.state.hexArray}
                              style={{flex:4,alignItems:'center',
                                justifyContent:'center'}}>
                              <Image
                                    style={{flex:0.4, width: '50%', height: '50%' }}
                                    source={this.state.logo}
                                    />  
                </LinearGradient>

                <View style={{ flex: 5, backgroundColor: 'white' ,alignItems: 'center'}}>
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <Text style={styles.titleText}>{this.props.displayText}</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', 
                    width: Dimensions.get('window').width / 1.2 ,
                     }}>
                        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={styles.statText}>
                                {this.state.totalDistance} Km.
                            </Text>    
                        </View>
                        <View style={{ flex: 0.03, backgroundColor: 'gray' }} />
                        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={styles.statText}>
                                {this.state.totalDays} days
                            </Text>
                        </View>
                        <View style={{ flex: 0.03, backgroundColor: 'gray' }} />
                        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={styles.statText}>
                                {this.state.discount}
                            </Text>
                        </View>
                    </View>
                <View style={{ flex: 3, backgroundColor: 'white' }}>
                    <Text style={styles.descriptionText}>{this.props.challengeDescription}</Text>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', bottom: 10 }}>
                <RoundedButton onPress={this.addChallenge}
                    disabled={false}
                    newStyle={{
                            height: 55,
                            width: 300,
                            alignSelf: 'center',
                            borderRadius: 10,
                            backgroundColor: '#FF530D',
                            justifyContent: 'center',
                        }}>
                    ACCEPT CHALLENGE
                 </RoundedButton>
            </View>
      </View>
        )
    }
}
export const styles = StyleSheet.create({
    closeBar: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalScreen: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderWidth: 2,
        backgroundColor: 'white'
    },

    titleText: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    descriptionText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center'
    },
    fineText: {
        fontSize: 15,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center'
    },
    statText:{
        fontSize: 25,
        fontWeight: 'bold',
    }
});