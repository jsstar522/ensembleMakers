import React, { Component } from 'react';
import './ModelManageBanner.scss';

class ModelManageBanner extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="model-manage-banner-wrapper">
        <div className="model-manage-banner-header">모델 관리</div>
        {children}
      </div>
    )
  }
}

export default ModelManageBanner;