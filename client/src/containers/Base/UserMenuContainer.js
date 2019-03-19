import React, { Component } from 'react';
import { UserMenu } from '../../components/Base/UserMenu';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserButtonContainer extends Component {

  render(){

    const { visible } = this.props;
    if(!visible) return null;
    return(
      <UserMenu />
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