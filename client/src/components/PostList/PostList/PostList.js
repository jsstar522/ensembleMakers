import React, { Component } from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import { PostListItem } from '../PostListItem';
import './PostList.scss';

const Wrapper = styled.div`
  position: relative;
  padding-left: 2rem;
  flex-direction: row;
  float:left;
  width: 25%;
`

class PostList extends Component {

  render(){
    const { id, title, img } = this.props;
    
    return(
      // <PostListItem
      //   id={id}
      //   title={title}
      //   img={img}
      // />
      <div>aa</div>
    )
  }
}

export default PostList;

