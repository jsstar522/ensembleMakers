import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as OrderAPI from '../../lib/api/order';

const CHANGE_INPUT = 'order/changeInput';
const VIEW_CHANGE = 'order/viewChange';
const DETAIL_VIEW_CHANGE = 'order/detailViewChange'
const IMG_TEXT_VIEW_CHANGE = 'order/imgTextViewChange';
const ORDER_INIT = 'order/orderInit';
const GET_ALL_ORDER = 'order/getAllOrder';
const GET_ORDER_BY_ID = 'order/getOrderById';
const GET_ORDER_BY_NUM = 'order/getOrderByNum';
const POST_ORDER = 'order/postOrder';
const PATCH_ORDER = 'order/patchOrder';
const PATCH_IMG = 'order/patchImg';
const REMOVE_IMG = 'order/removeImg';
const PATCH_PROCESSING = 'order/patchProcessing';
const DELETE_PROCESSING = 'order/deleteProcessing';
const CHANGE_PROCESSING_STATE = 'order/changeProcessingState';

export const changeInput = createAction(CHANGE_INPUT);
export const viewChange = createAction(VIEW_CHANGE);
export const detailViewChange = createAction(DETAIL_VIEW_CHANGE);
export const imgTextViewChange = createAction(IMG_TEXT_VIEW_CHANGE);
export const orderInit = createAction(ORDER_INIT);
export const getAllOrder = createAction(GET_ALL_ORDER, OrderAPI.getAllOrder);
export const getOrderById = createAction(GET_ORDER_BY_ID, OrderAPI.getOrderById);
export const getOrderByNum = createAction(GET_ORDER_BY_NUM, OrderAPI.getOrderByNum);
export const postOrder = createAction(POST_ORDER, OrderAPI.postOrder);
export const patchOrder = createAction(PATCH_ORDER, OrderAPI.patchOrder);
export const patchImg = createAction(PATCH_IMG, OrderAPI.patchImg);
export const removeImg = createAction(REMOVE_IMG, OrderAPI.removeImg);
export const patchProcessing = createAction(PATCH_PROCESSING, OrderAPI.patchProcessing);
export const deleteProcessing = createAction(DELETE_PROCESSING, OrderAPI.deleteProcessing);
export const changeProcessingState = createAction(CHANGE_PROCESSING_STATE, OrderAPI.changeProcessingState);

const initialState = Map({
  view: "ordered",
  detailView: false,
  imgTextView: false,
  allOrders: List([]),
  orderById: Map({})
});

export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.setIn(['postForm', name], value);
  },
  [VIEW_CHANGE]: (state, action) => {
    return state.set('view', action.payload)
  },
  [DETAIL_VIEW_CHANGE]: (state, action) => {
    return state.set('detailView', action.payload)
  },
  [IMG_TEXT_VIEW_CHANGE]: (state, action) => {
    return state.set('imgTextView', action.payload);
  },
  [ORDER_INIT]: (state, action) => {
    return state.set('orderById', Map({}))
  },
  ...pender({
    type: GET_ALL_ORDER,
    onSuccess: (state, action) => state.set('allOrders', List(action.payload.data))
  }),
  ...pender({
    type: GET_ORDER_BY_ID,
    onSuccess: (state, action) => {
      return state.set('orderById', Map(action.payload.data))
  }
  }),
  ...pender({
    type: GET_ORDER_BY_NUM,
    onSuccess: (state, action) => {
      return state.set('orderById', Map(action.payload.data))
  }
  }),
  ...pender({
    type: POST_ORDER,
    onSuccess: (state, action) => state.set('orderById', Map(action.payload.data)
    )
  }),
  ...pender({
    type: PATCH_ORDER,
    onSuccess: (state, action) => state.set('orderById', Map(action.payload.data))
  }),
  ...pender({
    type: PATCH_IMG,
    onSuccess: (state, action) => {
      const images = List(state.getIn(['orderById', 'images']));
      return state.setIn(['orderById', 'images'], List(images.concat(action.payload.data)))
    }
  }),
  ...pender({
    type: REMOVE_IMG,
    onSuccess: (state, action) => {
      const images = List(state.getIn(['orderById', 'images']));
      return state.setIn(['orderById', 'images'], images.delete(images.indexOf(`/img/${action.payload.data}`)))
    }
  }),
  ...pender({
    type: PATCH_PROCESSING,
    onSuccess: (state, action) => {
      const processing = action.payload.data.processing;
      return state.setIn(['orderById', processing], action.payload.data.date)
    }
  }),
  ...pender({
    type: DELETE_PROCESSING,
    onSuccess: (state, action) => {
      const processing = action.payload.data;
      return state.setIn(['orderById', processing], null)
    }
  }),
  ...pender({
    type: CHANGE_PROCESSING_STATE,
    onSuccess: (state, action) => {
      const processingState = action.payload.data.processingState;
      return state.setIn(['orderById', 'processingState'], processingState)
    }
  })
}, initialState);
