import React, { Component } from 'react';
import { ModelListItem } from '../ModelListItem';
import './ModelList.scss';

class ModelList extends Component {
  render() {
    const { allModels } = this.props;
    const { onOpenModelModal } = this.props;
  
    const modelList = allModels.map(
      (modelListItem, i) =>
        <ModelListItem 
          key={i}
          id={i}
          modelName={modelListItem.contents.template[0].value}
          onOpenModelModal={onOpenModelModal}
        />
    )
    return(
      <div className="model-list-wrapper">
        {modelList}
        <div className="model-list-add-button" onClick={onOpenModelModal['create']}>추가</div>
      </div>
    )
  }
}

export default ModelList;