import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  centered: {
    alignItems: 'center',
  },
  sectionText: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 24,
  },
  brandName: {
    fontSize: 60,
    textAlign: 'center',
    // marginTop: 100,
    color: 'white',
  },
  button: {
    // flex: 1,
    backgroundColor: 'black'
  },
  linearGradient: {
    flex: 1,
  }
})
