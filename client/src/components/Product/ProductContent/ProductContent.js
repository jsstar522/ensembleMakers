import React, { Component } from 'react';
import { ProductContentWrap } from '../ProductContentWrap';
import { ProductImageItem } from '../ProductImageItem';
import { ProductDetailItem } from '../ProductDetailItem';
import { ProductReviewItem } from '../ProductReviewItem';

// ----------------------------------------
//나중에 이 내용들은 모두 컨테이너로 이동되고 이 폴더는 없어져야 한다
//-----------------------------------------

class ProductContent extends Component {
  render(){
    const { id } = this.props;
    const { title } = this.props;
    return(
      <ProductContentWrap>
        <ProductImageItem />
        <ProductDetailItem />
        <ProductReviewItem />
        {id}<br/>{title}
      </ProductContentWrap>
    )
  }
}

export default ProductContent;