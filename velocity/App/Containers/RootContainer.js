import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import LaunchScreen from '../Containers/LaunchScreen'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {

  //set to true to show splash screen
  state = {
    showSplashScreen: false
  }

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  onBeginPress = () => {
    this.setState({
      showSplashScreen: false
    })
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar hidden={true} barStyle='light-content' />
        {this.state.showSplashScreen ? <LaunchScreen onBeginPress={this.onBeginPress} /> : <ReduxNavigation />}
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
