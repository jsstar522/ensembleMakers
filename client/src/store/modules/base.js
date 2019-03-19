import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY'; // 헤더 렌더링 여부 설정
const SHOW_USER_MENU = 'base/SHOW_USER_MENU'; // 유저 메뉴 보이기

export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY); // visible
export const showUserMenu = createAction(SHOW_USER_MENU);

const initialState = Map({
    header: Map({
        visible: true
    }),
    userMenu: false,
});

export default handleActions({
    [SET_HEADER_VISIBILITY]: (state, action) => state.setIn(['header', 'visible'], action.payload),
    [SHOW_USER_MENU]: (state, action) => state.setIn(['userMenu'], action.payload)
}, initialState);