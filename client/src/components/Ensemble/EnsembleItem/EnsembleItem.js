import React, { Component } from 'react';



class EnsembleItem extends Component {
  render(){
    const { allPost } = this.props;
    return(
      <div>{allPost}<br/>{allPost}<br/>{allPost}<br/>{allPost}<br/>{allPost}<br/>{allPost}<br/>{allPost}<br/>{allPost}<br/>
      </div>
    )
  }
}

export default EnsembleItem;