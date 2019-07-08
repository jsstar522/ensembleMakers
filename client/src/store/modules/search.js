import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as UserAPI from '../../lib/api/user';

const CHANGE_INPUT = 'search/CHANGE_INPUT';
const SEARCH_COMPANY = 'search/SEARCH_COMPANY';

export const changeInput = createAction(CHANGE_INPUT);
export const searchCompany = createAction(SEARCH_COMPANY, UserAPI.getUserByCompany);

const initialState = Map({
  keyword: '',
  searchList: List([])
})

export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { value } = action.payload;
    return state.set('keyword', value);
  },
  ...pender({
    type: SEARCH_COMPANY,
    onSuccess: (state, action) => {
      return state.set('searchList', List(action.payload.data));
    }
  })
}, initialState);

