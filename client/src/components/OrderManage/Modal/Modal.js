import React , { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss' 
import styled, { keyframes } from 'styled-components';

class Modal extends Component { 
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

export default Modal;