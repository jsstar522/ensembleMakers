import React, { Component } from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import './PostListItem.scss';

class PostListItem extends Component {
  render(){
    const { id, title, img } = this.props;
    const imgURL = "http://localhost:5000"+img;
    const pageURL = "/product/" + id;
    return( 
      <li>
        <a href={pageURL} className="inner">
          <div className="li-img">
            <img src="http://img.alicdn.com/imgextra/i4/1993730769/O1CN01tDQFGN1HYF38CXLm0_!!0-item_pic.jpg" alt="Image Alt Text" />
            {/* <img
              src={imgURL}
            /> */}
          </div>
          <div className="li-text">
            <h4 className="li-head">{id}</h4>
            <p className="li-sub">{title}</p>
          </div>
        </a>
      </li>
    )
  }
}

export default PostListItem;