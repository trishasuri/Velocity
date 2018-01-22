import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
var { width, height } = Dimensions.get('window');

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

class CustomCallout extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.bubble}>
          <View style={styles.amount}>
            {this.props.children}
          </View>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: width/1.5,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#5CD0A0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#007a87',
    borderWidth: 1,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#5CD0A0',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = CustomCallout;