import React, { Component } from 'react';
import { OrderManageListItem } from '../OrderManageListItem';
import './OrderManageList.scss';

class OrderManageList extends Component {
  render() {
    const { onClick } = this.props;
    const { allCustomers, view, customerById } = this.props;
    //customer 전체명단
    const allCustomerList = allCustomers
    .map(
      (allCustomer, i) => {
      // 주문상태에 따라 다른 곳에 render
      if(allCustomer.state === view)
        return <OrderManageListItem
          key={i}
          id={allCustomer._id}
          name={allCustomer.name}
          phone={allCustomer.phone}
          address={allCustomer.address}
          onClick={onClick}
          customerById={customerById}
          />
    })

    return(
      <div className="order-manage-list-wrapper">{allCustomerList}</div>
    )
  }
}

export default OrderManageList;