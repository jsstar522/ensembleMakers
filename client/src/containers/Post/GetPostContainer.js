import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EnsembleList } from '../../components/Ensemble/EnsembleList';
import * as postActions from '../../store/modules/post';

class GetPostContainer extends Component {

  render(){
    // const { allPost } = this.props;
    const allPost = 'helloaaaaazzzz';
    return(
      <EnsembleList
        allPost={allPost}
      />
    )
  }
}

export default GetPostContainer;