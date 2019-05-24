import React, { Component } from 'react';
import './DetailInput.scss';

class DetailInput extends Component {
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

export default DetailInput;