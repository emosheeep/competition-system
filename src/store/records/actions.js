import { SET_RECORD_LIST, ADD_RECORD, UPDATE_RECORD, DELETE_RECORD } from '../mutation-types'
import { getRecordList, addRecord, updateRecord, deleteRecord } from '../../api'
import { message } from 'ant-design-vue'

export default {
  [SET_RECORD_LIST] ({ commit }, params) {
    return new Promise((resolve, reject) => {
      getRecordList(params).then(({ data: records }) => {
        resolve(records)
        commit(SET_RECORD_LIST, records)
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      })
    })
  },
  [ADD_RECORD] ({ commit }, record) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      addRecord(record).then(({ data: result }) => {
        if (result?.code === 1) {
          message.warn('请勿重复报名')
        } else {
          resolve(result.data)
          commit(ADD_RECORD, result.data)
          message.success('添加成功')
        }
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      }).finally(() => {
        stopLoading()
      })
    })
  },
  [UPDATE_RECORD] ({ commit }, record) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      updateRecord(record).then(({ data }) => {
        resolve(data)
        commit(UPDATE_RECORD, record)
        message.success('更新成功')
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      }).finally(() => {
        stopLoading()
      })
    })
  },
  [DELETE_RECORD] ({ commit }, id) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      deleteRecord(id).then(({ data }) => {
        resolve(data)
        commit(DELETE_RECORD, id)
        message.success('删除成功')
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      }).finally(() => {
        stopLoading()
      })
    })
  }
}
