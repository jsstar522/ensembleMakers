import axios from 'axios';

export const getOrderTemplateByNum = (userNumber) => axios.get('/api/orderTemplates/byNum/'+userNumber);
export const postOrderTemplate = ({userId, userNumber}) => axios.post('/api/orderTemplates', {userId, userNumber})