import React, { Component } from 'react';
import { OrderManageState } from '../OrderManageState';
import { OrderManageList } from '../OrderManageList';
import { OrderManageDetail } from '../OrderManageDetail';
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