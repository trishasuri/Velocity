import { StackNavigator, TabNavigator } from 'react-navigation'
import StatsScreen from '../Containers/StatsScreen'
//import TrackingScreen from '../Containers/TrackingScreen'
import OverviewScreen from '../Containers/OverviewScreen'
import SocialScreen from '../Containers/SocialScreen'
import RewardScreen from '../Containers/NewRewardScreen'

import styles from './Styles/NavigationStyles'

const OverviewStackNav = StackNavigator({
  // LaunchScreen: { screen: LaunchScreen },
  OverviewScreen: { screen: OverviewScreen },
  RewardScreen: { screen: RewardScreen },
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'OverviewScreen',
    navigationOptions: {
      headerStyle: styles.header,
      backgroundColor: 'white'
    }
  })

const StatsStackNav = StackNavigator({
  StatsScreen: { screen: StatsScreen },
  RewardScreen: { screen: RewardScreen },
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'StatsScreen',
    navigationOptions: {
      headerStyle: styles.header,
      backgroundColor: 'white'
    }
  })

const PrimaryNav = TabNavigator({
  OverviewStackNav: { screen: OverviewStackNav },
  SocialScreen: { screen: SocialScreen },
  StatsStackNav: { screen: StatsStackNav },
}, {
    // Default config for all screens
    // headerMode: 'none',
    initialRouteName: 'OverviewStackNav',
    // navigationOptions: {
    // headerStyle: styles.header
    // }
    tabBarPosition: 'bottom',
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: '#FF530D'
      },
      activeBackgroundColor: 'lightgrey',
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: 'white',
      }
    }
  })

export default PrimaryNav
