import { SET_RACE_LIST, ADD_RACE, UPDATE_RACE, DELETE_RACE } from '../../types';
import { getRaceList, addRace, updateRace, deleteRace } from '../../../api';
import { message } from 'ant-design-vue';

export default {
  [SET_RACE_LIST]({ commit }, params) {
    return getRaceList(params).then(({ data: races }) => {
      commit(SET_RACE_LIST, races);
      return races;
    });
  },
  [ADD_RACE]({ commit }, race) {
    const stopLoading = message.loading('请稍后');
    return addRace(race).then(({ data }) => {
      commit(ADD_RACE, data);
      message.success('添加成功');
      return data;
    }).finally(() => {
      stopLoading();
    });
  },
  [UPDATE_RACE]({ commit }, race) {
    const stopLoading = message.loading('请稍后');
    return updateRace(race).then(({ data }) => {
      commit(UPDATE_RACE, data);
      message.success('更新成功');
      return data;
    }).finally(stopLoading);
  },
  [DELETE_RACE]({ commit }, data) {
    if (!Array.isArray(data) || data.length === 0) {
      return;
    }
    const stopLoading = message.loading('请稍后');
    return deleteRace(data).then(res => {
      commit(DELETE_RACE, data);
      message.success('删除成功');
      return res;
    }).finally(stopLoading);
  },
};
