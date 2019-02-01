// Vendor Imports
import React, { Component } from 'react';
import { Alert, View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// Custom Imports
import CustomStatusBar from '../atoms/CustomStatusBar';
import { signOut } from '../../state/ducks/user';

class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut() {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                { text: 'Cancel'},
                { text: 'Sign Out', onPress: () => this.props.dispatchSignOut() },
            ],
        )
    }

    render() {
        return (
            <View>
                <CustomStatusBar />
                <View style={styles.info}>
                    <Text style={styles.label}>Email:</Text>
                    <View style={styles.emailWrapper}>
                        <Text style={styles.email}>{this.props.email}</Text>
                    </View>
                    <TouchableOpacity onPress={this.handleSignOut}>
                        <Text style={styles.signOut}>
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchSignOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);

const styles = StyleSheet.create({
    info: {
        padding: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 7,
    },
    email: {
        width: '100%',
        fontSize: 30,
    },
    emailWrapper: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginBottom: 15,
    },
    signOut: {
        backgroundColor: '#8e44ad',
        color: 'white',
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
        padding: 10,
    },
});