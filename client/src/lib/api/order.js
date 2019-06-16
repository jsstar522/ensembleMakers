import axios from 'axios';

export const getAllOrder = () => axios.get('/api/order');
export const getOrderById = (id) => axios.get('/api/order/'+id);
export const postOrder = ({customerId}) => axios.post('/api/order', {customerId});
export const patchOrder = ({id, contents}) => axios.patch('/api/order/'+id, contents);
export const patchImg = ({id, formData}) => axios.patch('/api/order/img/'+id, formData);
export const removeImg = ({id, imgName}) => axios.delete('/api/order/img/'+id, { data: { imgName: imgName }});
export const patchProcessing = ({id, processing}) => axios.patch('/api/order/processingDate/'+id+'/'+processing);
export const deleteProcessing = ({id, processing}) => axios.delete('/api/order/processingDate/'+id+'/'+processing)
export const changeProcessingState = ({id, processingState}) => axios.patch('/api/order/processingState/'+id+'/'+processingState);