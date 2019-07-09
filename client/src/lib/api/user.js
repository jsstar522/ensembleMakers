import axios from 'axios';

export const getUserByNum = (userNumber) => axios.get('/api/users/searchByNum/'+userNumber);
export const getUserByCompany = (companyName) => axios.get('/api/users/searchByCompany', { params : companyName });