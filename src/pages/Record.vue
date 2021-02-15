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
      <template #title>
        <a-button :disabled="!selectedKeys.length" @click="batchDelete">
          批量删除 ({{ selectedKeys.length }})
        </a-button>
      </template>
      <template #action="record">
        <a-popconfirm
          title="确认删除？"
          placement="left"
          @confirm="deleteRecord(record)"
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
    </AntTable>
  </div>
</template>

<script>
export default {
  name: 'Record',
  data() {
    return {
      selectedKeys: [],
      loading: false,
      records: [],
      current: 1,
      pageSize: 10,
      total: 0,
      tableColumns: createTableColumns.call(this),
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
  beforeMount() {
    this.$watch(() => [this.pageSize, this.current], this.getData);
  },
  activated() {
    this.getData();
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
      }).then(({ data }) => {
        if (data.code !== 200) throw data;
        this.records = data.data;
        this.total = data.count;
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '获取数据失败');
      }).finally(() => {
        this.loading = false;
      });
    },
    deleteRecord(record) {
      this.$api.deleteRecord([record.record_id]).then(({ data }) => {
        if (data.code !== 200) throw data;
        this.$message.success(data.msg);
        this.getData();
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '删除失败');
      });
    },
    batchDelete() {
      this.$modal.confirm({
        title: `确认删除选中的${this.selectedKeys.length}项数据?`,
        onOk: () => this.$api.deleteRecord(this.selectedKeys)
          .then(({ data }) => {
            if (data.code !== 200) throw data;
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

function createTableColumns() {
  return [
    { title: '名称', dataIndex: 'title' },
    { title: '参赛人', dataIndex: 'sname' },
    { title: '指导老师', dataIndex: 'tname' },
    { title: '成绩', dataIndex: 'score' },
    { title: '状态', dataIndex: 'state' },
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
  ];
}
</script>

<style scoped>

</style>
