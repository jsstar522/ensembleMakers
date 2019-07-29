import React , { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalWrapper.scss' 
import styled, { keyframes } from 'styled-components';

class ModalWrapper extends Component { 
  render() {
    const { children } = this.props;
    const { mode } = this.props;
    return(
      <div className="modal-wrapper">
        {
        mode && 
        (<div className="modal-box">
          {children}
        </div>)
        }
      </div>
    )
  }
}

export default ModalWrapper;