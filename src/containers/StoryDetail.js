import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import RefreshList from '../components/RefreshList';
import Api from '../services/Api';
const NUMBER_PER_PAGE = 5;

export default class StoryDetail extends Component {
  constructor(props) {
    super(props);
    this.getComment = this._getComment.bind(this);
    this.params = props.navigation.state.params;
    this.state = {
      pageNum: 1,
      commentId: params.kids,
      commentInfo: [],
      loading: false
    };
  }

  componentWillMount() {
    this._getComment(true);
  }

  _getCommentList = () => {
    fetch(Api.HN_ITEM_ENDPOINT + this.params.id + '.json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          commentId: responseJson.kids
        });
      });
  };

  _getComment = (refresh = false) => {
    if (this.state.loading === true) return;

    this.setState({ loading: true }, refresh => this._setComment());
  };

  async _setComment() {
    const { kids } = this.params;
    const { pageNum } = this.state;
    let promises = this.fetchLimitData({
      pageNum,
      numPerPage: NUMBER_PER_PAGE,
      source: kids
    });

    Promise.all(promises).then(comments => {
      this.setState({
        listInfo: refresh ? infos : listInfo.concat(infos),
        pageNum: pageNum + 1,
        loading: false
      });
    });
  }

  _refreshComment = () => {};

  _renderViewHeader = ({ title, url, by, score }) => (
    <View style={{ marginTop: 10 }}>
      <Text>{title}</Text>
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('StoryView', { title, url })}
      />
      <View>
        <Text>
          Posted by {by} | {score} Points
        </Text>
      </View>
    </View>
  );

  render() {
    const { id, by, score, title, url, kids } = this.params;
    return (
      <RefreshList
        renderListHeader={() =>
          this._renderViewHeader({ title, url, by, score })}
        data={this.state.commentInfo}
      />
    );
  }
}
