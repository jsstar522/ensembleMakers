import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth, Post, Product, CustomerInfoPost, OrderManage } from './pages';
import { HeaderContainer } from './containers/Base';
import { UserMenuContainer } from './containers/Base';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from './store/modules/user';

import storage from './lib/storage';

class App extends Component {

    initializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo');
        // console.log(storage.get('loggedInfo'));
        if(!loggedInfo) return;
        
        const { UserActions } = this.props;
        UserActions.setLoggedInfo(loggedInfo);
        try{
            await UserActions.checkStatus();
        }catch(e){
            storage.remove('loggedInfo');
            window.location.href = '/auth/login?expired';
        }
    }

    componentDidMount(){
        this.initializeUserInfo()
    };

    render() {
        return (
            <div>
                <HeaderContainer/>
                <UserMenuContainer/>
                <Route exact path="/" component={Home}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/post" component={Post}/>
                <Route path="/product" component={Product}/>
                <Route path="/customerInfo" component={CustomerInfoPost}/>
                <Route path="/orderManage" component={OrderManage}/>
            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(App);