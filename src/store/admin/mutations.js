/**
 * mutations直接修改数据对象state，注意这里的方法必须是同步方法
 */
import {
  SET_ADMIN_LIST, SET_STUDENT_LIST, SET_TEACHER_LIST
} from '../mutation-types'

export default {
  [SET_ADMIN_LIST] (state, admins) {
    state.admins = admins
  },
  [SET_STUDENT_LIST] (state, students) {
    state.students = students
  },
  [SET_TEACHER_LIST] (state, teachers) {
    state.teachers = teachers
  }
}
