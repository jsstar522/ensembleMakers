import React from 'react';
import './ProductWrap.scss';

const ProductWrap = ({children}) => (
  <div className="product-wrap">
    {children}
  </div>
)

export default ProductWrap;