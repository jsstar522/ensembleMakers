import React, { Component } from 'react';
import './LinkButton.scss';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BorderedButton = styled(Link)`
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
        <BorderedButton to={logged?"/orderManage":"/auth/login"}>주문관리</BorderedButton>
        <BorderedButton to={logged?"/customerInfo/"+userNumber:"/auth/login"}>주문받기</BorderedButton>
      </div>
    )
  }
}

export default LinkButton;