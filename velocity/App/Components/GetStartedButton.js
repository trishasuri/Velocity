import React from 'react'
import { View, Modal } from 'react-native'
import DebugConfig from '../../App/Config/DebugConfig'
import RoundedButton from '../../App/Components/RoundedButton'

export default class GetStartedButton extends React.Component {

  render() {
    console.log('prop: ', this.props.newStyle)
    return (
      <RoundedButton
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        newStyle={this.props.newStyle}
      >
        Let's roll
      </RoundedButton>
    )
  }
}
