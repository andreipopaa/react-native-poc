// Vendor Imports
import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'

class LoginPage extends Component {
    constructor (props) {
        super(props);
        this.state = { isDarkMode: false };
    }

    toggleDarkMode(previousState) {
        this.state = { isDarkMode : !previousState };
    }

    displayDarkMode() {
        return <Text>Dark Mode...</Text>;
    }

    render() {        
        return (
            <View style={style.loginContainer}>
                <Text>State Page!</Text>
                {this.state.isDarkMode && this.displayDarkMode()}

                <CheckBox
                    title='Click Here'
                    onPress={this.toggleDarkMode(this.state.isDarkMode)}
                />
            </View>
        );
    }
}

export default LoginPage;

const style = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})