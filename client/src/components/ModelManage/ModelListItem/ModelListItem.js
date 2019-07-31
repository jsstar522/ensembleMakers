import React, { Component } from 'react';
import './ModelListItem.scss';

class ModelListItem extends Component {
  render() {
    const { modelName, id } = this.props;
    const { onOpenModelModal } = this.props;
    return(
      <div className="model-list-item-wrapper">
        <div className="model-list-item" onClick={() => onOpenModelModal['modify'](id)}>
          <div className="model-list-img"/>
          <div className="model-list-model-name">{modelName}</div>
          <div className="model-list-model-content">dd{id}</div>
        </div>
      </div>
    )
  }
}

export default ModelListItem;