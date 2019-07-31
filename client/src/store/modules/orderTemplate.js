import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as OrderTemplateAPI from '../../lib/api/orderTemplate';

const GET_ORDER_TEMPLATE_BY_ID = 'orderTemplate/GET_ORDER_TEMPLATE_BY_ID';
const GET_ORDER_TEMPLATE_BY_NUM = 'orderTemplate/GET_ORDER_TEMPLATE_BY_NUM';
const POST_ORDER_TEMPLATE = 'orderTemplate/POST_ORDER_TEMPLATE';
const PATCH_ORDER_TEMPLATE = 'orderTemplate/PATCH_ORDER_TEMPLATE';

export const getOrderTemplateById = createAction(GET_ORDER_TEMPLATE_BY_ID, OrderTemplateAPI.getOrderTemplateById);
export const getOrderTemplateByNum = createAction(GET_ORDER_TEMPLATE_BY_NUM, OrderTemplateAPI.getOrderTemplateByNum);
export const postOrderTemplate = createAction(POST_ORDER_TEMPLATE, OrderTemplateAPI.postOrderTemplate);
export const patchOrderTemplate = createAction(PATCH_ORDER_TEMPLATE, OrderTemplateAPI.patchOrderTemplate);

const initialState = Map({
  template: List([])
});

export default handleActions({
  ...pender({
    type: GET_ORDER_TEMPLATE_BY_ID,
    onSuccess: (state, action) => {
      return state.set('template', List(action.payload.data.template))
    }
  }),
  ...pender({
    type: GET_ORDER_TEMPLATE_BY_NUM,
    onSuccess: (state, action) => {
      return state.set('template', List(action.payload.data.template))
    }
  }),
  ...pender({
    type: POST_ORDER_TEMPLATE,
    onSuccess: (state, action) => {
      console.log(action.payload.data)
    }
  }),
  ...pender({
    type: PATCH_ORDER_TEMPLATE,
    onSuccess: (state, action) => {
      console.log(action.payload.data)
    }
  })
}, initialState);