import React, { Component } from 'react';
import './ProcessingControll.scss';

import { device } from '../../../lib/styleUtils';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const ProcessingWrapper = styled.div`
  position: relative;
  text-align: center;
  ${props => props.processing ? "border: 2px solid #ff5a5f;" : "border: 2px solid #d8d6d6;"}
  ${props => props.processing ? null : "opacity: 0.5;"}

  @media ${device.phone} { 
    float: none;
    width: 100%;
    height: 112px;
  }
  @media ${device.tablet} { 
    float: left;
    width: 20%;
    height: 178px;
  }
  @media ${device.desktop} { 
    float: left;
    width: 20%;
    height: 178px;
  }
`
const ProcessingLabel = styled.div`
  position: relative;
  text-align: center;
  padding: 0.5rem;
  text-align: center;
  background-color: #e0f2ff;

  @media ${device.phone} { 
    float: left;
    width: 50%;
    height: 108px;
    font-size: 1rem;
  }
  @media ${device.tablet} { 
    float: none;
    width: 100%;
    height: 64px;
    font-size: 1.3rem;
  }
  @media ${device.desktop} { 
    float: none;
    width: 100%;
    height: 64px;
    font-size: 1.3rem;
  }
`

const ProcessingValue = styled.div`
  position: relative;
  width: 20%;
  text-align: center;
  padding: 0.5rem;
  text-align: center;
  background-color: white;

  @media ${device.phone} { 
    float: left;
    width: 50%;
    height: 108px;
    font-size: 0.8rem;
  }
  @media ${device.tablet} { 
    float: none;
    width: 100%;
    height: 110px;
    font-size: 1.1rem;
  }
  @media ${device.desktop} { 
    float: none;
    width: 100%;
    height: 110px;
    font-size: 1.1rem;
  }
`
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

const NextButton = styled.div`
  border: 2px solid #ff5a5f;
  color: #ff5a5f;
  border-radius: 0.3rem;
  width: 80%;
  margin: auto;
  margin-bottom: 0.4rem;
  cursor: pointer;

  @media ${device.phone} { 
    font-size: 1.5rem;
    height: 4rem;
    padding-top: 1.1rem;
  }
  @media ${device.tablet} { 
    font-size: 1.6rem;
    height: 3.5rem;
    padding-top: 0.8rem;
  }
  @media ${device.desktop} { 
    font-size: 1.6rem;
    height: 3.5rem;
    padding-top: 0.8rem;
  }

  :hover {
    background-color: #ff5a5f;
    color: white;
    transition: all .3s;
  }

`
const PreButton = styled.div`
  border: 2px solid #7c3b59;
  color: #7c3b59;
  border-radius: 0.3rem;
  width: 80%;
  margin: auto;
  cursor: pointer;

  @media ${device.phone} { 
    font-size: 1rem;
    height: 2rem;
    padding-top: 0.4rem;
  }
  @media ${device.tablet} { 
    font-size: 1rem;
    height: 2rem;
    padding-top: 0.4rem;
  }
  @media ${device.desktop} { 
    font-size: 1rem;
    height: 2rem;
    padding-top: 0.4rem;

  :hover {
    background-color: #7c3b59;
    color: white;
    transition: all .3s;
  }
`

class ProcessingControll extends Component {
  render() {
    const { id, orderNumber, name, phone, date, state } = this.props;
    const { lastComplete, cutComplete, upperComplete, soleComplete, processingState } = this.props;
    const { onPatchProcessingNext, onPatchProcessingPre } = this.props;
    let stateText;
    stateText = state=="ordered" ? "주문완료" 
    : state=="processing" ? "제작중" 
    : "제작완료";

    return(
      <div className="processing-controll-wrapper">
        <StateBox state={state}>{stateText}</StateBox>
        
          <div className="header-name">{name}</div>
          <div className="header-phone">전화번호 {phone}</div>
          <div className="header-order-number">주문번호 {orderNumber}</div>
          <div className="header-date">주문날짜 {date}</div>
          
        <hr className="order-manage-detail-line"/>
        <ProcessingWrapper processing={processingState===0 ? true: false}>
          <ProcessingLabel>
            <div className="processing-controll-text">
          라스트/패턴<br/>(1단계)</div>
          </ProcessingLabel>
          <ProcessingValue>
            {processingState == 0 ? <div className="processing-controll-button-wrapper"><NextButton onClick={() => {onPatchProcessingNext(id, "lastComplete")}}>완료</NextButton></div> : <div className="processing-controll-text">{lastComplete}</div>}
          </ProcessingValue>
        </ProcessingWrapper>
        <ProcessingWrapper processing={processingState===1 ? true: false}>
          <ProcessingLabel>
            <div className="processing-controll-text">재단<br/>(2단계)</div>
          </ProcessingLabel>
          <ProcessingValue>
            {processingState == 1 ? <div className="processing-controll-button-wrapper"><NextButton onClick={() => {onPatchProcessingNext(id, "cutComplete")}}>완료</NextButton><PreButton onClick={() => {onPatchProcessingPre(id, "lastComplete")}}>전단계취소</PreButton></div> : <div className="processing-controll-text">{cutComplete}</div>
            }
          </ProcessingValue>
        </ProcessingWrapper>
        <ProcessingWrapper processing={processingState===2 ? true: false}>
          <ProcessingLabel>
            <div className="processing-controll-text">갑피<br/>(3단계)</div>
          </ProcessingLabel>
          <ProcessingValue>
          {processingState == 2 ? <div className="processing-controll-button-wrapper"><NextButton onClick={() => {onPatchProcessingNext(id, "upperComplete")}}>완료</NextButton><PreButton onClick={() => {onPatchProcessingPre(id, "cutComplete")}}>전단계취소</PreButton></div> : <div className="processing-controll-text">{upperComplete}</div>
            }
          </ProcessingValue>
        </ProcessingWrapper>
        <ProcessingWrapper processing={processingState===3 ? true: false}>
          <ProcessingLabel>
            <div className="processing-controll-text">저부<br/>(4단계)</div>
          </ProcessingLabel>
          <ProcessingValue>
          {processingState == 3 ? <div className="processing-controll-button-wrapper"><NextButton onClick={() => {onPatchProcessingNext(id, "soleComplete")}}>완료</NextButton><PreButton onClick={() => {onPatchProcessingPre(id, "upperComplete")}}>전단계취소</PreButton></div> : <div className="processing-controll-text">{soleComplete}</div>
            }
          </ProcessingValue>
        </ProcessingWrapper>
        <ProcessingWrapper processing={processingState===4 ? true: false}>
          <ProcessingLabel>
            <div className="processing-controll-text">제작완료</div>
          </ProcessingLabel>
          <ProcessingValue>
          {processingState == 4 ? <div className="processing-controll-button-wrapper"><div className="complete-text">제작완료</div>
            { // 작업완료 되면 소비자는 컨트롤 불가
            state !== "finished" && <PreButton onClick={() => {onPatchProcessingPre(id, "soleComplete")}}>전단계취소</PreButton>}
            </div> : null
            }
          </ProcessingValue>
        </ProcessingWrapper>
      </div>
    )
  }
}

export default ProcessingControll;