import React, { Component } from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import { PostListItem } from '../PostListItem';
import './PostList.scss';

const PostList = ({children}) => (
  <div className="post-list-wrap">
    {children}
  </div>
)

export default PostList;

