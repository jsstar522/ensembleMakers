import React, { Component } from 'react';
import './FinishedTable.scss';

class FinishedTable extends Component {
  render() {
    const { lastComplete, cutComplete, upperComplete, soleComplete, processingState } = this.props;
    return(
      <div className="processing-table-wrapper">
        <table className="processing-form-table">
          <tbody>
          <tr>
            <td className="processing-label"><b>라스트/패턴</b><br/>(1단계)
            </td>
            <td className="processing-label"><b>재단</b><br/>(2단계)
            </td>
            <td className="processing-label"><b>갑피</b><br/>(3단계)
            </td>
            <td className="processing-label"><b>저부</b><br/>(4단계)
            </td>
            <td className="processing-label"><b>제작완료</b>
            </td>
          </tr>
          <tr>
            <td className="processing-value">{lastComplete}</td>
            <td className="processing-value">{cutComplete}</td>
            <td className="processing-value">{upperComplete}</td>
            <td className="processing-value">{soleComplete}</td>
            <td className="processing-value">제작완료</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default FinishedTable;