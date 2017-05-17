import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import RefreshList from '../components/RefreshList';
import ListItem from '../components/ListItem';
import Api from '../services/Api';
import { fetchLimitData } from '../services/Network';
const NUMBER_PER_PAGE = 10;

export default class StoryList extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.routeName
  })

  constructor() {
    super();
    this.state = {
      pageNum: 1,
      listId: [],
      listInfo: [],
      loading: false
    };
  }

  componentWillMount() {
    this._getList();
  }

  _getList = () => {
    const { screenProps } = this.props;
    fetch(Api[`HN_${screenProps.routeName.toUpperCase()}_STORIES_ENDPOINT`])
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ listId: [...responseJson], pageNum: 1 }, () => {
          this._getIdInfo(true);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _getIdInfo = (refresh = false) => {
    let { pageNum, listId, listInfo, loading } = this.state;
    if (loading || (!refresh && pageNum * NUMBER_PER_PAGE > listId.length))
      return;

    this.setState({ loading: true }, () =>
      this._setListInfo({ pageNum, listId, listInfo, refresh })
    );
  }

  _setListInfo = ({ pageNum, listId, listInfo, refresh }) => {
    let promises = fetchLimitData({
      pageNum,
      numPerPage: NUMBER_PER_PAGE,
      source: listId
    });

    Promise.all(promises)
      .then(infos => {
        this.setState({
          listInfo: refresh ? infos : listInfo.concat(infos),
          pageNum: pageNum + 1,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  _renderItem = ({ item }) => (
    <ListItem navigate={this.props.navigation.navigate} {...item} />
  )

  render() {
    let state = this.state;

    return (
      <View style={styles.contianer}>
        <RefreshList
          data={state.listInfo}
          onRefresh={this._getList}
          renderItem={this._renderItem}
          onEndReached={() => this._getIdInfo()}
          {...this.props}
        />
        {state.loading ? <ActivityIndicator /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contianer: {
    backgroundColor: '#F6F6EF',
    paddingHorizontal: 10
  }
});
