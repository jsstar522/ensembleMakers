import React, { Component } from 'react';
import { FaSistrix } from 'react-icons/fa';
import './SearchBar.scss';

class SearchBar extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="model-manage-input-wrapper">
        <FaSistrix className="model-manage-input-icon"/>
        <input className="model-manage-input" placeholder="모델 이름을 검색하세요"/>
      </div>
    )
  }
}

export default SearchBar;