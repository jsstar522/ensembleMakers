import React, { Component } from 'react';
import './LinkButton.scss';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BorderedButton = styled.a`
  display: table-cell;
  vertical-align: middle;
  border: 1px solid red;
  border-radius: 5px;
  width: 40%;
  cursor: pointer;
`;


class LinkButton extends Component {
  render() {
    const { logged, userNumber } = this.props;
    return(
      <div className="link-button-wrapper">
        <BorderedButton href={logged?"/orderManage":"/login/signin"}>주문관리</BorderedButton>
        <BorderedButton href={logged?"/customerInfo/"+userNumber:"/login/signin"}>주문받기</BorderedButton>
      </div>
    )
  }
}

export default LinkButton;