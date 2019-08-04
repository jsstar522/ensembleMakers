import React, { Component } from 'react';
import './ModelListItem.scss';

class ModelListItem extends Component {
  render() {
    const { userNumber, modelName, modelImage, id } = this.props;
    const { onOpenModelModal } = this.props;
    return(
      <div className="model-list-item-wrapper">
        <div className="model-list-item">
          { modelImage !== null ? <img className="model-list-item-img" src={modelImage}/>
            :<div className="model-list-item-img"/>
          }
          <div className="model-list-item-model-name">{modelName}</div>
          <div className="model-list-item-model-content">
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
              <div className="model-list-item-modify-button" onClick={() => onOpenModelModal['modify'](id)}>수정</div><div className="model-list-item-delete-button">삭제</div>
            </div>
            <a className="model-list-item-post-button" href={'/model/'+userNumber+'/'+modelName}>주문하기</a>
          </div>
        </div>
      </div>
    )
  }
}

export default ModelListItem;