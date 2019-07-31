import axios from 'axios';

export const getModelsByMakerId = (id) => axios.get('/api/models/byId/'+id)
export const postModel = (formData) => axios.post('/api/models/', formData)
export const patchModel = ({id, contents}) => axios.patch('/api/models/'+id, contents)
