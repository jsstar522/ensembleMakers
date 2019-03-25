import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';
import * as PostAPI from '../../lib/api/post';

const POST = 'post/POST';

export const post = createAction(POST, PostAPI.post);

const initialState = Map({
  post: Map({})
});

export default handleActions({
  ...pender({
    type: POST,
    onSuccess: (state, action) => state.set('post', Map(action.payload.data))
  })
}, initialState);