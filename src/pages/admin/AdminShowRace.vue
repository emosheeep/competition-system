<template>
  <div>
    <SearchForm
      immediate
      ref="searchForm"
      :loading="loading"
      :options="searchOptions"
      @search="search"
      @reset="search"
    />

    <a-button-group>
      <a-button
        type="primary"
        @click="addRace"
      >
        添加赛事
      </a-button>
    </a-button-group>

    <a-divider style="margin-top: 10px" />

    <!--信息列表-->
    <a-table
      bordered
      size="middle"
      row-key="race_id"
      :loading="loading"
      :data-source="races"
      :pagination="pagination"
      :columns="tableColumns"
      @change="changePage"
    >
      <template #action="record">
        <!--编辑-->
        <a @click="editRace(record)">
          <a-icon type="edit" />
        </a>

        <a-divider type="vertical" />

        <!--删除-->
        <a-popconfirm
          title="确认删除？"
          ok-text="确认"
          cancel-text="取消"
          placement="left"
          @confirm="deleteRace(record)"
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
      </template>
    </a-table>
  </div>
</template>

<script>
import { raceLevels } from '@/utils/const';
import EditRace from '@/components/add-and-update/EditRace';

export default {
  name: 'AdminShowRace',
  data() {
    return {
      loading: false,
      races: [],
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
        showQuickJumper: true,
        showSizeChanger: true,
      };
    },
  },
  beforeMount() {
    this.$watch(() => [this.pageSize, this.current], this.getData);
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
      this.$api.getRaceList({
        ...this.$refs.searchForm.getResult(),
        offset: this.current,
        limit: this.pageSize,
      }).then(({ data }) => {
        if (data.code !== 200) throw data;
        this.races = data.data;
        this.total = data.count;
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '获取数据失败');
      }).finally(() => {
        this.loading = false;
      });
    },
    addRace() {
      let vnode;
      this.$confirm({
        title: '新增赛事',
        content: h => (vnode = <EditRace />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.addRace(values).then(({ data }) => {
            if (data.code !== 200) throw data;
            this.$message.success(data.msg);
            this.getData();
          }).catch(e => {
            this.$message.error(e.msg || '添加失败');
            throw e;
          });
        },
      });
    },
    editRace(race) {
      let vnode;
      this.$confirm({
        title: '编辑赛事',
        content: h => (vnode = <EditRace data={race} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          values.race_id = race.race_id;
          return this.$api.updateRace(values).then(({ data }) => {
            if (data.code !== 200) throw data;
            this.$message.success(data.msg);
            this.getData();
          }).catch(e => {
            this.$message.error(e.msg || '修改失败');
            throw e;
          });
        },
      });
    },
    deleteRace(data) {
      this.loading = true;
      this.$api.deleteRace([data.race_id]).then(({ data }) => {
        if (data.code !== 200) throw data;
        this.$message.success(data.msg);
        this.getData();
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '删除失败');
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};

function createTableColumns() {
  return [
    { title: '赛事名称', dataIndex: 'title' },
    { title: '级别', dataIndex: 'level' },
    { title: '类别', dataIndex: 'type' },
    { title: '主办方', dataIndex: 'sponsor' },
    { title: '举办时间', dataIndex: 'date' },
    { title: '地点', dataIndex: 'location' },
    { title: '描述', dataIndex: 'description' },
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
      label: '主办方',
      key: 'sponsor',
      default: '',
      component: 'input',
    },
    {
      label: '地点',
      key: 'location',
      default: '',
      component: 'input',
    },
    {
      label: '类别',
      key: 'type',
      default: undefined,
      component: 'select',
      props: {
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map(key => ({
          label: key,
          value: key,
        })),
      },
    },
    {
      label: '级别',
      key: 'level',
      default: undefined,
      component: 'select',
      props: {
        options: raceLevels,
      },
    },
    {
      label: '举办时间',
      key: 'date',
      default: () => [],
      mapper: ({ date }) => date.join('~'),
      component: 'range-picker',
    },
  ];
}
</script>
