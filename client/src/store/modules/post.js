import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as PostAPI from '../../lib/api/post';

const CHANGE_INPUT = 'post/CHANGE_INPUT';
const GET_All_POST = 'post/GET_All_POST';
const GET_POST_BY_ID = 'post/GET_POST_BY_ID';
const POST = 'post/POST';
const POST_IMG = 'post/POST_IMG';

export const changeInput = createAction(CHANGE_INPUT);
export const getAllPost = createAction(GET_All_POST, PostAPI.getAllPost);
export const getPostById = createAction(GET_POST_BY_ID, PostAPI.getPostById);
export const post = createAction(POST, PostAPI.post);
export const postImg = createAction(POST_IMG, PostAPI.postImg);

const initialState = Map({
  allPosts: List([]),
  postForm: Map({}),
  postById: Map({})
});

export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.setIn(['postForm', name], value);
  },
  ...pender({
    type: GET_All_POST,
    onSuccess: (state, action) => state.set('allPosts', List(action.payload.data)) 
  }),
  ...pender({
    type: GET_POST_BY_ID,
    onSuccess: (state, action) => state.set('postById', Map(action.payload.data))
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