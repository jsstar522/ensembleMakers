import React, { Component } from 'react';
import './ProcessingTable.scss';

import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const ProcessingLabel = styled.td`
  position: relative;
  font-size: 0.9rem;
  height: 3rem;
  width: 20%;
  border: 2px solid #d8d6d6;
  ${props => props.processing ? "border-left: 3px solid red; border-right: 3px solid red; border-top: 3px solid red;" : null}
  text-align: center;
`
const ProcessingValue = styled.td`
  position: relative;
  font-size: 0.9rem;
  height: 3rem;
  width: 20%;
  border: 2px solid #d8d6d6;
  ${props => props.processing ? "border-left: 3px solid red; border-right: 3px solid red; border-bottom: 3px solid red;" : null}
  text-align: center;
`

class ProcessingTable extends Component {
  render() {
    const { id } = this.props;
    const { lastComplete, cutComplete, upperComplete, soleComplete, processingState } = this.props;
    const { onPatchProcessingNext, onPatchProcessingPre } = this.props;
    // 현재 진행사항

    return(
      <div className="processing-table-wrapper">
        <table className="processing-form-table">
          <tbody>
          <tr>
            <ProcessingLabel processing={processingState===0 ? true: false}><b>라스트/패턴</b><br/>(1단계)
            </ProcessingLabel>
            <ProcessingLabel processing={processingState===1 ? true: false}><b>재단</b><br/>(2단계)
            </ProcessingLabel>
            <ProcessingLabel processing={processingState===2 ? true: false}><b>갑피</b><br/>(3단계)
            </ProcessingLabel>
            <ProcessingLabel processing={processingState===3 ? true: false}><b>저부</b><br/>(4단계)
            </ProcessingLabel>
            <ProcessingLabel processing={processingState===4 ? true: false}><b>제작완료</b>
            </ProcessingLabel>
          </tr>
          <tr>
            <ProcessingValue processing={processingState===0 ? true: false}>
              {processingState == 0 ? <div><div className="complete-button" onClick={() => {onPatchProcessingNext(id, "lastComplete")}}>완료</div></div> : lastComplete}
            </ProcessingValue>
            <ProcessingValue processing={processingState===1 ? true: false}>
              {processingState == 1 ? <div><div className="complete-button" onClick={() => {onPatchProcessingNext(id, "cutComplete")}}>완료</div><div className="complete-button" onClick={() => {onPatchProcessingPre(id, "lastComplete")}}>전단계취소</div></div> : cutComplete}
            </ProcessingValue>
            <ProcessingValue processing={processingState===2 ? true: false}>
              {processingState == 2 ? <div><div className="complete-button" onClick={() => {onPatchProcessingNext(id, "upperComplete")}}>완료</div><div className="complete-button" onClick={() => {onPatchProcessingPre(id, "cutComplete")}}>전단계취소</div></div> : upperComplete}
            </ProcessingValue>
            <ProcessingValue processing={processingState===3 ? true: false}>
              {processingState == 3 ? <div><div className="complete-button" onClick={() => {onPatchProcessingNext(id, "soleComplete")}}>완료</div><div className="complete-button" onClick={() => {onPatchProcessingPre(id, "upperComplete")}}>전단계취소</div></div> : soleComplete}
            </ProcessingValue>
            <ProcessingValue processing={processingState===4 ? true: false}>
              {processingState == 4 ? <div><div>제작완료</div><div className="complete-button" onClick={() => {onPatchProcessingPre(id, "soleComplete")}}>전단계취소</div></div> : null}
            </ProcessingValue>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default ProcessingTable;
