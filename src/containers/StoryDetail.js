import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import RefreshList from '../components/RefreshList';
import CommentItem from '../components/CommentItem';
import Api from '../services/Api';
import { fetchLimitData } from '../services/Network';
const NUMBER_PER_PAGE = 5;

export default class StoryDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  constructor(props) {
    super(props);
    const params = this.params = props.navigation.state.params;
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  _getComment = (refresh = false) => {
    let { pageNum, commentId, commentInfo, loading } = this.state;
    if (loading || (!refresh && pageNum * NUMBER_PER_PAGE > commentId.length))
      return;

    this.setState({ loading: true }, () =>
      this._setComment({ pageNum, commentInfo, refresh })
    );
  };

  _setComment = ({ pageNum, commentInfo, refresh }) => {
    const { kids } = this.params;
    let promises = fetchLimitData({
      pageNum,
      numPerPage: NUMBER_PER_PAGE,
      source: kids
    });

    Promise.all(promises).then(comments => {
      this.setState({
        commentInfo: refresh ? comments : commentInfo.concat(comments),
        pageNum: pageNum + 1,
        loading: false
      });
    });
  };

  _refreshComment = () => {};

  _renderItem = ({ item }) => <CommentItem {...item} />;

  _renderViewHeader = params => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>
        {params.title}
      </Text>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('View', { url: params.url })}
        underlayColor="#F6F6EF"
      >
        <Text style={styles.headerSourceLabel}>
          (Source)
        </Text>
      </TouchableOpacity>
      <Text style={styles.headerPostDetailsLine}>
        Posted by {params.by} | {params.score} Points
      </Text>
      <View style={styles.separator} />
      <Text style={styles.headerCommentTitle}>
        {params.descendants} Comments:
      </Text>
    </View>
  );

  render() {
    const params = this.params;
    return (
      <RefreshList
        renderListHeader={() => this._renderViewHeader(params)}
        data={this.state.commentInfo}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
    paddingRight: 10,
    paddingLeft: 10
  },
  headerTitle: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    color: '#FF6600'
  },
  headerPostText: {
    fontSize: 14,
    marginBottom: 3,
    paddingBottom: 10
  },
  headerSourceLabel: {
    fontSize: 15,
    textAlign: 'left',
    color: '#0089FF',
    paddingBottom: 10
  },
  headerPostDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  headerCommentTitle: {
    color: 'gray',
    marginTop: 10
  }
});
