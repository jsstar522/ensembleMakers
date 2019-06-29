import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { OrderContainer } from '../containers/Order';

class Order extends Component {
  render() {
    const { id } = this.props.match.params;
    return(
      <div>
        <OrderContainer id={id}/>
      </div>
    )
  }
}

export default Order;
