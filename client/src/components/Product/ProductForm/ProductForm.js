import React, { Component } from 'react';
import { ProductWrap } from '../ProductWrap';

class ProductForm extends Component {
  render(){
    const { id } = this.props;
    return(
      <ProductWrap>{id}<br/>{id}<br/>{id}<br/>{id}<br/>{id}<br/>{id}<br/>{id}<br/>{id}<br/>{id}<br/></ProductWrap>
    )
  }
}

export default ProductForm;