import React, { Component } from 'react';
import './ModelManageWrapper.scss';

class ModelManageWrapper extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="model-manage-wrapper">
        {children}
      </div>
    )
  }
}

export default ModelManageWrapper;