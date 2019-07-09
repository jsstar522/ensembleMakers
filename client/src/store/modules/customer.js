import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as CustomerAPI from '../../lib/api/customer';

const CHANGE_INPUT = 'customer/CHANGE_INPUT';
const GET_ALL_CUSTOMER_INFO = 'customer/GET_ALL_CUSTOMER_INFO';
const GET_CUSTOMER_INFO_BY_ID = 'customer/GET_CUSTOMER_INFO_BY_ID';
const GET_CUSTOMER_INFO_BY_MAKER_ID = 'customer/GET_CUSTOMER_INFO_BY_MAKER_ID';
const POST_CUSTOMER_INFO = 'customer/POST_CUSTOMER_INFO';
const CHANGE_STATE = 'customer/CHANGE_STATE';

export const changeInput = createAction(CHANGE_INPUT);
export const getAllCustomerInfo = createAction(GET_ALL_CUSTOMER_INFO, CustomerAPI.getAllCustomerInfo);
// getCustomerInfoById
// 꼭 axios로 GET요청을 실행해야하는가?
// 이미 List Component에 customer 정보가 다 조회되어 있고 allCustomers state로 들어가 있다.
export const getCustomerInfoById = createAction(GET_CUSTOMER_INFO_BY_ID, CustomerAPI.getCustomerInfoById);
export const getCustomerInfoByMakerId = createAction(GET_CUSTOMER_INFO_BY_MAKER_ID, CustomerAPI.getCustomerInfoByMakerId);
export const postCustomerInfo = createAction(POST_CUSTOMER_INFO, CustomerAPI.postCustomerInfo);
export const changeState = createAction(CHANGE_STATE, CustomerAPI.changeState);

const initialState = Map({
  allCustomers: List([
    Map({})
  ]),
  customerById: Map({}),
  postForm: Map({})
});

export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.setIn(['postForm', name], value);
  },
  ...pender({
    type: GET_ALL_CUSTOMER_INFO,
    onSuccess: (state, action) => state.set('allCustomers', List(action.payload.data))
  }),
  ...pender({
    type: GET_CUSTOMER_INFO_BY_ID,
    onSuccess: (state, action) => state.set('customerById', Map(action.payload.data))
  }),
  ...pender({
    type: GET_CUSTOMER_INFO_BY_MAKER_ID,
    onSuccess: (state, action) => state.set('allCustomers', List(action.payload.data))
  }),
  ...pender({
    type: POST_CUSTOMER_INFO,
    onSuccess: (state, action) => state.set('postForm', Map(action.payload.data))
  }),
  ...pender({
    type: CHANGE_STATE,
    onSuccess: (state, action) => {
      const allCustomers = state.get('allCustomers');
      const index = allCustomers.findIndex(customer => customer._id === state.getIn(['customerById', '_id']));
      return state.setIn(['allCustomers', index, 'state'], action.payload.data.state);
    }
  })
}, initialState);