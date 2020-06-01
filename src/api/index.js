import axios from './axios'

/**
 * 用户
 */
export const login = data => axios.post('/user/login', data)
export const getUserList = type => axios.get('/user/list', { params: { type } })
export const addUser = (type, data) => axios.post('/user/add', { type, data })
export const deleteUser = (type, account) => {
  return axios.delete('/user/delete', { data: { type, account } })
}
export const updateUser = (type, data) => {
  return axios.put('/user/update', { type, data })
}

/**
 * 赛事
 */
export const getRaceList = params => axios.get('/race/list', { params })
export const addRace = data => axios.post('/race/add', data)
export const updateRace = data => axios.put('/race/update', data)
export const deleteRace = _id => {
  return axios.delete('/race/delete', { data: { _id } })
}

/**
 * 参赛记录
 */
export const getRecordList = params => axios.get('/record/list', { params })
export const addRecord = data => axios.post('/record/add', data)
export const updateRecord = record => axios.patch('/record/update', record)
export const deleteRecord = _id => {
  return axios.delete('/record/delete', { data: { _id } })
}
export const getToken = params => axios.get('/record/auth', { params })
export const getFileInfo = params => axios.get('/record/file', { params })
export const getDownloadUrl = params => axios.get('/record/download', { params })
export const fresh = params => axios.get('/record/fresh', { params })
