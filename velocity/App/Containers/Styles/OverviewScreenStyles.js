import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../Themes/'
var { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  quote: {
    fontSize: 22,
    color: 'white',
  },
  bgImage: {
    // flex: 4,
    // width: width
  },
  bottomIcons: {
    // flex: 1,
    // padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: width/12,
    // marginTop: height/18
  },
  bottomIcon: {
    
  },
  RWbutton: {
    // height: 50,
    // width: width * 0.25,
    // alignSelf: 'center',
    borderRadius: 3,
    backgroundColor: "#FCD116",
    elevation: 10,
  },
  BGIcon: {
    // marginTop: -3,
    // marginLeft: 10,
    // flex: 1
  },
  gradientButton: {
    // flex: 0,
    borderRadius: 5,
    // width: width * 0.85,
    // height: height * 0.08, 
    // alignSelf: 'center',
    flexDirection: 'row',
  }
})
