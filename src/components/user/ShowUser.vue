<template>
  <!--数据列表-->
  <a-table
    bordered
    :row-key="rowKey"
    :columns="column"
    :data-source="data"
    :row-selection="rowSelection"
    :pagination="{
      showSizeChanger: true,
      showQuickJumper: true
    }"
  >
    <template #filterIcon="{ filtered }">
      <SearchOutlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #filterDropdown="options">
      <TableSearch v-bind="options" />
    </template>

    <!--最后一排的操作按钮-->
    <template #action="{ record }">
      <a @click="onEdit(record)">
        <EditOutlined />
      </a>
      <a-divider type="vertical" />
      <a-popconfirm
        title="确认删除？"
        ok-text="确认"
        cancel-text="取消"
        placement="left"
        @confirm="onDelete(record.account)"
      >
        <template #icon>
          <QuestionCircleOutlined style="color: orange" />
        </template>
        <a><DeleteOutlined /></a>
      </a-popconfirm>

      <!--重置密码-->
      <a-divider type="vertical" />
      <a-popconfirm
        title="确认重置密码？"
        ok-text="确认"
        cancel-text="取消"
        placement="left"
        @confirm="$emit('reset', record.account)"
      >
        <template #icon>
          <QuestionCircleOutlined style="color: orange" />
        </template>
        <a-tooltip
          placement="top"
          title="重置密码"
        >
          <a><RollbackOutlined /></a>
        </a-tooltip>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script>
import { mapActions } from 'vuex'
import {
  QuestionCircleOutlined,
  RollbackOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue'
import { DELETE_USER } from '@/store/types'
import MultipleDelete from '@/helpers/multiple-delete-mixin'
import TableSearch from '@/components/common/TableSearch'

export default {
  name: 'ShowUser',
  components: {
    TableSearch,
    QuestionCircleOutlined,
    RollbackOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
  },
  mixins: [MultipleDelete],
  props: {
    data: {
      type: Array,
      required: true,
    },
    rowKey: {
      type: String,
      default: 'account',
    },
    column: {
      type: Array,
      required: true,
    },
  },
  emits: ['update-user', 'delete-user', 'reset'],
  methods: {
    ...mapActions('users', [DELETE_USER]),
    onEdit (user) {
      this.$emit('update-user', user)
    },
    onDelete (account) {
      if (!this.multiple) {
        this.$emit('delete-user', [account])
      }
    },
    multipleDelete () {
      if (this.selectedKeys.length !== 0) {
        this.$emit('delete-user', [...this.selectedKeys])
      }
    },
  },
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
