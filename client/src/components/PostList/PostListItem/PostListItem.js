import React, { Component } from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import './PostListItem.scss';

class PostListItem extends Component {
  render(){
    const { id, title, img } = this.props;
    const imgURL = "http://localhost:5000"+img;
    return(
      <div className="item">
        <div>{id}</div>
        <div>{title}</div>
        <div>{img}</div>
        <img src={imgURL} width="60%" height="60%"></img>
      </div>
    )
  }
}

export default PostListItem;