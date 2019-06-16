import React, { Component } from 'react';
import './OrderManageWrapper.scss';

class OrderManageWrapper extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="order-manage-wrapper">
        {children}
      </div>
    )
  }
}

export default OrderManageWrapper;