import { SET_RECORD_LIST, ADD_RECORD, UPDATE_RECORD, DELETE_RECORD } from '../mutation-types'
import { getRecordList, addRecord, updateRecord, deleteRecord } from '../../api'
import { message } from 'ant-design-vue'

export default {
  [SET_RECORD_LIST] ({ commit }, params) {
    return new Promise((resolve, reject) => {
      getRecordList(params).then(({ data: records }) => {
        resolve(records)
        commit(SET_RECORD_LIST, records)
      }).catch(reject)
    })
  },
  [ADD_RECORD] ({ commit }, record) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      addRecord(record).then(({ data: result }) => {
        if (result.code === 0) {
          resolve(result.data)
          commit(ADD_RECORD, result.data)
          message.success('添加成功')
        } else {
          message.warn(result.msg)
          reject(new Error(result.msg))
        }
      }).catch(reject).finally(stopLoading)
    })
  },
  [UPDATE_RECORD] ({ commit }, record) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      updateRecord(record).then(({ data }) => {
        resolve(data)
        commit(UPDATE_RECORD, data)
        message.success('成功')
      }).catch(reject).finally(stopLoading)
    })
  },
  [DELETE_RECORD] ({ commit }, data) {
    if (!Array.isArray(data) || data.length === 0) {
      return
    }
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      deleteRecord(data).then(res => {
        resolve(res)
        commit(DELETE_RECORD, data)
        message.success('删除成功')
      }).catch(reject).finally(stopLoading)
    })
  }
}
