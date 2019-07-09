import axios from 'axios';

export const getAllCustomerInfo = () => axios.get('/api/customers');
export const getCustomerInfoById = (id) => axios.get('/api/customers/'+id)
export const getCustomerInfoByMakerId = (id) => axios.get('/api/customers/byMakerId/'+id)
export const postCustomerInfo = ({name, phone, address, makerId}) => axios.post('/api/customers', {name, phone, address, makerId});
export const changeState = ({id, state}) => axios.patch('/api/customers/changeState/'+id, {state});
