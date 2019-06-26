import React, { Component } from 'react';
import './ShowOrderNum.scss';

class Review extends Component {
  render() {
    const { orderNumber } = this.props;
    return(
      <div className="show-order-num-wrapper">
        <div className="show-order-num-header">RFID 주문번호 등록</div>
        <div className="show-order-num-contents">RFID 칩에 다음주소를 등록해주세요.<br/> </div><div className="RFID-box"><b>https://esbmakers.com/order/{orderNumber}</b></div>
      </div>
    )
  }
}

export default Review;