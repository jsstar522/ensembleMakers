import axios from 'axios';

export const getOrderTemplateById = (userId) => axios.get('/api/orderTemplates/byId/'+userId)
export const getOrderTemplateByNum = (userNumber) => axios.get('/api/orderTemplates/byNum/'+userNumber);
export const postOrderTemplate = ({userId, userNumber}) => axios.post('/api/orderTemplates', {userId, userNumber})
export const patchOrderTemplate = ({userId, template}) => axios.patch('/api/orderTemplates/byId/'+userId, template)