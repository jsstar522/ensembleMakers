import axios from 'axios';

export const getAllOrder = () => axios.get('/api/orders');
export const getOrderById = (id) => axios.get('/api/orders/'+id);
export const getOrderByNum = (id) => axios.get('/api/orders/byNum/'+id);
export const getOrdersByMakerId = (id) => axios.get('/api/orders/byMakerId/'+id);
export const postOrder = ({customerInfo, makerId, contents, modelImage}) => axios.post('/api/orders', {customerInfo, makerId, contents, modelImage});
export const patchOrder = ({id, contents}) => axios.patch('/api/orders/'+id, contents);
export const deleteOrder = ({id, modelImage, index}) => axios.delete('/api/orders/'+id, { data: { modelImage: modelImage, index: index}})
export const patchImg = ({id, formData}) => axios.patch('/api/orders/img/'+id, formData);
export const removeImg = ({id, imgName}) => axios.delete('/api/orders/img/'+id, { data: { imgName: imgName }});
export const patchModelImg = ({id, formData}) => axios.patch('/api/orders/modelImg/'+id, formData)
export const removeModelImg = ({id, preImgName}) => axios.delete('/api/orders/modelImg/'+id, { data: { preImgName: preImgName }});
export const patchProcessing = ({id, processing}) => axios.patch('/api/orders/processingDate/'+id+'/'+processing);
export const deleteProcessing = ({id, processing}) => axios.delete('/api/orders/processingDate/'+id+'/'+processing)
export const changeState = ({id, state}) => axios.patch('/api/orders/changeState/'+id, {state});
export const changeProcessingState = ({id, processingState}) => axios.patch('/api/orders/processingState/'+id+'/'+processingState);