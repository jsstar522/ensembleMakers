import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { ProductContainer } from '../containers/Product';

class Product extends Component {
  render(){
    return(
      <Route path="/product/:id" component={ProductContainer}/>
    )
  }
}

export default Product;