import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PostContent, InputWithLabel, AuthBox, PostButton } from '../../components/Post';
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
    const { form, PostActions } = this.props;
    const { title, description, images, kinds, totalQuantity, price } = form.toJS();

    try{
      await PostActions.post({title, description, images, kinds, totalQuantity, price});
    } catch(e) {
      console.log(e);
    }

  }
  render(){
    const { title, description, images, kinds, totalQuantity, price } = this.props.form;
    const { handleChange, handlePost } = this;
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
        </AuthBox>
        <InputWithLabel 
            label="images" 
            name="images"
            placeholder="images" 
            value={images}
            onChange={handleChange}
        />
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
    form: state.post.get('form'),
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(PostContainer);