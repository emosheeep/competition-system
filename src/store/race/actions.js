import { SET_RACE_LIST, ADD_RACE } from '../mutation-types'
import { getRaceList, addRace } from '../../plugins/api'
import { message } from 'ant-design-vue'

export default {
  [SET_RACE_LIST] ({ commit }) {
    return new Promise((resolve, reject) => {
      getRaceList().then(({ data: races }) => {
        resolve(races)
        commit(SET_RACE_LIST, races)
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      })
    })
  },
  [ADD_RACE] ({ commit }, race) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      addRace(race).then(({ data }) => {
        resolve(data)
        commit(ADD_RACE, race)
        message.success('添加成功')
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      }).finally(() => {
        stopLoading()
      })
    })
  }
}
