import React, { Component } from 'react';
import './OrderWrapper.scss';

class OrderWrapper extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="order-wrapper">
        {children}
      </div>
    )
  }
}

export default OrderWrapper;