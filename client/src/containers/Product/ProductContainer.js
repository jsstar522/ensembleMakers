import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductForm } from '../../components/Product/ProductForm';
import * as postActions from '../../store/modules/post';

class ProductContainer extends Component {
  
  componentWillMount() {
    const { PostActions } = this.props;
    const id = '5ca7072f3149ec4f074c17d5';
    PostActions.getPostById(id);
  }

  render(){
    const { postById } = this.props;
    const title = postById.get('title');
    return(
      <ProductForm id={title}></ProductForm>
    )
  }
}

export default connect(
  (state) => ({
    postById: state.post.get('postById'),
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch),
  })
)(ProductContainer);