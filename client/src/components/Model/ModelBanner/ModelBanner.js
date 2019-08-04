import React, { Component } from 'react';
import './ModelBanner.scss';

class ModelBanner extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="model-banner-wrapper">
        <div className="model-banner-header">모델과 함께 주문하기</div>
        {children}
      </div>
    )
  }
}

export default ModelBanner;