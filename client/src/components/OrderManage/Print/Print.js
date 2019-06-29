import React, { Component } from "react";
import './Print.scss';

class Print extends Component {
  render() {
    const { name, phone, orderNumber, date, address,model, rightSize, leftSize, last, sole, midsole, sockLining, heel, decoration, material, innerMaterial, color, detail, images } = this.props;
    const items = []
    const listItems = items.map((item, index) =>
        <li key={index}>
            {item.text}
        </li>
    );

    let imageDivs = [];
    for(let i = 1; i < images.length; i++){
      imageDivs.push(
        <div className="print-page-wrapper">
          <img className="print-full-image" src={images[i]}/>
        </div>
      )
    }

    return(
      <div>
        <div className="print-page-wrapper">
          <div className="print-header-wrapper">
            <div className="print-header-name">{name}</div>
            <div className="print-header-phone">전화번호 {phone}</div>
            <div className="print-header-order-number">주문번호 {orderNumber}</div>
            <div className="print-header-date">주문날짜 {date}</div>
            <div className="print-header-address">{address}</div>
          </div>
          <table className="order-table-wrapper">
            <tbody>
            <tr>
              <td className="print-contents-label">모델명</td>
              <td className="print-contents-value">{model}</td>
              <td rowSpan="7" colSpan="2" className="print-contents-image">
              {images && <img className="print-image-wrapper" src={images[0]}/>}
              </td>
            </tr>
            <tr>
              <td className="print-contents-label">라스트</td>
              <td className="print-contents-value">{last}</td>
            </tr>
            <tr>
              <td className="print-contents-label">창</td>
              <td className="print-contents-value">{sole}</td>
            </tr>
            <tr>
              <td className="print-contents-label">중창</td>
              <td className="print-contents-value">{midsole}</td>
            </tr>
            <tr>
              <td className="print-contents-label">굽</td>
              <td className="print-contents-value">{heel}</td>
            </tr>
            <tr>
              <td className="print-contents-label">장식</td>
              <td className="print-contents-value">{decoration}</td>
            </tr>
            <tr>
              <td className="print-contents-label">까래</td>
              <td className="print-contents-value">{sockLining}</td>
            </tr>
            <tr  className="border-hidden-right">
              <td colSpan="4"></td>
            </tr>
            <tr>
              <td className="print-contents-label">왼발사이즈</td>
              <td className="print-contents-value">{leftSize}</td>
              <td className="print-contents-label">오른발사이즈</td>
              <td className="print-contents-value">{rightSize}</td>
            </tr>
            <tr>
              <td colSpan="4"></td>
            </tr>
            <tr>
              <td className="print-contents-label">소재</td>
              <td className="print-contents-value">{material}</td>
              <td className="print-contents-label">내피</td>
              <td className="print-contents-value">{innerMaterial}</td>
            </tr>
            <tr>
              <td className="print-contents-label">색상</td>
              <td className="print-contents-value">{color}</td>
            </tr>
            <tr>
            <td colSpan="4"></td>
            </tr>
            <tr>
              <td colSpan="4" className="print-contents-label">특이사항</td>
            </tr>
            <tr>
              <td colSpan="4" className="print-contents-value2">{detail}</td>
            </tr>
            </tbody>
          </table>
        </div>
        {imageDivs}
      </div>
    )
  }
}

export default Print;
