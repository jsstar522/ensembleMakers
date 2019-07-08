import axios from 'axios';

export const getAllCustomerInfo = () => axios.get('/api/customers');
export const getCustomerInfoById = (id) => axios.get('/api/customers/'+id)
export const postCustomerInfo = ({name, phone, address}) => axios.post('/api/customers', {name, phone, address});
export const changeState = ({id, state}) => axios.patch('/api/customers/'+id, {state});
