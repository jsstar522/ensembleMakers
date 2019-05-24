import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductContent } from '../../components/Product/ProductContent';
import * as postActions from '../../store/modules/post';

class ProductContainer extends Component {
  
  componentDidMount() {
    const { PostActions } = this.props;
    const id = this.props.match.params.id;
    PostActions.getPostById(id);
  }

  render(){
    const { postById } = this.props;
    const title = postById.get('title');
    const postId = postById.get('_id');
    return(
      <ProductContent id={postId} title={title} >
      </ProductContent>
    )
  }
}

export default connect(
  (state) => ({
    postById: state.post.get('postById')
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch),
  })
)(ProductContainer);