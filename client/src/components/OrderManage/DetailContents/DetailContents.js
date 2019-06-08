import React, { Component } from 'react';
import './DetailContents.scss';

class DetailContents extends Component {
  render() {
    const { imgTextView } = this.props;
    const { model, rightSize, leftSize, last, sole, midsole, sockLining, heel, decoration, material, innerMaterial, color, detail, images } = this.props;
    const { onChangeImgText, onOpenImageModal } = this.props;
    return(
      <div className="detail-contents-wrapper">
        <table className="detail-contents-form-table">
          <tbody>
          <tr>
            <td className="detail-contents-label">모델명</td>
            <td className="detail-contents-value">{model}</td>
            <td rowSpan="7" colSpan="2" className="detail-contents-image" onClick={onOpenImageModal}>
            {images && <img className="detail-image-wrapper" src={images[0]} onMouseOver={() => {onChangeImgText(true)}} onMouseOut={() => {onChangeImgText(false)}}/>}
            {imgTextView && <div className="detail-image-ref-text">등록된 이미지가 총 {images.length}개 있습니다.<br/> 이미지를 등록/삭제 하시려면 클릭하세요.</div>}
            </td>
          </tr>
          <tr>
            <td className="detail-contents-label">라스트</td>
            <td className="detail-contents-value">{last}</td>
          </tr>
          <tr>
            <td className="detail-contents-label">창</td>
            <td className="detail-contents-value">{sole}</td>
          </tr>
          <tr>
            <td className="detail-contents-label">중창</td>
            <td className="detail-contents-value">{midsole}</td>
          </tr>
          <tr>
            <td className="detail-contents-label">굽</td>
            <td className="detail-contents-value">{heel}</td>
          </tr>
          <tr>
            <td className="detail-contents-label">장식</td>
            <td className="detail-contents-value">{decoration}</td>
          </tr>
          <tr>
            <td className="detail-contents-label">까래</td>
            <td className="detail-contents-value">{sockLining}</td>
          </tr>
          <tr>
            <td colSpan="4"><hr className="editor-modal-line"></hr></td>
          </tr>
          <tr>
            <td className="detail-contents-label">왼발사이즈</td>
            <td className="detail-contents-value">{leftSize}</td>
            <td className="detail-contents-label">오른발사이즈</td>
            <td className="detail-contents-value">{rightSize}</td>
          </tr>
          <tr>
            <td colSpan="4"><hr className="editor-modal-line"></hr></td>
          </tr>
          <tr>
            <td className="detail-contents-label">소재</td>
            <td className="detail-contents-value">{material}</td>
            <td className="detail-contents-label">내피</td>
            <td className="detail-contents-value">{innerMaterial}</td>
          </tr>
          <tr>
            <td className="detail-contents-label">색상</td>
            <td className="detail-contents-value">{color}</td>
          </tr>
          <tr>
          <td colSpan="4"><hr className="editor-modal-line"></hr></td>
          </tr>
          <tr>
            <td colSpan="4" className="detail-contents-label">특이사항</td>
          </tr>
          <tr>
            <td colSpan="4" className="detail-contents-value2">{detail}</td>
          </tr>
          <tr>
            <td colSpan="4"><hr className="editor-modal-line"></hr></td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default DetailContents;