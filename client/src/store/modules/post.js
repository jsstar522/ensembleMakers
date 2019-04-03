import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as PostAPI from '../../lib/api/post';

const CHANGE_INPUT = 'post/changeInput';
const GET_All_POST = 'post/GET_All_POST';
const POST = 'post/POST';
const POST_IMG = 'post/postImg';

export const changeInput = createAction(CHANGE_INPUT);
export const getAllPost = createAction(GET_All_POST, PostAPI.getAllPost);
export const post = createAction(POST, PostAPI.post);
export const postImg = createAction(POST_IMG, PostAPI.postImg);

const initialState = Map({
  allPost: List(),
  postForm: Map({})
});

export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.setIn(['postForm', name], value);
  },
  ...pender({
    type: GET_All_POST,
    onSuccess: (state, action) => state.push('allPost', Map(action.payload.data))
  }),
  ...pender({
    type: POST,
    onSuccess: (state, action) => state.set('postForm', Map(action.payload.data))
  }),
  ...pender({
    type: POST_IMG,
    onSuccess: (state, action) => state.setIn(['postForm', 'images'], action.payload.data)
  })
}, initialState);