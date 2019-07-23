import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';

const SHOW = 'modal/SHOW';
const HIDE = 'modal/HIDE';
const CHANGE = 'modal/CHANGE';
const CHANGE_ADD_MODE = 'modal/CHANGE_ADD_MODE';
const CHANGE_ADD_INPUT = 'modal/CHANGE_ADD_INPUT';
const ADD_LIST = 'modal/ADD_LIST';
const DELETE_LIST = 'modal/DELETE_LIST'
const CHANGE_IMAGE = 'modal/CHANGE_IMAGE';
const DELETE_IMAGE = 'modal/DELETE_IMAGE'
const INIT_IMAGE = 'modal/INIT_IMAGE';
const CHANGE_IMAGE_URL = 'modal/CHANGE_IMAGE_URL';
const DELETE_IMAGE_URL = 'modal/DELETE_IMAGE_URL'
const INIT_IMAGE_URL = 'modal/INIT_IMAGE_URL';

export const show = createAction(SHOW);
export const hide = createAction(HIDE);
export const change = createAction(CHANGE);
export const changeAddMode = createAction(CHANGE_ADD_MODE);
export const changeAddInput = createAction(CHANGE_ADD_INPUT);
export const addList = createAction(ADD_LIST);
export const deleteList = createAction(DELETE_LIST);
export const changeImage = createAction(CHANGE_IMAGE);
export const deleteImage = createAction(DELETE_IMAGE);
export const initImage = createAction(INIT_IMAGE);
export const changeImageURL = createAction(CHANGE_IMAGE_URL);
export const deleteImageURL = createAction(DELETE_IMAGE_URL);
export const initImageURL = createAction(INIT_IMAGE_URL);

const initialState = Map({
  // visible = image, editor, company
  visible: false,
  // add list
  addMode: false,
  addContent: '',
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
                // 초기화
                .set('modalContents', Map({}))
  },
  [CHANGE]: (state, action) => {
    const { name, value, kind } = action.payload;
    return state.setIn(['modalContents', 'contents', kind, name, 'value'], value)
  },
  [CHANGE_ADD_MODE]: (state, action) => {
    return state.set('addMode', action.payload)
  },
  [CHANGE_ADD_INPUT]: (state, action) => {
    return state.set('addContent', action.payload.value)
  },
  [ADD_LIST]: (state, action) => {
    let contents = List(state.getIn(['modalContents', 'contents', 'template']))
    return state.setIn(['modalContents', 'contents', 'template'], contents.push({"label": action.payload, "value": null}).toJS())
                .set('addContent', '')
  },
  [DELETE_LIST]: (state, action) => {
    const { id, kind } = action.payload;
    let contents = List(state.getIn(['modalContents', 'contents', kind]))
    return state.setIn(['modalContents', 'contents', kind], contents.delete(id).toJS())
  },
  [CHANGE_IMAGE]: (state, action) => {
    const images = state.get('images')
    return state.set('images', images.push(action.payload))
  },
  [DELETE_IMAGE]: (state, action) => {
    const images = state.get('images')
    return state.set('images', images.delete(action.payload))
  },
  [INIT_IMAGE]: (state, action) => {
    return state.set('images', List([]))
  },
  [CHANGE_IMAGE_URL]: (state, action) => {
    const imageURLs = state.get('imageURLs')
    return state.set('imageURLs', imageURLs.push(action.payload))
  },
  [DELETE_IMAGE_URL]: (state, action) => {
    const imageURLs = state.get('imageURLs')
    return state.set('imageURLs', imageURLs.delete(action.payload))
  },
  [INIT_IMAGE_URL]: (state, action) => {
    return state.set('imageURLs', List([]))
  }
}, initialState)