import React, { Component } from 'react';
import { ModelListItem } from '../ModelListItem';
import './ModelList.scss';

class ModelList extends Component {
  render() {
    return(
      <div className="model-list-wrapper">
        <ModelListItem/>
        <ModelListItem/>
        <ModelListItem/>
        <ModelListItem/>
        <ModelListItem/>
        <ModelListItem/>
        <ModelListItem/>
        <ModelListItem/>
        <ModelListItem/>
        <ModelListItem/>
        <div className="model-list-add-button">추가</div>
      </div>
    )
  }
}

export default ModelList;