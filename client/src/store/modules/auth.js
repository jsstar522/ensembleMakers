import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';
import * as AuthAPI from '../../lib/api/auth';

const CHANGE_INPUT = 'auth/CHANGE_INPUT'; // input 값 변경
const CHANGE_COMPANY_INPUT = 'auth/CHANGE_COMPANY_INPUT';
const CHANGE_KIND = 'auth/CHANGE_KIND';
const CHANGE_ROLE = 'auth/CHANGE_ROLE';
const CHANGE_GROUP = 'auth/CHANGE_GROUP';
const INITIALIZE_ROLE = 'auth/INITIALIZE_ROLE';  // role state 초기화
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER'; // 이메일 가입
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN'; // 이메일 로그인
const LOGOUT = 'auth/LOGOUT'; // 로그아웃
const SET_ERROR = 'auth/SET_ERROR'; // 오류 설정

export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const changeCompanyInput = createAction(CHANGE_COMPANY_INPUT);
export const changeKind = createAction(CHANGE_KIND);
export const changeRole = createAction(CHANGE_ROLE);
export const changeGroup = createAction(CHANGE_GROUP);
export const initializeRole = createAction(INITIALIZE_ROLE);
export const initializeForm = createAction(INITIALIZE_FORM); // form 
export const localRegister = createAction(LOCAL_REGISTER, AuthAPI.localRegister); // { email, username, password }
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin); // { email, password }
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const setError = createAction(SET_ERROR); // { form, message }

const initialState = Map({
    register: Map({
        form: Map({
            kind: 'general',
            role: '',
            email: '',
            username: '',
            password: '',
            passwordConfirm: '',
            company: Map({
                companyName: '',
                companyAddress: '',
                companyPhone: ''
            }),
            group: Map({
                grouped: '',
                groupId: ''
            })
        }),
        selectedGroup: Map({}),
        error: null,
    }),
    login: Map({
        form: Map({
            email: '',
            password: ''
        }),
        error: null
    }),
    result: Map({})
});

export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    [CHANGE_COMPANY_INPUT]: (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', 'company', name], value);
    },
    [CHANGE_KIND]: (state, action) => {
        const { form, kind } = action.payload;
        return state.setIn([form, 'form', 'kind'], kind)
                    .setIn([form, 'form', 'role'], 'manager'); // initailize
    },
    [CHANGE_ROLE]: (state, action) => {
        const { form, role } = action.payload;
        return state.setIn([form, 'form', 'role'], role);
    },
    [CHANGE_GROUP]: (state, action) => {
        const { form, grouped, groupId } = action.payload;
        const { allData } = action.payload;
        return state.setIn([form, 'form', 'group', 'grouped'], grouped)
                    .setIn([form, 'form', 'group', 'groupId'], groupId)
                    .setIn([form, 'selectedGroup'], Map(allData));
    },
    [INITIALIZE_ROLE]: (state, action) => {
        return state.setIn(['register', 'form', 'role'], '');
    },
    [INITIALIZE_FORM]: (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },
    [SET_ERROR]: (state, action) => {
        const { form, message } = action.payload;
        return state.setIn([form, 'error'], message);
    },
    ...pender({
        type: LOCAL_LOGIN,
        onSuccess: (state, action) => {
            return state.set('result', Map(action.payload.data))
        }
    }),
    ...pender({
        type: LOCAL_REGISTER,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
        type: LOGOUT,
        onSuccess: (state, action) => state.set('result', Map(''))
    }),
}, initialState);