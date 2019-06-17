import axios from 'axios';

export const getReviewByNum = (id) => axios.get('/api/reviews/'+id);
export const getReviewByCustomerId = (id) => axios.get('/api/reviews/customer/'+id);
export const postReview = (data) => axios.post('/api/reviews', data);
export const patchReview = ({id, data}) => axios.patch('/api/reviews/'+id, data)