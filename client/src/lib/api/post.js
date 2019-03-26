import axios from 'axios';

export const post = ({ title, description, images, kinds, totalQuantity, price }) => axios.post('/api/posts', { title, description, images, kinds, totalQuantity, price });