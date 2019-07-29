import React, { Component } from 'react';
import './ModelListItem.scss';

class ModelListItem extends Component {
  render() {
    return(
      <div className="model-list-item-wrapper">
        <div className="model-list-item">
          <div className="model-list-img"/>
          <div className="model-list-model-name">H123</div>
          <div className="model-list-model-content">dd</div>
        </div>
      </div>
    )
  }
}

export default ModelListItem;