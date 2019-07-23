import React, { Component } from 'react';
import './DetailInput.scss';

class DetailInput extends Component {
  render() {
    const { label, id, onDeleteList, ...rest } = this.props;
    return(
      <div className="detail-input-wrapper">
        <div className="detail-label">{label}</div>
        <div style={{display:'flex', flexDirection: 'row', alignItems:'center'}}>
        <input className="detail-input" {...rest}/>
        <div className="detail-delete-button" onClick={(i, kind)=>onDeleteList(i, kind)}>-</div>
        </div>
      </div>
    )
  }
}

export default DetailInput;