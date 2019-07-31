import React, { Component } from 'react';
import { ModelManageContainer } from '../containers/ModelManage';
import { ModelModalContainer } from '../containers/ModelModal';

class ModelManage extends Component {
  render() {
    return(
      <div>
        <ModelManageContainer/>
        <ModelModalContainer/>
      </div>
    )
  }
}

export default ModelManage;