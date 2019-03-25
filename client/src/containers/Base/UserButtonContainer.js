import React, { Component } from 'react';
import { UserButton } from '../../components/Base/UserButton';
import * as baseActions from '../../store/modules/base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class UserButtonContainer extends Component {

  handleShowUserMenu = () => {
    const { visible } = this.props;
    const { BaseActions } = this.props;
    BaseActions.showUserMenu(!visible);
  }

  render(){
    const { user } = this.props;
    return(
      <UserButton onClick={this.handleShowUserMenu}> {user.getIn(['loggedInfo', 'email'])} </UserButton>
      // <div onClick={this.handleLogout}>로그아웃</div>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['userMenu']),
    user: state.user,
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(UserButtonContainer);