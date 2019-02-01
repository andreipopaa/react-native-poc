import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Circle } from 'react-native-progress';

class AudioActionBar extends Component {

    render () {
        const title = this.props.title ? `Now Playing: ${this.props.title}` : 'No media selected';

        return (
            <View>
                <View style={style.titleContainer}>
                    <Text numberOfLines={1} style={style.title}>{this.props.downloading ? 'Downloading...' : title}</Text>   
                </View>
                <View style={style.container}>
                    <Button 
                        title='Pause'
                        onPress={this.props.onPause}
                    />
                    {!!this.props.downloading && <Circle 
                        size={50}
                        showsText={true}
                        progress={this.props.progress}
                    />}
                    <Button 
                        title='Play'
                        onPress={this.props.onPlay}
                    />
                </View>
            </View>
        );
    }
}

export default AudioActionBar;

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 10,
        width: '100%',
    },
    titleContainer: {
        backgroundColor: '#147efb',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7,
    },
    title: {
        flex: 1,
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
    },
});