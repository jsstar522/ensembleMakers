import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';

import { AuthWrapper } from '../components/Auth/AuthWrapper';
import { LoginContainer, RegisterContainer } from '../containers/Auth';
import { CompanySearchModalContainer } from '../containers/CompanySearchModal';
import * as baseActions from '../store/modules/base';
import { stat } from 'fs';

class Login extends Component {
    // 페이지에 진입 할 때 헤더를 비활성화
    componentWillMount() {
        this.props.BaseActions.setHeaderVisibility(false);
    }

    // 페이지에서 벗어 날 때 다시 활성화
    componentWillUnmount() {
        this.props.BaseActions.setHeaderVisibility(true);
    }

    render() {
        const { logged } = this.props;
        return (
            <div>
                <AuthWrapper>
                    <Route path="/login/signin" component={LoginContainer}/>
                    <Route path="/login/signup" component={RegisterContainer}/>
                </AuthWrapper>
                <CompanySearchModalContainer/>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        logged: state.user.get('logged')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Login);