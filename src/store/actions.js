import { message } from 'ant-design-vue';
import { LOGIN, REFRESH_TOKEN, UPDATE_SELF } from './types';
import { login, refreshToken, updateUser } from '../api';

export default {
  [LOGIN]({ commit, state }, info) {
    return login(info).then(({ data: result }) => {
      if (result.code === 0) {
        message.success(result.msg);
        commit(LOGIN, result.data);
        return result.data;
      } else {
        message.warn(result.msg);
        const error = new Error(result.msg);
        throw error;
      }
    });
  },
  [REFRESH_TOKEN]({ commit, state }) {
    return refreshToken(state.refreshToken).then(({ data: newToken }) => {
      commit(REFRESH_TOKEN, newToken);
      return newToken;
    });
  },
  [UPDATE_SELF]({ commit, state }, user) {
    const key = Date.now();
    const { identity } = state.user;
    const stop = message.loading({ content: '请稍后', key, duration: 0 });
    return updateUser(identity, user).then(() => {
      message.success({ content: '修改成功', key });
      commit(UPDATE_SELF, user);
      return user;
    }).catch(e => {
      stop();
      throw e;
    });
  },
};
