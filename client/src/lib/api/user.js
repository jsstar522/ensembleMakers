import axios from 'axios';

export const getUserByNum = (userNumber) => axios.get('/api/users/byNum/'+userNumber);
export const getUserByCompany = (companyName) => axios.get('/api/users/byCompany', { params : companyName });