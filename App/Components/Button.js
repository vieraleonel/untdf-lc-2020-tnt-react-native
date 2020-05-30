import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

class ButtonClass extends React.Component {

  constructor(props) {
    super(props);
    this._onPressHandleFunc = this._onPressHandleFunc.bind(this);
  }

  state = {
    counterUno: 0,
  };

  static defaultProps = {
    backgroundColor: '#55CEF0',
  }

  static propTypes = {
    backgroundColor: PropTypes.string,
    label: PropTypes.string.isRequired,
  };

  render() {
    const addedColor = {
      backgroundColor: this.props.backgroundColor,
      borderColor: this.props.backgroundColor,
    };

    return (
      <TouchableOpacity onPress={this._onPressHandle}>
        <View style={[styles.buttonStyle, addedColor]}>
          <Text style={styles.buttonTextStyle}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const Button = props => {
  const addedColor = {
    backgroundColor: props.backgroundColor,
    borderColor: props.backgroundColor,
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.buttonStyle, addedColor]}>
        <Text style={styles.buttonTextStyle}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  backgroundColor: '#55CEF0',
};

Button.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    color: 'white',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
