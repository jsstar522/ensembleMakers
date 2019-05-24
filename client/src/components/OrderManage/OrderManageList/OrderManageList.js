import React, { Component } from 'react';
import './OrderManageList.scss';

class OrderManageList extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="order-manage-list">{children}</div>
    )
  }
}

export default OrderManageList;