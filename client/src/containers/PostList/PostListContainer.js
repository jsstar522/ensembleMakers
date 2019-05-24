import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PostList } from '../../components/PostList/PostList';
import { PostListItem } from '../../components/PostList/PostListItem';
import * as postActions from '../../store/modules/post';

class PostListContainer extends Component {

  componentDidMount() {
    const { PostActions } = this.props;
    PostActions.getAllPost();
  }

  render(){
    const { allPosts } = this.props;
    const allPostList = allPosts
      .map(
        (allPost, i) => <PostListItem
        key={i}
        id={allPost._id} 
        title={allPost.title}
        img={allPost.images}
        />
      )
    // console.log(allPostList);
    return(
        <PostList>
          {allPostList}
        </PostList>
    )
  }
}

export default connect(
  (state) => ({
    allPosts: state.post.get('allPosts')
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch),
  })
)(PostListContainer);