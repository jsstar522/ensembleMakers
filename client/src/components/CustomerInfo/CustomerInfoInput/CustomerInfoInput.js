import React, { Component } from 'react';
import './CustomerInfoInput.scss';

class CustomerInfoInput extends Component {
  render() {
    const { label, ...rest } = this.props;
    return(
      <div>
        <div className="customer-info-label">{label}</div>
        <input className="customer-info-input" {...rest}/>
      </div>
    )
  }
}

export default CustomerInfoInput;