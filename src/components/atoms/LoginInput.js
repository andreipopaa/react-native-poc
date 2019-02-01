// Vendor Imports
import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


class LoginInput extends Component {

  render() {
    const {
      onChangeText,
      value,
      placeHolder,
      autoCapitalize,
    } = this.props;
    return (
      <View style={style.container}>
        <TextInput
          autoCapitalize={autoCapitalize}
          style={style.loginInput}
          onChangeText={(value) => onChangeText(value)}
          value={value}
          placeholder={placeHolder}
        />
      </View>
    );
  }

}

export default LoginInput;

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    width: '100%',
    maxWidth: 300,
    marginBottom: 15,
    borderRadius: 5,
  },
  loginInput: {
    fontSize: 25,
    padding: 10,
  },
});
