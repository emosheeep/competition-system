<template>
  <!--数据列表-->
  <a-table
    bordered
    row-key="account"
    :columns="column"
    :data-source="data"
    :row-selection="rowSelection"
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
        placement="left"
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

      <!--重置密码-->
      <a-divider type="vertical" />
      <a-popconfirm
        title="确认重置密码？"
        ok-text="确认"
        cancel-text="取消"
        placement="left"
        @confirm="$emit('reset', account)"
      >
        <template #icon>
          <a-icon
            type="question-circle-o"
            style="color: orange"
          />
        </template>
        <a-tooltip placement="top">
          <template #title>
            <span>重置密码</span>
          </template>
          <a><a-icon type="rollback" /></a>
        </a-tooltip>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script>
import MultipleDelete from '../../helpers/multiple-delete-mixin'
import TableSearch from '../common/TableSearch'
import { DELETE_USER } from '../../store/mutation-types'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('users')

export default {
  name: 'ShowUser',
  components: { TableSearch },
  mixins: [MultipleDelete],
  props: {
    data: {
      type: Array,
      required: true
    },
    column: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions([DELETE_USER]),
    onEdit (user) {
      this.$emit('update-user', user)
    },
    onDelete (account) {
      if (!this.multiple) {
        this.$emit('delete-user', [account])
      }
    },
    multipleDelete () {
      if (this.selectedKeys.length === 0) {
        return
      }
      this.$emit('delete-user', [...this.selectedKeys])
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
