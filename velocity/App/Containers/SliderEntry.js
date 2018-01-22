import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import styles from './Styles/SliderEntryStyles';
import { LinearGradient } from 'expo'


import Icon from 'react-native-vector-icons/Ionicons'

export default class SliderEntry extends Component {

    static propTypes = {
        displayText: PropTypes.string.isRequired,
        logo: PropTypes.number,
        brand: PropTypes.number,
        even: PropTypes.bool,
        colors: PropTypes.array
    };

    state = {
        isRewardOpen: false
    }

    toggleRewardModal = () => {
        this.setState({
            isRewardOpen: !this.state.isRewardOpen
        })
    }

    renderReward = (reward) => {
        const { title, km, day, benefit, description } = reward
        return (
            <View style={{ flex: 1 }}>

                <TouchableOpacity onPress={() => { this.toggleRewardModal() }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#5CD0A0' }}>
                        <Icon name='ios-arrow-back' color="white" size={60} style={{ padding: 10 }} />

                    </View>
                </TouchableOpacity>

                {/* <View style={{ flex: 1, backgroundColor: '#5CD0A0', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', shadowRadius: 10, shadowColor: 'black' }}>
                        <Image source={require('../Images/adidas_overlay.png')} style={{ flex: 1, resizeMode: 'contain', width: undefined, marginTop: 100, backgroundColor: 'transparent' }} />
                    </View>
                </View> */}

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }} />

                    <View style={{ flex: 8, alignItems: 'center', backgroundColor: 'white' }}>
                        <Image
                            source={require('../Images/adidas_overlay.png')}
                            style={{ flex: 2, resizeMode: 'contain' }} />
                        <Text style={{ fontSize: 24, textAlign: 'center', color: 'dimgray' }}>{title}</Text>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ alignItems: 'center', borderRightWidth: 0.5, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24 }}>{km} km</Text>
                            </View>

                            <View style={{ alignItems: 'center', borderRightWidth: 0.5, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24 }}>{day} days</Text>
                            </View>

                            <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24 }}>{benefit}</Text>
                            </View>

                        </View>
                        <View style={{ flex: 0.1 }} />

                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>{description}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Icon.Button size={32} backgroundColor='#FF530D' name='ios-bicycle-outline' onPress={() => {
                                this.toggleRewardModal()
                                this.props.navigation.goBack()
                                this.props.navigation.navigate('StatsStackNav')
                            }}>
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Start Challenge</Text>
                            </Icon.Button>
                        </View>
                    </View>

                    <View style={{ flex: 1 }} />
                </View>

            </View >
        );
    }

    render() {
        const { displayText, logo, brand, even, colors } = this.props;

        const reward = {
            title: 'Superstar Challenge', km: '100', day: '7', benefit: '20%', description: 'Get your new adidas Superstars.\n\nThis 70s sneaker began life as a court-dominating B-Ball shoe.\nFull grain leather.'
        }

        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.slideInnerContainer}
                    onPress={this.toggleRewardModal}
                >
                    <LinearGradient colors={colors} style={styles.imageContainer}>
                        <Image
                            source={logo}
                            style={styles.image}
                        />
                    </LinearGradient>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{displayText}</Text>
                        <Text style={styles.title}>Challenge</Text>
                    </View>
                </TouchableOpacity>
                <Modal
                    visible={this.state.isRewardOpen}>
                    {this.renderReward(reward)}
                </Modal>
            </View>
        );
    }
}