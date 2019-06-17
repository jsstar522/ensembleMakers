import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as ReviewAPI from '../../lib/api/review';

const CHANGE_MODE = 'review/changeMode';
const CHANGE_INPUT = 'review/changeInput';
const CHANGE_RATING = 'review/changeRating';
const GET_REVIEW_BY_NUM = 'review/getReviewById';
const POST_REVIEW = 'review/postReview';
const PATCH_REVIEW = 'review/patchReview';

export const changeMode = createAction(CHANGE_MODE);
export const changeInput = createAction(CHANGE_INPUT);
export const getReviewByNum = createAction(GET_REVIEW_BY_NUM, ReviewAPI.getReviewByNum);
export const changeRating = createAction(CHANGE_RATING);
export const postReview = createAction(POST_REVIEW, ReviewAPI.postReview);
export const patchReview = createAction(PATCH_REVIEW, ReviewAPI.patchReview);

const initialState = Map({
  mode: 'read',
  data: Map({
    rating: -1,
    content: '',
  }),
})

export default handleActions({
  [CHANGE_MODE]: (state, action) => {
    return state.set('mode', action.payload);
  },
  [CHANGE_INPUT]: (state, action) => {
    const { value } = action.payload;
    return state.setIn(['data', 'content'], value);
  },
  [CHANGE_RATING]: (state, action) => {
    return state.setIn(['data', 'rating'], action.payload);
  },
  ...pender({
    type: GET_REVIEW_BY_NUM,
    onSuccess: (state, action) => {
      return action.payload.data && state.set('data', action.payload.data);
    }
  }),
  ...pender({
    type: POST_REVIEW,
    onSuccess: (state, action) => {
      return state.set('data', action.payload.data);
    }
  }),
  ...pender({
    type: PATCH_REVIEW,
    onSuccess: (state, action) => {
      return state.set('data', action.payload.data);
    }
  })

}, initialState);