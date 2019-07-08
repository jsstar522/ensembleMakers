import axios from 'axios';

export const getUserByCompany = (companyName) => axios.get('/api/users/searchByCompany', { params : companyName });