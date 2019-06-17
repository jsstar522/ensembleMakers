import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import post from './post';
import customer from './customer';
import order from './order';
import modal from './modal';
import review from './review';
import { penderReducer } from 'redux-pender';
import { sessionReducer } from 'redux-react-session';

export default combineReducers({
    base,
    auth,
    user,
    post,
    customer,
    order,
    modal,
    review,
    pender: penderReducer,
    session: sessionReducer
});