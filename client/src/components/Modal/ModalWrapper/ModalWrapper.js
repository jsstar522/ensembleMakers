import React , { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalWrapper.scss' 
import styled, { keyframes } from 'styled-components';

class ModalWrapper extends Component { 
  render() {
    const { children } = this.props;
    const { visible } = this.props;
    return(
      <div className="modal-wrapper">
        {
        visible && 
        (<div className="modal-box">
          {children}
        </div>)
        }
      </div>
    )
  }
}

export default ModalWrapper;