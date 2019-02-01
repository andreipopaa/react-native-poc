import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';

import ListItem from '../atoms/ListItem';

class MultiSelectList extends PureComponent {  
    _keyExtractor = (item, index) => item.key;
  
    _onPressItem = (data) => {
      this.props.handleItemPress(data);
    };
  
    _renderItem = ({item}) => (
      <ListItem
        onPressItem={this._onPressItem}
        url={item.url}
        title={item.title}
      />
    );
  
    render() {
      return (
        <FlatList
          data={this.props.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }
  }

  export default MultiSelectList;