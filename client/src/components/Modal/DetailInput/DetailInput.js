import React, { Component } from 'react';
import { FaMinusCircle } from 'react-icons/fa';
import './DetailInput.scss';

class DetailInput extends Component {
  render() {
    const { label, id, onDeleteList, ...rest } = this.props;
    return(
      <div className="detail-input-wrapper">
        <div className="detail-label">{label}</div>
        <div style={{display:'flex', flexDirection: 'row', alignItems:'center'}}>
        <input className="detail-input" {...rest}/>
        <FaMinusCircle className="detail-delete-button" onClick={onDeleteList}/>
        </div>
      </div>
    )
  }
}

export default DetailInput;