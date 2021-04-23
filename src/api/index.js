import axios from './axios';

export const login = data => axios.post('/auth/login', data);
export const getAuthCode = () => axios.get('/auth/code');
export const getUserData = () => axios.get('/get_user');
/**
 * 用户
 */
export const getUserList = params => axios.get('/user/list', { params });
export const addUser = (type, data) => axios.post('/user/add', { type, data });
export const importUser = (type, data) => axios.post('/user/import', { type, data });
export const deleteUser = (type, data) => axios.delete('/user/delete', { data: { type, data } });
export const updateUser = (type, data) => axios.put('/user/update', { type, data });
export const updatePassword = data => axios.patch('/user/password', data);
export const resetPassword = data => axios.put('/user/reset', data);

/**
 * 赛事
 */
export const getRaceList = params => axios.get('/race/list', { params });
export const addRace = data => axios.post('/race/add', data);
export const updateRace = data => axios.put('/race/update', data);
export const deleteRace = data => axios.delete('/race/delete', { data });

/**
 * 参赛记录
 */
export const getRecordList = params => axios.get('/record/list', { params });
export const addRecord = data => axios.post('/record/add', data);
export const updateRecord = data => axios.patch('/record/update', data);
export const deleteRecord = data => axios.delete('/record/delete', { data });

/**
 * 权限
 */
export const getPermissions = params => axios.get('/permission/list', { params });
export const addPermission = data => axios.post('/permission/add', data);
export const updatePermission = data => axios.post('/permission/update', data);
export const deletePermission = data => axios.delete('/permission/delete', { data });

/**
 * 角色
 */
export const getRoles = params => axios.get('/role/list', { params });
export const addRole = data => axios.post('/role/add', data);
export const updateRole = data => axios.post('/role/update', data);
export const deleteRole = data => axios.delete('/role/delete', { data });
export const grantRole = data => axios.post('/role/grant', data);
