import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state: {
    students: [],
    teachers: [],
    admins: [],
  },
  actions,
  mutations,
}
