<template>
  <a-table
    bordered
    :row-key="rowKey"
    :row-selection="rowSelection"
    :columns="columns"
    :data-source="data"
    :pagination="{
      showSizeChanger: true,
      showQuickJumper: true
    }"
  >
    <!--自定义搜索下拉菜单-->
    <template #filterIcon="{ filtered }">
      <SearchOutlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #filterDropdown="options">
      <TableSearch v-bind="options" />
    </template>

    <template #action="{ record }">
      <!--学生界面操作-->
      <template v-if="type === 'student'">
        <template v-if="record.date <= Date.now()">
          <StopOutlined />
          <span> 已截止</span>
        </template>
        <template v-else-if="isParticipate(record._id)">
          <CheckCircleOutlined style="color: limegreen" />
          <span> 已报备</span>
        </template>
        <template v-else>
          <a @click="$emit('add-record', record)">
            成绩录入
          </a>
        </template>
      </template>

      <!--教师界面操作-->
      <template v-else-if="type === 'teacher'">
        <a @click="onDetail(record)">详情</a>
      </template>

      <!--管理员界面操作-->
      <template v-else>
        <a @click="$emit('update-race', record)">
          <EditOutlined />
        </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认删除？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="onDelete(record)"
        >
          <template #icon>
            <QuestionCircleOutlined style="color: orange" />
          </template>
          <a><DeleteOutlined /></a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a-tooltip
          placement="top"
          title="查看详情"
        >
          <a @click.prevent="onDetail(record)">
            <FileTextOutlined />
          </a>
        </a-tooltip>
      </template>
    </template>
  </a-table>
</template>

<script>
import TableSearch from '../common/TableSearch';
import createColumns from '@/helpers/showrace-columns';
import MultipleDelete from '@/helpers/multiple-delete-mixin';
import {
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  StopOutlined,
  SearchOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons-vue';

export default {
  name: 'ShowRace',
  components: {
    TableSearch,
    FileTextOutlined,
    EditOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
    StopOutlined,
    SearchOutlined,
    CheckCircleOutlined,
  },
  mixins: [MultipleDelete],
  props: {
    data: {
      type: Array,
      required: true,
    },
    rowKey: {
      type: String,
      default: '_id',
    },
    type: {
      type: String,
      default: 'admin',
      validator(value) {
        return ['admin', 'student', 'teacher'].includes(value);
      },
    },
  },
  emits: ['update-race', 'add-record', 'show-detail', 'delete-race'],
  data() {
    return {
      columns: createColumns.call(this),
    };
  },
  computed: {
    records() {
      return this.$store.state.records.records;
    },
  },
  methods: {
    onDetail(race) {
      this.$emit('show-detail', race);
    },
    isParticipate(raceID) {
      return !!this.records.find(record => record.id === raceID);
    },
    onDelete(item) {
      if (!this.multiple) {
        this.$emit('delete-race', [item._id]);
      }
    },
    multipleDelete() {
      this.$emit('delete-race', [...this.selectedKeys]);
    },
  },
};
</script>

<style lang="stylus">
  .custom-box .ant-modal-confirm-content
    margin 20px 0 0 0 !important
</style>
