/**
 * mutations直接修改数据对象state，注意这里的方法必须是同步方法
 */
import {
  ADD_USER, DELETE_USER, UPDATE_USER, SET_USER_LIST,
} from '../../mutation-types';

export default {
  [SET_USER_LIST](state, data) {
    state.students = data.students;
    state.teachers = data.teachers;
    state.admins = data.admins;
  },
  [ADD_USER](state, { type, users }) {
    const { students, teachers, admins } = state;
    users = !Array.isArray(users) ? [users] : users;
    switch (type) {
      case 'student':
        state.students = students.concat(users);
        break;
      case 'teacher':
        state.teachers = teachers.concat(users);
        break;
      default:
        state.admins = admins.concat(users);
    }
  },
  [DELETE_USER](state, { type, data }) {
    const { students, teachers, admins } = state;
    const handler = item => !data.includes(item.account);
    switch (type) {
      case 'student':
        state.students = students.filter(handler);
        break;
      case 'teacher':
        state.teachers = teachers.filter(handler);
        break;
      default:
        state.admins = admins.filter(handler);
    }
  },
  [UPDATE_USER](state, { type, user }) {
    const { students, teachers, admins } = state;
    const handler = item => {
      return user.account === item.account
        ? user
        : item;
    };
    switch (type) {
      case 'student':
        state.students = students.map(handler);
        break;
      case 'teacher':
        state.teachers = teachers.map(handler);
        break;
      default:
        state.admins = admins.map(handler);
    }
  },
};
