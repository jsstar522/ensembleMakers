import React, { Component } from 'react';
import { UserButton } from '../../components/Base/UserButton';
import * as baseActions from '../../store/modules/base';
import * as authActions from '../../store/modules/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from '../../lib/storage';


class UserButtonContainer extends Component {

  handleShowUserMenu = () => {
    const { visible } = this.props;
    const { BaseActions } = this.props;
    BaseActions.showUserMenu(!visible);
  }

  handleLogout = async () => {
    const { AuthActions } = this.props;
    try {
        await AuthActions.logout();
    } catch (e) {
        console.log(e);
    }

    storage.remove('loggedInfo');
    window.location.href = '/'; // 홈페이지로 새로고침
  };

  render(){
    const { user } = this.props;
    const { handleLogout } = this; 
    return(
      <UserButton onLogout={handleLogout}> <b>{user.getIn(['loggedInfo', 'username'])}</b> 님 어서오세요 </UserButton>
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
    AuthActions: bindActionCreators(authActions, dispatch) 
  })
)(UserButtonContainer);