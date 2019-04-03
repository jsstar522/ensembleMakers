import React, { Component } from 'react';
import { EnsembleItem } from '../EnsembleItem';

class EnsembleList extends Component {
  render(){
    const { allPost } = this.props;
    return(
      <EnsembleItem
        allPost={allPost}
      />
    )
  }
}

export default EnsembleList;