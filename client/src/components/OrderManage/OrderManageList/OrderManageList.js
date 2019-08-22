import React, { Component } from 'react';
import { OrderManageListItem } from '../OrderManageListItem';
import './OrderManageList.scss';

class OrderManageList extends Component {
  render() {
    const { allOrders, selectedId, view } = this.props;
    const { handleGetById } = this.props;

    // 전체 order
    const allOrderList = allOrders
    .map(
      (order, i) => {
      // 주문상태에 따라 다른 곳에 render
      if(order.state === view)
        return <OrderManageListItem
          key={i}
          id={order._id}
          selectedId={selectedId}
          name={order.customerInfo.name}
          phone={order.customerInfo.phone}
          address={order.customerInfo.address}
          handleGetById={handleGetById}
          />
    })

    return(
      <div className="order-manage-list-wrapper">{allOrderList}</div>
    )
  }
}

export default OrderManageList;