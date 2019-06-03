import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PostContent, InputWithLabel, InputWithImage, AuthBox, PostButton } from '../../components/Post';
import * as postActions from '../../store/modules/post';

class PostContainer extends Component {
  handleChange = (e) => {
    const { PostActions } = this.props;
    const { name, value } = e.target;

    PostActions.changeInput({
      name,
      value,
    });
  }

  handlePost = async () => {
    const { postForm, PostActions } = this.props;
    const { title, description, images, kinds, totalQuantity, price } = postForm.toJS();

    try{
      await PostActions.post({title, description, images, kinds, totalQuantity, price});
    } catch(e) {
      console.log(e);
    }

  }

  handleChangeImg = (e) => {
    const formData = new FormData();
    const { PostActions } = this.props;
    formData.append("images", e.target.files[0]);
    console.log(formData)
    PostActions.postImg(formData);
  }

  render(){
    const { title, description, images, kinds, totalQuantity, price } = this.props.postForm;
    const { handleChange, handleChangeImg, handlePost } = this;
    return(
      <PostContent name="post">
        <AuthBox>
          <InputWithLabel 
              label="title" 
              name="title"
              placeholder="title" 
              value={title}
              onChange={handleChange}
          />
          <InputWithLabel 
              label="description" 
              name="description"
              placeholder="description" 
              value={description}
              onChange={handleChange}
          />

          <InputWithImage
            label="images"
            name="images"
            value={images}
            onChange={handleChangeImg}
            multiple
          />
        </AuthBox>
        
        <InputWithLabel 
            label="kinds" 
            name="kinds"
            placeholder="kinds" 
            value={kinds}
            onChange={handleChange}
        />
        <InputWithLabel 
            label="totalQuantity" 
            name="totalQuantity"
            placeholder="totalQuantity" 
            value={totalQuantity}
            onChange={handleChange}
        />
        <InputWithLabel 
            label="price" 
            name="price"
            placeholder="price" 
            value={price}
            onChange={handleChange}
        />
        <PostButton onClick={handlePost}>올리기</PostButton>
      </PostContent>
    )
  }
}

export default connect(
  (state) => ({
    postForm: state.post.get('postForm'),
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(PostContainer);