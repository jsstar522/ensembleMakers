import axios from 'axios';

export const localRegister = (user) => axios.post('/auth/register', user);
export const localLogin = ({email, password}) => axios.post('/auth/login', {email, password});
export const checkStatus = () => axios.get('/auth/check');
export const logout = () => axios.get('/auth/logout');