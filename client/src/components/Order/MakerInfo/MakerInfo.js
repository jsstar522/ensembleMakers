import React, { Component } from 'react';
import './MakerInfo.scss';

import MdPhonePortrait from 'react-ionicons/lib/MdPhonePortrait';
import MdHome from 'react-ionicons/lib/MdHome';

class MakerInfo extends Component {
  render() {
    return(
      <div className="maker-info-wrapper">
        <div className="maker-info-bar">
          제작자 정보
        </div>
        <div className="maker-info-contents">
          <div className="maker-info-header">
            조애 ZOE
          </div>
          <div className="maker-info-phone">
            <MdPhonePortrait/> 
            <div style={{paddingTop:"2px"}}>010-2934-1358</div>
          </div>
          <div className="maker-info-address">
            <MdHome/>
            <div style={{paddingTop:"2px"}}>서울특별시 성동구 성수동2가 300-5</div>
          </div>
          <div className="maker-info-detail">
            as 다른주문 다른상품보기... 
          </div>
        </div>
      </div>
    )
  }
}

export default MakerInfo;