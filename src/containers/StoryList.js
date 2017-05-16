import React, { Component } from 'react';
import { View } from 'react-native';
import RefreshList from '../components/RefreshList';
import Api from '../services/Api';
const NUMBER_PER_PAGE = 12;

export default class StoryList extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.routeName
  });

  constructor() {
    super();
    this.getList = this._getList.bind(this);
    this.getIdInfo = this._getIdInfo.bind(this);
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

  async _getList() {
    const { screenProps } = this.props;
    try {
      let response = await fetch(
        Api[`HN_${screenProps.routeName.toUpperCase()}_STORIES_ENDPOINT`]
      );
      let responseJson = await response.json();
      await this.setState({ listId: [...responseJson] });
      this.getIdInfo(true);
    } catch (err) {
      console.log(err);
    }
  }

  _getIdInfo(refresh = false) {
    if (this.state.loading === true) return;

    this.setState({ loading: true }, () => {
      let { pageNum, listId, listInfo } = this.state;
      let promises = listId
        .slice((pageNum - 1) * NUMBER_PER_PAGE, pageNum * NUMBER_PER_PAGE)
        .map(id => {
          return fetch(Api.HN_ITEM_ENDPOINT + id + '.json').then(response =>
            response.json()
          );
        });

      Promise.all(promises)
        .then(infos => {
          this.setState({
            listInfo: refresh? listInfo : listInfo.concat(infos),
            pageNum: pageNum + 1,
            loading: false
          });
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err);
        });
    });
  }

  render() {
    let state = this.state;

    return (
      <View>
        <RefreshList
          data={state.listInfo}
          onRefresh={this.getList}
          getIdInfo={this.getIdInfo}
          {...this.props}
        />
      </View>
    );
  }
}
