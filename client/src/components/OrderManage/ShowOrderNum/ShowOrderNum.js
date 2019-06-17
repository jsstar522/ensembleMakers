import React, { Component } from 'react';
import './ShowOrderNum.scss';

class Review extends Component {
  render() {
    const { orderNumber } = this.props;
    return(
      <div className="show-order-num-wrapper">
        <div className="show-order-num-header">주문번호</div>
        <div className="show-order-num-contents">이 주문서의 주문번호는 <b>{orderNumber}</b> 입니다.<br/>RFID 칩에 주문번호를 등록해주세요.<br/> </div><div className="RFID-box"><b>https://esbmakers.com/order/{orderNumber}</b></div>
      </div>
    )
  }
}

export default Review;