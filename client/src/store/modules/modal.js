import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';

const SHOW = 'modal/SHOW';
const HIDE = 'modal/HIDE';
const CHANGE = 'modal/CHANGE';
const IMAGE_CHANGE = 'modal/IMAGE_CHANGE';
const IMAGE_DELETE = 'modal/IMAGE_DELETE'
const IMAGE_INIT = 'modal/IMAGE_INIT';
const IMAGE_URL_CHANGE = 'modal/IMAGE_URL_CHANGE';
const IMAGE_URL_DELETE = 'modal/IMAGE_URL_DELETE'
const IMAGE_URL_INIT = 'modal/IMAGE_URL_INIT';
const IMAGE_DB_DELETE = 'modal/IMAGE_DB_DELETE'

export const show = createAction(SHOW);
export const hide = createAction(HIDE);
export const change = createAction(CHANGE);
export const imageChange = createAction(IMAGE_CHANGE);
export const imageDelete = createAction(IMAGE_DELETE);
export const imageInit = createAction(IMAGE_INIT);
export const imageURLChange = createAction(IMAGE_URL_CHANGE);
export const imageURLInit = createAction(IMAGE_URL_INIT);
export const imageURLDelete = createAction(IMAGE_URL_DELETE);


const initialState = Map({
  // visible = image, editor, company
  visible: false,
  modalContents: Map({}),
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
    const { name, value, label } = action.payload;
    // console.log(value)
    // return state.setIn(['modalContents', name, 'value'], value)
    // TODO: 리스트 커스터마이징 작업
    return state.setIn(['modalContents', name], value)
  },
  [IMAGE_CHANGE]: (state, action) => {
    const images = state.get('images')
    return state.set('images', images.push(action.payload))
  },
  [IMAGE_DELETE]: (state, action) => {
    const images = state.get('images')
    return state.set('images', images.delete(action.payload))
  },
  [IMAGE_INIT]: (state, action) => {
    return state.set('images', List([]))
  },
  [IMAGE_URL_CHANGE]: (state, action) => {
    const imageURLs = state.get('imageURLs')
    return state.set('imageURLs', imageURLs.push(action.payload))
  },
  [IMAGE_URL_DELETE]: (state, action) => {
    const imageURLs = state.get('imageURLs')
    return state.set('imageURLs', imageURLs.delete(action.payload))
  },
  [IMAGE_URL_INIT]: (state, action) => {
    return state.set('imageURLs', List([]))
  }
}, initialState)