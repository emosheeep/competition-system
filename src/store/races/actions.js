import { SET_RACE_LIST, ADD_RACE, UPDATE_RACE, DELETE_RACE } from '../mutation-types'
import { getRaceList, addRace, updateRace, deleteRace } from '../../api'
import { message } from 'ant-design-vue'

export default {
  [SET_RACE_LIST] ({ commit }, params) {
    return new Promise((resolve, reject) => {
      getRaceList(params).then(({ data: races }) => {
        resolve(races)
        commit(SET_RACE_LIST, races)
      }).catch(reject)
    })
  },
  [ADD_RACE] ({ commit }, race) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      addRace(race).then(({ data }) => {
        resolve(data)
        commit(ADD_RACE, data)
        message.success('添加成功')
      }).catch(reject).finally(() => {
        stopLoading()
      })
    })
  },
  [UPDATE_RACE] ({ commit }, race) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      updateRace(race).then(({ data }) => {
        resolve(data)
        commit(UPDATE_RACE, data)
        message.success('更新成功')
      }).catch(reject).finally(stopLoading)
    })
  },
  [DELETE_RACE] ({ commit }, data) {
    if (!Array.isArray(data) || data.length === 0) {
      return
    }
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      deleteRace(data).then(res => {
        resolve(res)
        commit(DELETE_RACE, data)
        message.success('删除成功')
      }).catch(reject).finally(stopLoading)
    })
  }
}
