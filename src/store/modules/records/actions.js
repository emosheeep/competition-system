import { SET_RECORD_LIST, ADD_RECORD, UPDATE_RECORD, DELETE_RECORD } from '@/store/types'
import { getRecordList, addRecord, updateRecord, deleteRecord } from '@/api'
import { message } from 'ant-design-vue'

export default {
  [SET_RECORD_LIST] ({ commit }, params) {
    return getRecordList(params).then(({ data: records }) => {
      commit(SET_RECORD_LIST, records)
      return records
    })
  },
  [ADD_RECORD] ({ commit }, record) {
    const stopLoading = message.loading('请稍后')
    return addRecord(record).then(({ data: result }) => {
      if (result.code === 0) {
        commit(ADD_RECORD, result.data)
        message.success('添加成功')
        return result.data
      } else {
        const err = new Error(result.msg)
        message.warn(err.msg)
        throw err
      }
    }).finally(stopLoading)
  },
  [UPDATE_RECORD] ({ commit }, record) {
    const stopLoading = message.loading('请稍后')
    return updateRecord(record).then(({ data }) => {
      commit(UPDATE_RECORD, data)
      message.success('成功')
      return data
    }).finally(stopLoading)
  },
  [DELETE_RECORD] ({ commit }, data) {
    if (!Array.isArray(data) || data.length === 0) {
      return
    }
    const stopLoading = message.loading('请稍后')
    return deleteRecord(data).then(res => {
      commit(DELETE_RECORD, data)
      message.success('删除成功')
      return res
    }).finally(stopLoading)
  },
}
