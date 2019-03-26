import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';
import * as PostAPI from '../../lib/api/post';

const CHANGE_INPUT = 'post/changeInput';
const POST = 'post/POST';

export const changeInput = createAction(CHANGE_INPUT);
export const post = createAction(POST, PostAPI.post);

const initialState = Map({
  form: Map({})
});

export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.setIn(['form', name], value);
  },
  ...pender({
    type: POST,
    onSuccess: (state, action) => state.set('post', Map(action.payload.data))
  })
}, initialState);