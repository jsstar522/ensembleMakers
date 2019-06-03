import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as OrderAPI from '../../lib/api/order';

const CHANGE_INPUT = 'order/changeInput';
const VIEW_CHANGE = 'order/viewChange';
const GET_ALL_ORDER = 'order/getAllOrder';
const GET_ORDER_BY_ID = 'order/getOrderById';
const POST_ORDER = 'order/postOrder';
const PATCH_ORDER = 'order/patchOrder';
const PATCH_IMG = 'order/patchImg';

export const changeInput = createAction(CHANGE_INPUT);
export const viewChange = createAction(VIEW_CHANGE);
export const getAllOrder = createAction(GET_ALL_ORDER, OrderAPI.getAllOrder);
export const getOrderById = createAction(GET_ORDER_BY_ID, OrderAPI.getOrderById);
export const postOrder = createAction(POST_ORDER, OrderAPI.postOrder);
export const patchOrder = createAction(PATCH_ORDER, OrderAPI.patchOrder);
export const patchImg = createAction(PATCH_IMG, OrderAPI.patchImg);

const initialState = Map({
  view: "ordered",
  allOrders: List([]),
  images: List([]),
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
    onSuccess: (state, action) => state.set('images', List(action.payload.data))
  })
}, initialState);