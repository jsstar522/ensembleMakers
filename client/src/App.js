import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, Post, Product, CustomerInfo, CustomerInfoSuccess, OrderManage, ModelManage, Order, Model } from './pages';
import { HeaderContainer } from './containers/Base';
import { UserMenuContainer } from './containers/Base';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from './store/modules/user';

import storage from './lib/storage';

class App extends Component {

    // 로그인 세션 종료
    initializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo');
        if(!loggedInfo) return;
        
        const { UserActions } = this.props;
        await UserActions.setLoggedInfo(loggedInfo);
        try{
            await UserActions.checkStatus();
        }catch(e){
            storage.remove('loggedInfo');
            window.location.href = '/login/signin?expired';
        }
    }

    // componentDidMount(){
    //     this.initializeUserInfo()
    // };
    constructor(props) {
        super(props);
        this.initializeUserInfo()
    }

    render() {
        return (
            <div>
                <HeaderContainer/>
                <UserMenuContainer/>
                <Route exact path="/" component={Home}/>
                <Route path="/order/:id" component={Order}/>
                <Route path="/login" component={Login}/>
                <Route path="/post" component={Post}/>
                <Route path="/product" component={Product}/>
                <Route path="/customerInfo/:id" component={CustomerInfo}/>
                <Route path="/customerInfoSuccess" component={CustomerInfoSuccess}/>
                <Route path="/orderManage" component={OrderManage}/>
                <Route path="/modelManage" component={ModelManage}/>
                <Route path="/model/:number/:name" component={Model}/>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        loggedInfo: state.user.get('loggedInfo')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(App);