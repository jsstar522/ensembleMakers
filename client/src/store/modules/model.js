import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';

import * as ModelAPI from '../../lib/api/model';

const CHANGE_INFO_INPUT = 'model/CHANGE_INFO_INPUT';
const CHANGE_MODEL_INPUT = 'model/CHANGE_MODEL_INPUT';
const SET_MODEL_BY_ID = 'model/SET_MODEL_BY_ID';
const INIT_MODEL_BY_ID = 'model/INIT_MODEL_BY_ID';
const GET_MODELS_BY_MAKER_ID = 'model/GET_MODELS_BY_MAKER_ID';
const GET_MODEL_BY_MODEL_NAME = 'model/GET_MODEL_BY_MODEL_NAME';
const POST_MODEL = 'model/POST_MODEL';
const PATCH_MODEL = 'model/PATCH_MODEL';
const DELETE_MODEL = 'model/DELETE_MODEL';
const PATCH_MODEL_IMG = 'model/PATCH_MODEL_IMG';
const REMOVE_MODEL_IMG = 'model/REMOVE_MODEL_IMG';

export const changeInfoInput = createAction(CHANGE_INFO_INPUT)
export const changeModelInput = createAction(CHANGE_MODEL_INPUT)
export const setModelById = createAction(SET_MODEL_BY_ID);
export const initModelById = createAction(INIT_MODEL_BY_ID);
export const getModelsByMakerId = createAction(GET_MODELS_BY_MAKER_ID, ModelAPI.getModelsByMakerId);
export const getModelByModelName = createAction(GET_MODEL_BY_MODEL_NAME, ModelAPI.getModelByModelName);
export const postModel = createAction(POST_MODEL, ModelAPI.postModel);
export const patchModel = createAction(PATCH_MODEL, ModelAPI.patchModel);
export const deleteModel = createAction(DELETE_MODEL, ModelAPI.deleteModel);
export const patchModelImg = createAction(PATCH_MODEL_IMG, ModelAPI.patchModelImg);
export const removeModelImg = createAction(REMOVE_MODEL_IMG, ModelAPI.removeModelImg);

const initialState = Map({
  allModels: List([]),
  modelById: Map({}),
  postForm: Map({
    model: Map({}),
    customerInfo: Map({
      name: '',
      phone: '',
      address: ''
    })
  })
});

export default handleActions({
  [CHANGE_INFO_INPUT]: (state, action) => {
    const { name, value } = action.payload
    return state.setIn(['postForm', 'customerInfo', name], value)
  },
  [CHANGE_MODEL_INPUT]: (state, action) => {
    const { name, value, id } = action.payload
    return state.setIn(['postForm', 'model', 'contents', 'template', id, 'value'], value)
  },
  [SET_MODEL_BY_ID]: (state, action) => {
    return state.set('modelById', Map(action.payload))
  },
  [INIT_MODEL_BY_ID]: (state, action) => {
    return state.set('modelById', Map({}))
  },
  ...pender({
    type: GET_MODELS_BY_MAKER_ID,
    onSuccess: (state, action) => {
      return state.set('allModels', List(action.payload.data))
    }
  }),
  ...pender({
    type: GET_MODEL_BY_MODEL_NAME,
    onSuccess: (state, action) => {
      return state.setIn(['postForm', 'model'], action.payload.data)
    }
  }),
  ...pender({
    type: POST_MODEL,
    onSuccess: (state, action) => {
      let models = state.get('allModels')
      return state.set('allModels', List(models.push(action.payload.data)))
    }
  }),
  ...pender({
    type: PATCH_MODEL,
    onSuccess: (state, action) => {
      let models = state.get('allModels')
      let newModels = [];
      models.map(model => {
        if(model._id === action.payload.data.id) {
          model.contents = action.payload.data.contents;
          newModels.push(model)
        }else {
          newModels.push(model)
        }
      })
      return state.set('allModels', List(newModels))
    }
  }),
  ...pender({
    type: DELETE_MODEL,
    onSuccess: (state, action) => {
      let models = state.get('allModels')
      const newModels = models.delete(action.payload.data)
      return state.set('allModels', newModels)
    }
  }),
  ...pender({
    type: PATCH_MODEL_IMG,
    onSuccess: (state, action) => {
      let models = state.get('allModels');
      let newModels = [];
      models.map(model => {
        if(model._id === action.payload.data.id) {
          model.modelImage = action.payload.data.imgName;
          newModels.push(model)
        }else {
          newModels.push(model)
        }
      })
      return state.set('allModels', List(newModels))
    }
  }),
  ...pender({
    type: REMOVE_MODEL_IMG,
    onSuccess: (state, action) => {
      let models = state.get('allModels')
      let newModels = [];
      models.map(model => {
        if(model._id === action.payload.data.id) {
          model.modelImage = action.payload.data.imgName;
          newModels.push(model)
        }else {
          newModels.push(model)
        }
      })
      return state.set('allModels', List(newModels))
    }
  })
}, initialState);