import React, { Component } from 'react';
import './CustomerInfoWrapper.scss';

class CustomerInfoTable extends Component{
  render() {
  const { children } = this.props;
    return(
      <div className="customer-info-wrapper">
        <div className="customer-info-input">
          {children}
        </div>
      </div>
    )
  }
}

export default CustomerInfoTable;