import React, { Component } from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import { PostListItem } from '../PostListItem';

const Wrapper = styled.div`
    padding-top: 5rem;
    position: relative;

`

class PostList extends Component {

  render(){
    const { id, title, img } = this.props;
    return(
      <Wrapper>
        <PostListItem
          id={id}
          title={title}
          img={img}
        />
      </Wrapper>
    )
  }
}

export default PostList;

