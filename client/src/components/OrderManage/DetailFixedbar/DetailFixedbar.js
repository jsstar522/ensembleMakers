import React, { Component } from 'react';
import ReactToPrint from "react-to-print";
import { ShowOrderNum } from '../ShowOrderNum';
import { Print } from '../Print';
import './DetailFixedbar.scss';

import styled from 'styled-components';
import MdPrint from 'react-ionicons/lib/MdPrint';

const StateButton = styled.div`
  border: 2px solid ${props => 
    props.state=="ordered" ? "#fa6e57"
    : props.state=="processing" ? "#4695d6"
    : null};
  border-radius: 5px;
  color: ${props => 
    props.state=="ordered" ? "#fa6e57"
    : props.state=="processing" ? "#4695d6"
    : null};
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
  cursor: pointer;
  

  &:hover {
    background-color: ${props => 
      props.state=="ordered" ? "#fa6e57"
    : props.state=="processing" ? "#4695d6"
    : null};
    color: white;
  }

  // 글자드래그 방지
  -ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;

`

class DetailFixedbar extends Component {
  render() {
    const { imgTextView } = this.props;
    const { state, orderNumber, name, phone, address ,date, model, rightSize, leftSize, last, sole, midsole, sockLining, heel, decoration, material, innerMaterial, color, detail, images } = this.props;
    const { onOpenEditorModal, onOpenImageModal, onChangeState, onChangeImgText } = this.props;
    return(
      <div className="detail-fixedbar-wrapper">
        <div className="detail-fixedbar">
          <div className="detail-image-wrapper" onClick={onOpenImageModal} onMouseOver={() => {onChangeImgText(true)}} onMouseOut={() => {onChangeImgText(false)}}>
            {images && <img className="detail-image" src={images[0]}/>}
            {imgTextView && <div className="detail-image-ref-text">등록된 이미지: <b>{images.length}</b>개 <br/><br/> 이미지를 등록/삭제 하시려면 <b>클릭</b>하세요.</div>}
          </div>
          { // state가 ordered일 때,  주문번호 등록창 보이기
            state==="ordered" ? <ShowOrderNum orderNumber={orderNumber}/> : null}
          { // state가 finished일 때, 등록/수정 버튼과 state 변경 버튼 삭제 
            state==="finished" ? null 
              : <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-between"}}>
                  <div className="order-manage-post-button" onClick={onOpenEditorModal}>작성 및 수정하기
                  </div>
                  <div className="print-button">
                    <ReactToPrint
                      trigger={() => <div><MdPrint/>인쇄하기</div>}
                      content={() => this.componentRef}
                    />
                    <Print 
                      ref={e => (this.componentRef = e)} 
                      name={name}
                      phone={phone}
                      address={address}
                      orderNumber={orderNumber}
                      date={date}
                      model={model}
                      rightSize={rightSize}
                      leftSize={leftSize}
                      last={last}
                      sole={sole}
                      midsole={midsole}
                      sockLining={sockLining}
                      heel={heel}
                      decoration={decoration}
                      material={material}
                      innerMaterial={innerMaterial}
                      color={color}
                      detail={detail}
                      images={images}
                    />
                  </div>
                </div>}
           { // state에 따라서 다른 버튼 모양
              state==="ordered" ? <StateButton 
              state={state}
              onClick={() => onChangeState("processing")}
              >제작중으로 변경하기</StateButton>
                : state==="processing" ? <StateButton 
              state={state} 
              onClick={() => onChangeState("finished")}
              >제작완료로 변경하기</StateButton>
                : null}
        </div>
      </div>
    )
  }
}

export default DetailFixedbar;