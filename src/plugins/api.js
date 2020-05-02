import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/server'

/**
 * 用户
 */
export const login = data => axios.post('/user/login', data)
export const getUserList = () => axios.get('/user/list')
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
