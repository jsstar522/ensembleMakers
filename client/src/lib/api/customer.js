import axios from 'axios';

export const getAllCustomerInfo = () => axios.get('/api/customer');
export const getCustomerInfoById = (id) => axios.get('/api/customer/'+id)
export const postCustomerInfo = ({name, phone, address}) => axios.post('/api/customer', {name, phone, address});
export const changeState = ({id, state}) => axios.patch('/api/customer/'+id, {state});
