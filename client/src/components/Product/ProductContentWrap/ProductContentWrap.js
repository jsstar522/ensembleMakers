import React from 'react';
import './ProductContentWrap.scss';

const ProductContent = ({children}) => (
  <div className="product-content-wrap">
    {children}
  </div>
)

export default ProductContent;