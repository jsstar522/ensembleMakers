import axios from 'axios';

export const localRegister = (user) => axios.post('/api/auth/register', user);
export const localLogin = ({email, password}) => axios.post('/api/auth/login', {email, password});
export const checkStatus = () => axios.get('/api/auth/check');
export const logout = () => axios.get('/api/auth/logout');