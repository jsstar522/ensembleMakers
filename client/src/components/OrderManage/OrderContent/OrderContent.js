import React, { Component } from 'react';

class OrderContent extends Component {
  render(){
    const { label, content } = this.props;
    return(
      <div>{label}<br/>{content}</div>
    )
  }
}

export default OrderContent;