import axios from 'axios';

export const post = (post) => axios.post('/posts', post);