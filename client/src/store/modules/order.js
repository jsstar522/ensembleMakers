import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as OrderAPI from '../../lib/api/order';

const CHANGE_INPUT = 'order/changeInput';
const GET_ALL_ORDER = 'order/getAllOrder';
const GET_ORDER_BY_ID = 'order/getOrderById';
const POST_ORDER = 'order/postOrder';

export const changeInput = createAction(CHANGE_INPUT);
export const getAllOrder = createAction(GET_ALL_ORDER, OrderAPI.getAllOrder);
export const getOrderById = createAction(GET_ORDER_BY_ID, OrderAPI.getOrderById);
export const postOrder = createAction(POST_ORDER, OrderAPI.postOrder);

const initialState = Map({
  allOrders: List([]),
  orderById: Map({}),
  postForm: Map({})
});

export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.setIn(['postForm', name], value);
  },
  ...pender({
    type: GET_ALL_ORDER,
    onSuccess: (state, action) => state.set('allOrders', List(action.payload.data))
  }),
  ...pender({
    type: GET_ORDER_BY_ID,
    onSuccess: (state, action) => {
      // mode = 편집모드ONOFF (모달ONOFF)
      action.payload.data.mode = "visible";
      return state.set('orderById', Map(action.payload.data))
  }
  }),
  ...pender({
    type: POST_ORDER,
    onSuccess: (state, action) => state.set('postForm', Map(action.payload.data)
    )})
}, initialState);