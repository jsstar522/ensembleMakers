import React, { Component } from 'react';
import './OrderManageDetail.scss'

class OrderManageDetail extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="order-manage-detail">{children}</div>
    )
  }
}

export default OrderManageDetail;