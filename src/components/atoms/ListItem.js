import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

class MyListItem extends PureComponent {
    _onPress = () => {
      this.props.onPressItem({ url: this.props.url, title: this.props.title });
    };
  
    render() {
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.container}>
            <Text>
              {this.props.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  export default MyListItem;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
});