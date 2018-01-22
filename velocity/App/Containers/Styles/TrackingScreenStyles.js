import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'
var { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  loginButton: {
    backgroundColor: Colors.drawer,
    bottom: 0
  },
  sectionText: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 5
  },
  text: {
    position: 'relative',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black'
  },
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    height: height / 1.5,
    width: width,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 9 / 10,
    alignItems: 'center'

  },
  buttonBar: {
    flex: 1 / 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  mapEquivalentStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
})
