import React, { Component } from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import './PostListItem.scss';

class PostListItem extends Component {
  render(){
    const { id, title, img } = this.props;
    const imgURL = "http://localhost:5000"+img;
    return(
      // <div className="item">
      //   <div>{id}</div>
      //   <div>{title}</div>
      //   <div>{img}</div>
      //   <img src={imgURL} width="60%" height="60%"></img>
      // </div>
      
      <li>
        <a href="#" class="inner">
          <div class="li-img">
            <img src="http://img.alicdn.com/imgextra/i4/1993730769/O1CN01tDQFGN1HYF38CXLm0_!!0-item_pic.jpg" alt="Image Alt Text" />
          </div>
          <div class="li-text">
            <h4 class="li-head">{id}</h4>
            <p class="li-sub">{title}</p>
          </div>
        </a>
      </li>
    )
  }
}

export default PostListItem;