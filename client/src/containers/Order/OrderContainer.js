import React, { Component } from 'react';
import { OrderWrapper } from '../../components/Order/OrderWrapper';
import { ProcessingControll } from '../../components/Order/ProcessingControll';

class OrderContainer extends Component {
  render() {
    return(
      <OrderWrapper>
        <ProcessingControll/>
      </OrderWrapper>
    )
  }
}

export default OrderContainer;