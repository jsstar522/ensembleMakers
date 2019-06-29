import React, { Component } from 'react';
import ReactToPrint from "react-to-print";
import './OrderManageDetail.scss'
import { DetailContents } from '../DetailContents';
import { ProcessingTable } from '../ProcessingTable';
import { FinishedTable } from '../FinishedTable';
import { Review } from '../Review';
import { ShowOrderNum } from '../ShowOrderNum';
import { Print } from '../Print';

import styled from 'styled-components';
import oc from 'open-color';
import MdPrint from 'react-ionicons/lib/MdPrint';

const StateBox = styled.div`
  position: relative;
  right: 0; 
  float: right;
  width: 80px;
  height: 30px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 5px;
  //state에 따라 박스 색 변경
  background-color: ${props => props.state == "ordered" ? "#f69e53" : props.state == "processing" ? "#fa6e57" : "#4695d6"};
  text-shadow: 0 0 2px ${props => props.state == "ordered" ? "#f69e53" : props.state == "processing" ? "#fa6e57" : "#4695d6"};
  color: white;
  padding-top: 3px;

  // 글자드래그 방지
  -ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;
`

const StateButton = styled.div`
  position: absolute;
  float: left;
  border: 2px solid ${props => 
    props.state=="ordered" ? "#fa6e57"
    : props.state=="processing" ? "#4695d6"
    : null};
  color: ${props => 
    props.state=="ordered" ? "#fa6e57"
    : props.state=="processing" ? "#4695d6"
    : null};
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 2rem;

  right: 28%;
  padding-top: 3px;
  width: 115px;
  height: 40px;
  text-align: center;
  cursor: pointer;
  font-size: 13px;

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

class OrderManageDetail extends Component {
  render() {
    const { imgTextView, detailView, review } = this.props;
    const { id, orderNumber, name, phone, address ,date, state, model, rightSize, leftSize, last, sole, midsole, sockLining, heel, decoration, material, innerMaterial, color, detail, images } = this.props;
    const { lastComplete, cutComplete, upperComplete, soleComplete, processingState } = this.props;
    const { onChangeState, onDetailViewChange, onChangeImgText, onOpenEditorModal, onOpenImageModal, onPatchProcessingNext, onPatchProcessingPre } = this.props;
    let stateText;
    stateText = state=="ordered" ? "주문완료" 
    : state=="processing" ? "제작중" 
    : "제작완료";

    return(
      <div className="order-manage-detail-wrapper">
        {detailView ? <div>
          <StateBox state={state}>{stateText}</StateBox>
          <div className="header-name">{name}</div>
          <div className="header-phone">전화번호 {phone}</div>
          <div className="header-order-number">주문번호 {orderNumber}</div>
          <div className="header-date">주문날짜 {date}</div>
          <div className="header-address">{address}</div>
          <hr className="order-manage-detail-line"/>
          {state == "processing" && <ProcessingTable
            id={id}
            lastComplete={lastComplete}
            cutComplete={cutComplete}
            upperComplete={upperComplete}
            soleComplete={soleComplete}
            processingState={processingState}
            onPatchProcessingNext={onPatchProcessingNext}
            onPatchProcessingPre={onPatchProcessingPre}/>}
          {state == "finished" && <FinishedTable
            lastComplete={lastComplete}
            cutComplete={cutComplete}
            upperComplete={upperComplete}
            soleComplete={soleComplete}/>}
          <DetailContents
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
            imgTextView={imgTextView}
            onChangeImgText={onChangeImgText}
            onOpenImageModal={onOpenImageModal}
          />

          { // state가 ordered일 때,  주문번호 등록창 보이기
            state==="ordered" ? <ShowOrderNum orderNumber={orderNumber}/> : null}
          { // state가 finished일 때, 등록/수정 버튼과 state 변경 버튼 삭제 
            state==="finished" ? null 
              : <div className="order-manage-post-button" onClick={onOpenEditorModal}>등록 및 수정하기</div>}
          { // state가 finished일 때, 리뷰창 보이기
            state==="finished" ? <Review review={review}/> : null}

          { // state에 따라서 다른 버튼 모양
            state==="ordered" ? <StateButton 
            state={state}
            onClick={() => onChangeState("processing")}
            >제작중으로<br/>변경하기</StateButton>
              : state==="processing" ? <StateButton 
            state={state} 
            onClick={() => onChangeState("finished")}
            >제작완료로<br/>변경하기</StateButton>
              : null}
          
          <div className="print-button">
            <ReactToPrint
              trigger={() => <div><MdPrint/><div>인쇄하기</div></div>}
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



        </div> 
          // 이름을 클릭하지 않았을 때 나타나는 내용
          : <div className="detail-default-content">고객 주문서를 확인하려면 왼쪽에 있는 해당 <b>주문상태</b>와 <b>고객이름</b>을 클릭하세요.</div>}
      </div>
    )
  }
}

export default OrderManageDetail;
