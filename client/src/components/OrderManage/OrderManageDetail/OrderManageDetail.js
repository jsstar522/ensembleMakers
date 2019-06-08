import React, { Component } from 'react';
import './OrderManageDetail.scss'
import { DetailContents } from '../DetailContents';

import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

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
  background-color: ${props => props.state == "ordered" ? oc.orange[4] : props.state == "processing" ? oc.pink[4] : oc.lime[3]};
  text-shadow: 0 0 2px ${props => props.state == "ordered" ? oc.orange[6] : props.state == "processing" ? oc.pink[6] : oc.lime[6]};
  color: white;
  padding-top: 3px;

  // 글자드래그 방지
  -ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;

`

const StateButton = styled.div`
  position: relative;
  right: 0; 
  float: right;
  width: 85px;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;

  border-radius: 5px;
  //state에 따라 박스 색 변경
  background-color: ${props => props.state=="ordered" ? oc.pink[4] 
  : props.state=="processing" ? oc.lime[3] 
  : null};
  text-shadow: 0 0 2px ${props => props.state=="ordered" ? oc.pink[6] 
  : props.state=="processing" ? oc.lime[6] 
  : null};
  color: white;
  padding-top: 3px;

  // 글자드래그 방지
  -ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;

  :hover {
    background-color: ${props => props.state=="ordered" ? oc.pink[8] 
    : props.state=="processing" ? oc.lime[6] 
    : null};
  }
`


class OrderManageDetail extends Component {
  render() {
    const { children } = this.props;
    const { imgTextView } = this.props;
    const { name, phone, date, state, model, rightSize, leftSize, last, sole, midsole, sockLining, heel, decoration, material, innerMaterial, color, detail, images } = this.props;
    const { onChangeState, onChangeImgText, onOpenImageModal } = this.props;
    let stateText;
    stateText = state=="ordered" ? "주문완료" 
    : state=="processing" ? "제작중" 
    : "제작완료";

    return(
      <div className="order-manage-detail-wrapper">
        <StateBox state={state}>{stateText}</StateBox>
        <div className="header-date">주문날짜 {date}</div>
        <div className="header-name">{name}</div>
        <div className="header-phone">전화번호 {phone}</div>
        <hr className="order-manage-detail-line"/>
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
        {children}
        <StateButton 
        state={state}
        onClick={state=="ordered" ? () => onChangeState("processing") : state=="processing" ? () => onChangeState("finished") : null}
        >{state=="ordered" ? <div>제작중으로<br/>변경하기</div> : state=="processing" ? <div>제작완료로<br/>변경하기</div> : null}</StateButton>
      </div>
    )
  }
}

export default OrderManageDetail;