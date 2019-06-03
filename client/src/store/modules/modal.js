import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';

import * as PostAPI from '../../lib/api/post';

const SHOW = 'modal/show';
const HIDE = 'modal/hide';
const CHANGE = 'modal/change';
const IMAGE_CHANGE = 'modal/imageChange';
const IMAGE_INIT = 'modal/imageInit';
const IMAGE_URL = 'modal/imageURL';
const IMAGE_URL_INIT = 'modal/imageURLInit';

export const show = createAction(SHOW);
export const hide = createAction(HIDE);
export const change = createAction(CHANGE);
export const imageChange = createAction(IMAGE_CHANGE);
export const imageInit = createAction(IMAGE_INIT);
export const imageURL = createAction(IMAGE_URL);
export const imageURLInit = createAction(IMAGE_URL_INIT);

const initialState = Map({
  visible: false,
  modalContents: Map({}),
  // images: List([]),
  images: List([]),
  imageURLs: List([])
});

export default handleActions({
  [SHOW]: (state, action) => {
    return state.set('visible', action.payload.visible)
                .set('modalContents', Map(action.payload.modalContents))
                // formData 초기화
  },
  [HIDE]: (state, action) => {
    return state.set('visible', false)
  },
  [CHANGE]: (state, action) => {
    const { name, value } = action.payload;
    return state.setIn(['modalContents', name], value)
  },
  [IMAGE_CHANGE]: (state, action) => {
    const images = state.get('images')
    return state.set('images', images.push(action.payload))
  },
  [IMAGE_INIT]: (state, action) => {
    return state.set('images', List([]))
  },
  [IMAGE_URL]: (state, action) => {
    const list = state.get('imageURLs');
    return state.set('imageURLs', list.push(action.payload))
  },
  [IMAGE_URL_INIT]: (state, action) => {
    return state.set('imageURLs', List([]))
  },
}, initialState)