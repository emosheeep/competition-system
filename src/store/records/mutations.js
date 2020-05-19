import { SET_RECORD_LIST, ADD_RECORD, UPDATE_RECORD, DELETE_RECORD } from '../mutation-types'

export default {
  [SET_RECORD_LIST] (state, records) {
    state.records = records
  },
  [ADD_RECORD] (state, record) {
    state.records.push(record)
  },
  [UPDATE_RECORD] (state, record) {
    state.records = state.records.map(item => {
      return item._id === record._id ? record : item
    })
  },
  [DELETE_RECORD] (state, _id) {
    state.records = state.records.filter(item => item._id !== _id)
  }
}
