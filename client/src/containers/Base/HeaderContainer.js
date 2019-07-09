import React, { Component } from 'react';
import Header from '../../components/Base/Header';
import { LoginButton } from '../../components/Base/LoginButton';
import { UserButtonContainer } from '../../containers/Base';
import * as authActions from '../../store/modules/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from '../../lib/storage';


class HeaderContainer extends Component {
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

    render() {
        const { visible, user } = this.props;
        if(!visible) return null;

        return (
            <Header>
                { user.get('logged')
                    ? <UserButtonContainer/> : <LoginButton/>
                }
            </Header>
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),
        user: state.user,
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(HeaderContainer);