<template>
  <div>
    <SearchForm
      ref="searchForm"
      :loading="loading"
      :options="searchOptions"
      @search="search"
      @reset="search"
    />

    <!--信息列表-->
    <AntTable
      v-model="selectedKeys"
      row-key="record_id"
      :loading="loading"
      :data-source="records"
      :pagination="pagination"
      :columns="tableColumns"
      @change="changePage"
    >
      <template #header>
        <a-button
          v-if="$has('record:delete')"
          :disabled="!selectedKeys.length"
          @click="batchDelete"
        >
          批量删除 ({{ selectedKeys.length }})
        </a-button>
      </template>
      <template #action="record">
        <RecordAction :record="record" :fresh-data="getData" />
      </template>
    </AntTable>
  </div>
</template>

<script>
import RecordAction from '@/components/record/RecordAction';

export default {
  name: 'Record',
  components: { RecordAction },
  metaInfo: {
    title: '参赛记录',
  },
  data() {
    return {
      selectedKeys: [],
      loading: false,
      records: [],
      current: 1,
      pageSize: 10,
      total: 0,
      tableColumns: createTableColumns.call(this, this.$createElement),
      searchOptions: createSearchOptions.call(this),
    };
  },
  computed: {
    pagination() {
      return {
        current: this.current,
        pageSize: this.pageSize,
        total: this.total,
      };
    },
  },
  mounted() {
    this.$watch(() => [this.pageSize, this.current], this.getData, { immediate: true });
  },
  methods: {
    changePage({ pageSize, current }) {
      Object.assign(this, { pageSize, current });
    },
    search() {
      this.current = 1;
      this.getData();
    },
    getData() {
      this.loading = true;
      this.$api.getRecordList({
        ...this.$refs.searchForm.getResult(),
        offset: this.current,
        limit: this.pageSize,
      }).then(data => {
        this.records = data.data;
        this.total = data.count;
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '获取数据失败');
      }).finally(() => {
        this.loading = false;
      });
    },
    batchDelete() {
      this.$modal.confirm({
        title: `确认删除选中的${this.selectedKeys.length}项数据?`,
        onOk: () => this.$api.deleteRecord(this.selectedKeys)
          .then(() => {
            this.$message.success('删除成功!');
            this.selectedKeys.splice(0);
            this.getData();
          }).catch(e => {
            this.$message.error(e.msg || '删除失败!');
            throw e;
          }),
      });
    },
  },
};

function createTableColumns(h) {
  return [
    { title: '名称', dataIndex: 'title' },
    { title: '参赛人', dataIndex: 'sname' },
    { title: '指导老师', dataIndex: 'tname' },
    { title: '成绩', dataIndex: 'score' },
    {
      title: '状态',
      width: 100,
      customRender: ({ status }) => {
        const data = ({
          0: { style: 'color: lightgrey', type: 'question-circle', text: '待审核' },
          1: { style: 'color: limegreen', type: 'check-circle', text: '审核通过' },
          2: { style: 'color: red', type: 'exclamation-circle', text: '审核失败' },
        })[status];
        return <span style={data.style}>
          <a-icon type={data.type} />
          <span>{ data.text }</span>
        </span>;
      },
    },
    { title: '登记时间', dataIndex: 'create_time' },
    { title: '更新时间', dataIndex: 'update_time' },
    { title: '备注', dataIndex: 'description' },
    {
      title: '操作',
      align: 'center',
      scopedSlots: {
        customRender: 'action',
      },
    },
  ];
}

function createSearchOptions() {
  return [
    {
      label: '赛事名称',
      key: 'title',
      default: '',
      component: 'input',
    },
    {
      label: '参赛人名称',
      key: 'sname',
      default: '',
      component: 'input',
    },
    {
      label: '指导老师名称',
      key: 'tname',
      default: '',
      component: 'input',
    },
    {
      label: '成绩',
      key: 'score',
      default: '',
      component: 'input',
    },
    {
      label: '审核状态',
      key: 'status',
      default: undefined,
      component: 'select',
      props: {
        options: [
          { label: '待审核', value: 0 },
          { label: '审核通过', value: 1 },
          { label: '审核失败', value: 2 },
        ],
      },
    },
  ];
}
</script>

<style scoped>
</style>
