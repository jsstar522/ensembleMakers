import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { OrderContainer } from '../containers/Order';

class Order extends Component {
  render() {
    return(
      <div>
        <OrderContainer/>
      </div>
    )
  }
}

export default Order;