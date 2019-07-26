import React, { Component } from "react";
import './Print.scss';

class Print extends Component {
  render() {
    const { name, phone, orderNumber, date, address, contents, detail, images } = this.props;

    const contentsList = contents.template.map(
      function(content, i) {
        if ( i > 6 && i%2 !== 0 && contents.template.length > i+1) {
          return (
            <tr key={i} className="print-contents-row" colSpan="4">
              <td className="print-contents-label">{contents.template[i].label}+{i}</td>
              <td className="print-contents-value">{contents.template[i].value}</td>
              <td className="print-contents-label">{contents.template[i+1].label}+{i+1}</td>
              <td className="print-contents-value">{contents.template[i+1].value}</td>
            </tr>)
        } 
        else if (i > 6 && i%2 === 0 ) {
          return
        }
        else {
          return(
            <tr key={i} className="print-contents-row">
              <td className="print-contents-label">{content.label}+{i}</td>
              <td className="print-contents-value">{content.value}</td>
              {content.label === "모델" &&
              <td rowSpan="7" colSpan="2" className="print-contents-image">
                {images &&
                  // <img className="print-image-wrapper" src={images[0]}/>
                  <img src={images[0]}/>
                }
              </td>
              }
            </tr>
            )    
        }
      }    
    )

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
              {contentsList}
            <tr className="border-hidden-right">
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
