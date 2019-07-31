import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';

import * as ModelAPI from '../../lib/api/model';

const SET_MODEL_BY_ID = 'model/SET_MODEL_BY_ID';
const INIT_MODEL_BY_ID = 'model/INIT_MODEL_BY_ID';
const GET_MODELS_BY_MAKER_ID = 'model/GET_MODELS_BY_MAKER_ID';
const POST_MODEL = 'model/POST_MODEL';
const PATCH_MODEL = 'model/PATCH_MODEL';

export const setModelById = createAction(SET_MODEL_BY_ID);
export const initModelById = createAction(INIT_MODEL_BY_ID);
export const getModelsByMakerId = createAction(GET_MODELS_BY_MAKER_ID, ModelAPI.getModelsByMakerId);
export const postModel = createAction(POST_MODEL, ModelAPI.postModel);
export const patchModel = createAction(PATCH_MODEL, ModelAPI.patchModel);

const initialState = Map({
  allModels: List([]),
  modelById: Map({})
});

export default handleActions({
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
      let index;
      models.filter((v, i) => {
        if(v._id === action.payload.data.id){
          index = i;
        }
      })
      
      console.log(state.setIn(['allModels', index, 'contents'], action.payload.data.contents).toJS())
      
      // let newModels = state.setIn(['allModels', index, 'contents'], '')
      // console.log(newModels.toJS())
      
      return state.set('allModels', models)
    }    
    
  })
}, initialState);