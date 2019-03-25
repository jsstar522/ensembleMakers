import React, { Component } from 'react';
import { UserMenu } from '../../components/Base/UserMenu';
import * as userActions from '../../store/modules/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from '../../lib/storage';

class UserButtonContainer extends Component {

  handleLogout = async () => {
    const { UserActions } = this.props;
    try {
        await UserActions.logout();
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
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(UserButtonContainer);