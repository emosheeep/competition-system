import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/server'
// axios.defaults.baseURL = 'http://www.biubiubius.com:3000/server'

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
export const getRaceList = () => axios.get('/race/list')
export const addRace = data => axios.post('/race/add', data)
export const updateRace = (id, data) => axios.put('/race/update', { id, data })
export const deleteRace = id => {
  return axios.delete('/race/delete', { data: { id } })
}

/**
 * 参赛记录
 */
export const getRecordList = () => axios.get('/record/list')
export const addRecord = data => axios.post('/record/add', data)
export const updateRecord = (id, data) => axios.put('/record/update', { id, data })
export const deleteRecord = id => {
  return axios.delete('/record/delete', { data: { id } })
}
