import React, { Component } from 'react';
import './ModelBanner.scss';

class ModelBanner extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="model-banner-wrapper">
        <div className="model-banner-header">다음 모델로 주문하기</div>
        {children}
      </div>
    )
  }
}

export default ModelBanner;