import React from 'react'
import { View, Modal } from 'react-native'
import RoundedButton from '../../App/Components/RoundedButton'
// import TrackingScreen from './TrackingScreen'

export default class LoginButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    console.log('Setting modal to ' + !this.state.showModal)
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
      return (
        <View >
          <RoundedButton onPress={this.toggleModal}>
            Start Tracking
          </RoundedButton>
          <Modal
            visible={this.state.showModal}
            onRequestClose={this.toggleModal}>
          </Modal>
        </View>
      )
  }
}
