import React, { Component } from 'react';

import { CustomerInfoContainer } from '../containers/CustomerInfo';

class CustomerInfo extends Component {
  render(){
    const { id } = this.props.match.params;
    return(
      <CustomerInfoContainer userNumber={id}/>
      
    )
  }
}

export default CustomerInfo;