import React, { Component } from 'react';
import './OrderManageDetail.scss'
import { DetailContentsTable } from '../DetailContentsTable';
import { DetailFixedbar } from '../DetailFixedbar';
import { ProcessingTable } from '../ProcessingTable';
import { FinishedTable } from '../FinishedTable';
import { Review } from '../Review';

import styled from 'styled-components';
import { device } from '../../../lib/styleUtils';
import oc from 'open-color';

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

class OrderManageDetail extends Component {
  render() {
    const { imgTextView, detailView, review } = this.props;
    const { id, orderNumber, name, phone, address, contents, date, state, model, rightSize, leftSize, last, sole, midsole, sockLining, heel, decoration, material, innerMaterial, color, detail, images } = this.props;
    const { lastComplete, cutComplete, upperComplete, soleComplete, processingState } = this.props;
    const { onChangeState, onDetailViewChange, onChangeImgText, onOpenEditorModal, onOpenImageModal, onPatchProcessingNext, onPatchProcessingPre } = this.props;
    let stateText;
    stateText = state=="ordered" ? "주문완료" 
    : state=="processing" ? "제작중" 
    : "제작완료";

    return(
      <div className="order-manage-detail-wrapper">
        {detailView ?
          <div className="detail-selected-content">
            <StateBox state={state}>{stateText}</StateBox>
            <div className="header-name">{name}</div>
            <div className="header-phone">전화번호 {phone}</div>
            <div className="header-order-number">주문번호 {orderNumber}</div>
            <div className="header-date">주문날짜 {date}</div>
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
            <div className="detail-contents-wrapper">
              <DetailContentsTable
                address={address}
                contents={contents}
                detail={detail}
                images={images}
                imgTextView={imgTextView}
                onChangeImgText={onChangeImgText}
                onOpenImageModal={onOpenImageModal}
              />
              <DetailFixedbar
                state={state}
                orderNumber={orderNumber}
                name={name}
                phone={phone}
                address={address}
                date={date}
                // model={model}
                // rightSize={rightSize}
                // leftSize={leftSize}
                // last={last}
                // sole={sole}
                // midsole={midsole}
                // sockLining={sockLining}
                // heel={heel}
                // decoration={decoration}
                // material={material}
                // innerMaterial={innerMaterial}
                // color={color}
                detail={detail}
                images={images}
                imgTextView={imgTextView}
                onOpenEditorModal={onOpenEditorModal}
                onOpenImageModal={onOpenImageModal}
                onChangeState={onChangeState}
                onChangeImgText={onChangeImgText}
              />
            </div>
            { // state가 finished일 때, 리뷰창 보이기
              state==="finished" ? <Review review={review}/> : null}
          </div>
          // 이름을 클릭하지 않았을 때 나타나는 내용
          : <div className="detail-default-content">고객 주문서를 확인하려면 왼쪽에 있는 해당 <b>주문상태</b>와 <b>고객이름</b>을 클릭하세요.</div>}
      </div>
    )
  }
}

export default OrderManageDetail;