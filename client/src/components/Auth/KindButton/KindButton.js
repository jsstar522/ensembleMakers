import React, { Component } from 'react';
import './KindButton.scss';
import styled from 'styled-components';

const Button = styled.div`
  border: 1px solid #d8d6d6;
  color: #757575;
  ${props => props.index === props.kind && 'background-color: #4695D6; color: white;' }
  ${props => props.index !== props.kind && ':hover{background-color: #4695D6; color: white;}' }

  width: 45%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`

class KindButton extends Component {
  render() {
    const { kind } = this.props;
    const { onChangeKind } = this.props;
    return(
      <div className="kind-button-wrapper">
        <Button index="general" kind={kind} onClick={() => onChangeKind('general')}>일반회원</Button>
        <Button index="makers" kind={kind} onClick={() => onChangeKind('makers')}>제작자</Button>
      </div>
    )
  }
}

export default KindButton;