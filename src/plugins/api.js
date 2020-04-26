import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/server'

export const login = data => axios.post('/user/auth', data)

export const getRaceList = () => axios.get('/race/list')

export const getUserList = () => axios.get('/user/list')
