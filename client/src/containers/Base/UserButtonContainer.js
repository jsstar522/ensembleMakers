import React, { Component } from 'react';
import { UserButton } from '../../components/Base/UserButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserButtonContainer extends Component {

  render(){
    return(
      <UserButton/>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['userMenu']),
  }),
  (dispatch) => ({
  })
)(UserButtonContainer);