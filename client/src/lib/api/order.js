import axios from 'axios';

export const getAllOrder = () => axios.get('/api/order');
export const getOrderById = (id) => axios.get('/api/order/'+id);
export const postOrder = ({customerId}) => axios.post('/api/order', {customerId});