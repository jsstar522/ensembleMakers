import React, { Component } from 'react';
import './CustomerInfoInput.scss';

class CustomerInfoInput extends Component {
  render() {
    const { label, ...rest } = this.props;
    return(
      <div>
        <div className="label">{label}</div>
        <input className="input" {...rest}/>
      </div>
    )
  }
}

export default CustomerInfoInput;