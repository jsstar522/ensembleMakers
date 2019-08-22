import React, { Component } from 'react';
import './DetailContentsTable.scss';

class DetailContentsTable extends Component {
  render() {
    const { imgTextView } = this.props;
    const { address, state, detail, images, contents } = this.props;

    const contentsList = contents.template.map(
      (content, i) => 
        <div key={i} className="detail-contents-row">
          <div className="detail-contents-cell-header">{content.label}</div>
          <div className="detail-contents-cell">{content.value}</div>
        </div>
    )

    return(
      <div className="detail-contents-table-wrapper">
        <div className="detail-contents-table">
          {contentsList}
        </div>
        <div className="detail-contents-table-line"/>
        <div className="detail-contents-row">
          <div className="detail-contents-cell-header">특이사항</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell">{detail}</div>
        </div>
        <div className="detail-contents-table-line"/>
        <div className="detail-contents-row">
          <div className="detail-contents-cell-header">출고날짜 달력넣기</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell">출고날짜 달력넣기</div>
        </div>
        <div className="detail-contents-table-line"/>
        <div className="detail-contents-row">
          <div className="detail-contents-cell-header">가격</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell">가격</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell-header">수령방식</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell">수령방식</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell-header">주소</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell">{address}</div>
        </div>
      </div>
    )
  }
}

export default DetailContentsTable;