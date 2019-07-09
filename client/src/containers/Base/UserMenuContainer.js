import React, { Component } from 'react';
import { UserMenu } from '../../components/Base/UserMenu';
import * as authActions from '../../store/modules/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from '../../lib/storage';

class UserButtonContainer extends Component {

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
    const { visible } = this.props;
    const { handleLogout } = this;
    if(!visible) return null;
    return(
      <UserMenu 
        onLogout={handleLogout}
      />
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['userMenu']),
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(UserButtonContainer);