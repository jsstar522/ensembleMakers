import axios from 'axios';

export const getModelsByMakerId = (id) => axios.get('/api/models/byId/'+id)
export const getModelByModelName = (name) => axios.get('/api/models/byName/'+name)
export const postModel = (formData) => axios.post('/api/models/', formData)
export const patchModel = ({id, contents}) => axios.patch('/api/models/'+id, contents)
export const deleteModel = ({id, modelImage, index}) => axios.delete('/api/models/'+id, { data: { modelImage: modelImage, index: index}})
export const patchModelImg = ({id, formData}) => axios.patch('/api/models/modelImg/'+id, formData)
export const removeModelImg = ({id, preImgName}) => axios.delete('/api/models/modelImg/'+id, { data: { preImgName: preImgName }});
