import React, { Component } from 'react';
import './CustomerInfoPostButton.scss';

class CustomerInfoPostButton extends Component {
  render() {
    const {onClick} = this.props;
    return(
      <div className="customer-info-post-button-wrapper">
        <div className="customer-info-post-button" onClick={onClick}>주문하기</div>
      </div>
    )
  }
}

export default CustomerInfoPostButton;