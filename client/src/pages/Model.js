import React, { Component } from 'react';
import { ModelContainer } from '../containers/Model';

class Model extends Component {
  render() {
    const { name } = this.props.match.params;
    const { number } = this.props.match.params;

    return(
      <ModelContainer 
        modelName={name}
        userNumber={number}
      />
    )
  }
}

export default Model;