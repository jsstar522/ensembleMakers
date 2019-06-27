import React, { Component } from 'react';
import './DetailContentsTable.scss';

class DetailContentsTable extends Component {
  render() {
    const { imgTextView } = this.props;
    const { address, state, model, rightSize, leftSize, last, sole, midsole, sockLining, heel, decoration, material, innerMaterial, color, detail, images } = this.props;
    const { onChangeImgText, onOpenImageModal } = this.props;

    return(
      <div className="detail-contents-table-wrapper">
        <div className="detail-contents-table">
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">모델</div>
            <div className="detail-contents-cell">{model}</div>
          </div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">라스트</div>
            <div className="detail-contents-cell">{last}</div>
          </div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">창</div>
            <div className="detail-contents-cell">{sole}</div>
          </div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">중창</div>
            <div className="detail-contents-cell">{midsole}</div>
          </div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">굽</div>
            <div className="detail-contents-cell">{heel}</div>
          </div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">까래</div>
            <div className="detail-contents-cell">{sockLining}</div>
          </div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">갑피</div>
            <div className="detail-contents-cell">{material}</div>
          </div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">내피</div>
            <div className="detail-contents-cell">{innerMaterial}</div>
          </div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">색상</div>
            <div className="detail-contents-cell">{color}</div>
          </div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">장식</div>
            <div className="detail-contents-cell">{decoration}</div>
          </div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">왼발사이즈</div>
            <div className="detail-contents-cell">{leftSize}</div>
          </div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">오른발사이즈</div>
            <div className="detail-contents-cell">{rightSize}</div>
          </div>
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