import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { PostContainer } from '../containers/Post';

class Post extends Component {
  render(){
    return(
      <Route path="/post" component={PostContainer}/>
    )
  }
}

export default Post;