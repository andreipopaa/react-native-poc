// Vendor Imports
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

// Custom Imports
import LoginInput from '../atoms/LoginInput';
import { setName, setPassword, loginUser } from '../../state/ducks/user';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
const { GigyaBridge } = NativeModules;

class LoginPage extends Component {
  componentDidMount() {
    if (this.props.email) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    const { 
      name,
      password,
      error,
      dispatchSetName,
      dispatchSetPassword,
      dispatchLoginUser,
    } = this.props;

    return (
      <View style={style.container}>
        <Text style={style.title}>Login To Gigya</Text>
        <LoginInput
          value={name}
          onChangeText={dispatchSetName}
          placeHolder='Name'
          autoCapitalize='none'
        />
        <LoginInput
          value={password}
          onChangeText={dispatchSetPassword}
          placeHolder='Password'
          autoCapitalize='none'
        />
        { !!error && <Text style={style.error}>
          { error }
        </Text>}
        <Button
          title="Submit!"
          color="#841584"
          accessibilityLabel="Sign in to gigya!"
          onPress={dispatchLoginUser}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  name: state.user.name,
  password: state.user.password,
  error: state.user.error,
  email: state.user.email,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetName: name => dispatch(setName(name)),
  dispatchSetPassword: password => dispatch(setPassword(password)),
  dispatchLoginUser: () => dispatch(loginUser()),
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(LoginPage));

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    fontFamily: 'Papyrus',
  },
  error: {
    color: '#F00'
  }
})