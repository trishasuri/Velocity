import React, { PropTypes } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/RoundedButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample('Rounded Button', () =>
  <RoundedButton
    text='real buttons have curves'
    onPress={() => window.alert('Rounded Button Pressed!')}
  />
)

export default class RoundedButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    // newStyle: PropTypes.object,
    children: PropTypes.string,
    navigator: PropTypes.object
  }

  getText() {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }
      // <TouchableOpacity style={{...styles.button, ...this.props.newStyle}} onPress={this.props.onPress} disabled={this.props.disabled}>

  render() {
    console.log(this.props.newStyle)
    return (
      <TouchableOpacity style={Object.assign({}, this.props.newStyle)} onPress={this.props.onPress} disabled={this.props.disabled}>
        <Text style={styles.buttonText}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}
