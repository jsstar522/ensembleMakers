import React, { Component } from 'react';
import { OrderManageContainer } from '../containers/OrderManage';
import { EditorModalContainer } from '../containers/EditorModal';
import { ImageModalContainer } from '../containers/ImageModal';

class OrderManage extends Component {
  render() {
    return(
      <div>
        <OrderManageContainer/>
        <EditorModalContainer/>
        <ImageModalContainer/>
      </div>
    )
  }
}

export default OrderManage;