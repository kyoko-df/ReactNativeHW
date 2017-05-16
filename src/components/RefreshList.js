import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';

export default class RefreshList extends PureComponent {
  _keyExtractor = (item, index) => item.id;

  render() {
    const props = this.props;
    return (
      <FlatList
        ListHeaderComponent={props.renderListHeader}
        keyExtractor={this._keyExtractor}
        data={props.data}
        onRefresh={props.onRefresh}
        refreshing={false}
        onEndReached={props.onEndReached}
        renderItem={props.renderItem}
      />
    );
  }
}
