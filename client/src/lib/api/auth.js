import axios from 'axios';

export const checkEmailExists = (email) => axios.get('/auth/exists/email/' + email);
export const checkUsernameExists = (username) => axios.get('/auth/exists/username/' + username);

export const localRegister = (user) => axios.post('/auth/register', user);
export const localLogin = ({email, password}) => axios.post('/auth/login', {email, password});

export const checkStatus = () => axios.get('/auth/check');
export const logout = () => axios.get('/auth/logout');