import React, { Component } from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import './PostListItem.scss';

class PostListItem extends Component {
  render(){
    const { id, title, img } = this.props;
    const imgURL = "http://localhost:5000"+img;
    const pageURL = "/product/" + id;
    console.log(imgURL)
    return( 
      <a href={pageURL} className="post-list-item-wrap">
        <div className="post-list-item-img">
          <img src="http://img.alicdn.com/imgextra/i4/1993730769/O1CN01tDQFGN1HYF38CXLm0_!!0-item_pic.jpg" alt="Image Alt Text" />
          {/* <img
              src={imgURL}
            /> */}
        </div>
        <div className="content">{title}</div>
      </a>
    )

  }
}

export default PostListItem;