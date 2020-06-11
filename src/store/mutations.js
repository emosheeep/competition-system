import { LOGIN, LOGOUT, REFRESH_TOKEN, UPDATE_PASSWORD, UPDATE_SELF } from './mutation-types'

export default {
  [LOGIN] (state, { user, token, refreshToken }) {
    state.user = user
    state.token = token
    state.refreshToken = refreshToken
  },
  [LOGOUT] (state) {
    state.user = {}
    state.token = ''
    state.refreshToken = ''
  },
  [REFRESH_TOKEN] (state, newToken) {
    state.token = newToken
  },
  [UPDATE_SELF] (state, user) {
    state.user = Object.assign(state.user, user)
  },
  [UPDATE_PASSWORD] (state, { newVal }) {
    const { students, teachers, admins } = state.users
    const { identity, account } = state.user
    const handler = user => {
      if (account === user.account) {
        user.password = newVal
      }
      return user
    }
    if (identity === 'student') {
      state.users.students = students.map(handler)
    } else if (identity === 'teacher') {
      state.users.teachers = teachers.map(handler)
    } else if (identity === 'admin') {
      state.users.admins = admins.map(handler)
    } else {
      throw new Error('identity error, the value is: ' + identity)
    }
  }
}
