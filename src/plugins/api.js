import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/server'

export const login = data => axios.post('/user/login', data)
export const getUserList = () => axios.get('/user/list')
export const addUser = (type, data) => axios.post('/user/add', { type, data })
export const deleteUser = (type, account) => {
  return axios.delete('/user/delete', { data: { type, account } })
}

export const getRaceList = () => axios.get('/race/list')
