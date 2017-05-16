import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import ListItem from './ListItem';

export default class RefreshList extends PureComponent {
  constructor() {
    super();
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <ListItem navigate={this.props.navigation.navigate} {...item} />
  );

  _onEndReached = () => {
    const { getIdInfo } = this.props;
    getIdInfo();
  };

  render() {
    const props = this.props;
    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        data={props.data}
        onRefresh={props.onRefresh}
        refreshing={false}
        onEndReached={this._onEndReached}
        renderItem={this._renderItem}
      />
    );
  }
}
