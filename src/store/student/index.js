import { SET_TEACHERS } from '../mutation-types'
import { getUserList } from '../../plugins/api'
import { message } from 'ant-design-vue'

export default {
  namespaced: true,
  state: {
    teachers: []
  },
  mutations: {
    [SET_TEACHERS] (state, teachers) {
      state.teachers = teachers
    }
  },
  actions: {
    [SET_TEACHERS] ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserList('teacher').then(({ data }) => {
          resolve(data)
          commit(SET_TEACHERS, data)
        }).catch(e => {
          reject(e)
          message.error('数据获取失败，请重试')
        })
      })
    }
  }
}
