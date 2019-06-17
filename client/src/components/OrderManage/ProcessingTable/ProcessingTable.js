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
  ${props => props.processing ? "border-left: 3px solid #ff5a5f; border-right: 3px solid #ff5a5f; border-top: 3px solid #ff5a5f;" : null}
  text-align: center;
`
const ProcessingValue = styled.td`
  position: relative;
  font-size: 0.9rem;
  height: 3rem;
  width: 20%;
  border: 2px solid #d8d6d6;
  ${props => props.processing ? "border-left: 3px solid #ff5a5f; border-right: 3px solid #ff5a5f; border-bottom: 3px solid #ff5a5f;" : null}
  text-align: center;
`

class ProcessingTable extends Component {
  render() {
    const { id } = this.props;
    const { lastComplete, cutComplete, upperComplete, soleComplete, processingState } = this.props;
    const { onPatchProcessingNext, onPatchProcessingPre } = this.props;

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
              {processingState == 0 ? "제작중" : lastComplete}
            </ProcessingValue>
            <ProcessingValue processing={processingState===1 ? true: false}>
              {processingState == 1 ? "제작중" : cutComplete}
            </ProcessingValue>
            <ProcessingValue processing={processingState===2 ? true: false}>
              {processingState == 2 ? "제작중" : upperComplete}
            </ProcessingValue>
            <ProcessingValue processing={processingState===3 ? true: false}>
              {processingState == 3 ? "제작중" : soleComplete}
            </ProcessingValue>
            <ProcessingValue processing={processingState===4 ? true: false}>
              {processingState == 4 ? "제작완료" : null}
            </ProcessingValue>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default ProcessingTable;
