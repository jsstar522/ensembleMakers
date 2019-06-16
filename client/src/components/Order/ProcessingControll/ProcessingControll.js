import React, { Component } from 'react';
import './ProcessingControll.scss';

import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const ProcessingLabel = styled.div`
  position: relative;
  font-size: 0.9rem;
  height: 3rem;
  width: 20%;
  border: 2px solid #d8d6d6;
  ${props => props.processing ? "border-left: 3px solid red; border-right: 3px solid red; border-top: 3px solid red;" : null}
  text-align: center;

  @include media("<small")
    {
      float: left;
    }


`
const ProcessingValue = styled.div`
  position: relative;
  font-size: 0.9rem;
  height: 3rem;
  width: 20%;
  border: 2px solid #d8d6d6;
  ${props => props.processing ? "border-left: 3px solid red; border-right: 3px solid red; border-bottom: 3px solid red;" : null}
  text-align: center;
`

class ProcessingControll extends Component {
  render() {
    return(
      <div className="processing-controll-wrapper">
        <ProcessingLabel>aa</ProcessingLabel>
        <ProcessingLabel>bb</ProcessingLabel>
        <ProcessingLabel>cc</ProcessingLabel>
      </div>
    )
  }
}

export default ProcessingControll;