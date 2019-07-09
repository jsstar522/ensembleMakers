import React, { Component } from 'react';
import './LinkButton.scss';

class LinkButton extends Component {
  render() {
    const { logged, userNumber } = this.props;
    return(
      <div className="link-button-wrapper">
        <a className="link-button" href={logged ? "/orderManage":"/auth/login"}>주문관리</a>
        <a className="link-button" href={logged ? "/customerInfo/"+userNumber:"/auth/login"}>주문받기</a>
      </div>
    )
  }
}

export default LinkButton;