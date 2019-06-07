import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as OrderAPI from '../../lib/api/order';
import { finished } from 'stream';

const CHANGE_INPUT = 'order/changeInput';
const VIEW_CHANGE = 'order/viewChange';
const IMG_TEXT_VIEW_CHANGE = 'order/imgTextViewChange';
const GET_ALL_ORDER = 'order/getAllOrder';
const GET_ORDER_BY_ID = 'order/getOrderById';
const POST_ORDER = 'order/postOrder';
const PATCH_ORDER = 'order/patchOrder';
const PATCH_IMG = 'order/patchImg';
const REMOVE_IMG = 'order/removeImg';

export const changeInput = createAction(CHANGE_INPUT);
export const viewChange = createAction(VIEW_CHANGE);
export const imgTextViewChange = createAction(IMG_TEXT_VIEW_CHANGE);
export const getAllOrder = createAction(GET_ALL_ORDER, OrderAPI.getAllOrder);
export const getOrderById = createAction(GET_ORDER_BY_ID, OrderAPI.getOrderById);
export const postOrder = createAction(POST_ORDER, OrderAPI.postOrder);
export const patchOrder = createAction(PATCH_ORDER, OrderAPI.patchOrder);
export const patchImg = createAction(PATCH_IMG, OrderAPI.patchImg);
export const removeImg = createAction(REMOVE_IMG, OrderAPI.removeImg);

const initialState = Map({
  view: "ordered",
  imgTextView: false,
  allOrders: List([]),
  orderById: Map({
  })
});

export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.setIn(['postForm', name], value);
  },
  [VIEW_CHANGE]: (state, action) => {
    return state.set('view', action.payload)
  },
  [IMG_TEXT_VIEW_CHANGE]: (state, action) => {
    return state.set('imgTextView', action.payload);
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
    onSuccess: (state, action) => {
      const images = List(state.getIn(['orderById', 'images']))
      return state.setIn(['orderById', 'images'], List(images.concat(action.payload.data)))
    }
  }),
  ...pender({
    type: REMOVE_IMG,
    onSuccess: (state, action) => {
      const images = List(state.getIn(['orderById', 'images']))
      return state.setIn(['orderById', 'images'], images.delete(images.indexOf(`/img/${action.payload.data}`)))
    }
  })
}, initialState);