<template>
  <div>
    <!--数据列表-->
    <a-table
      bordered
      size="small"
      row-key="account"
      :columns="current.column"
      :data-source="current.data"
      :loading="loading"
      :pagination="{
        showSizeChanger: true,
        showQuickJumper: true
      }"
    >
      <template #filterIcon="filtered">
        <a-icon
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
      </template>
      <template #filterDropdown="options">
        <TableSearch v-bind="options" />
      </template>

      <!--最后一排的操作按钮-->
      <template #action="{ account }, record">
        <a @click="onEdit(record)">
          <a-icon type="edit" />
        </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认删除？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="onDelete(account)"
        >
          <template #icon>
            <a-icon
              type="question-circle-o"
              style="color: orange"
            />
          </template>
          <a><a-icon type="delete" /></a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import ColumnsMixin from '../../table-columns/showuser-columns-mixin'
import TableSearch from '../common/TableSearch'
export default {
  name: 'ShowUser',
  components: { TableSearch },
  mixins: [ColumnsMixin],
  props: {
    admins: {
      type: Array,
      default () {
        return []
      }
    },
    students: {
      type: Array,
      default () {
        return []
      }
    },
    teachers: {
      type: Array,
      default () {
        return []
      }
    },
    loading: Boolean,
    type: {
      type: String,
      default: 'admin',
      validator (value) {
        return ['student', 'teacher', 'admin'].includes(value)
      }
    }
  },
  computed: {
    current () {
      switch (this.type) {
        case 'student':
          return {
            data: this.students,
            column: this.STUDENT_COLUMNS
          }
        case 'teacher':
          return {
            data: this.teachers,
            column: this.TEACHER_COLUMNS
          }
        default:
          return {
            data: this.admins,
            column: this.ADMIN_COLUMNS
          }
      }
    }
  },
  methods: {
    onEdit (user) {
      this.$emit('update-user', user)
    },
    onDelete (account) {
      this.$emit('delete-user', {
        type: this.type,
        account
      })
    }
  }
}

</script>

<style scoped lang="stylus">
  .show-users
    display flex
    justify-content space-between
    flex-grow 1
  .row
    background black
</style>
