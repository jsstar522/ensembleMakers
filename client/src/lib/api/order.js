import axios from 'axios';

export const getAllOrder = () => axios.get('/api/order');
export const getOrderById = (id) => axios.get('/api/order/'+id);
export const postOrder = ({customerId}) => axios.post('/api/order', {customerId});
export const patchOrder = ({id, contents}) => axios.patch('/api/order/'+id, contents);
export const patchImg = ({id, formData}) => axios.patch('/api/order/img/'+id, formData);