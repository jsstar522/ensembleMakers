import React, { Component } from 'react';
import './ModelWrapper.scss';

class ModelWrapper extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="model-wrapper">
        {children}
      </div>
    )
  }
}

export default ModelWrapper;