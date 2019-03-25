import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PostContent, InputWithLabel, AuthBox, PostButton } from '../../components/Post';
import * as postActions from '../../store/modules/post';

class PostContainer extends Component {
  handlePost = () => {
    const { post } = this.props;
    console.log(post);
  }
  render(){
    const { title, description, images, kinds, totalQuantity, price } = this.props.post.toJS();
    const { handlePost } = this;
    return(
      <PostContent name="post">
        <AuthBox>
          <InputWithLabel 
              label="title" 
              name="title"
              placeholder="title" 
              value={title}
          />
          <InputWithLabel 
              label="description" 
              name="description"
              placeholder="description" 
              value={description}
          />
        </AuthBox>
        <InputWithLabel 
            label="images" 
            name="images"
            placeholder="images" 
            value={images}
        />
        <InputWithLabel 
            label="kinds" 
            name="kinds"
            placeholder="kinds" 
            value={kinds}
        />
        <InputWithLabel 
            label="totalQuantity" 
            name="totalQuantity"
            placeholder="totalQuantity" 
            value={totalQuantity}
        />
        <InputWithLabel 
            label="price" 
            name="price"
            placeholder="price" 
            value={price}
        />
        <PostButton onClick={handlePost}>올리기</PostButton>
      </PostContent>
    )
  }
}

export default connect(
  (state) => ({
    post: state.post.get('post')
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(PostContainer);