import axios from 'axios';

export const getAllOrder = () => axios.get('/api/orders');
export const getOrderById = (id) => axios.get('/api/orders/'+id);
export const getOrderByNum = (id) => axios.get('/api/orders/byNum/'+id);
export const postOrder = ({customerId}) => axios.post('/api/orders', {customerId});
export const patchOrder = ({id, contents}) => axios.patch('/api/orders/'+id, contents);
export const patchImg = ({id, formData}) => axios.patch('/api/orders/img/'+id, formData);
export const removeImg = ({id, imgName}) => axios.delete('/api/orders/img/'+id, { data: { imgName: imgName }});
export const patchProcessing = ({id, processing}) => axios.patch('/api/orders/processingDate/'+id+'/'+processing);
export const deleteProcessing = ({id, processing}) => axios.delete('/api/orders/processingDate/'+id+'/'+processing)
export const changeProcessingState = ({id, processingState}) => axios.patch('/api/orders/processingState/'+id+'/'+processingState);