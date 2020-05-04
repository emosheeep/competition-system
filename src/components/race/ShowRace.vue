<template>
  <div>
    <a-table
      rowKey="_id"
      bordered
      :loading="loading"
      :columns="columns"
      :dataSource="races"
      :pagination="{
        showSizeChanger: true,
        showQuickJumper: true
      }"
    >
      <!--自定义搜索下拉菜单-->
      <template #filterIcon="filtered">
        <a-icon type="search" :style="{ color: filtered ? '#108ee9' : undefined }"/>
      </template>
      <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
            style="width: 188px; margin-bottom: 8px; display: block;"
          />
          <a-button
            size="small"
            style="margin-right: 10px; width: 90px"
            @click="() => handleReset(clearFilters)"
          >重置</a-button>
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >搜索</a-button>
        </div>
      </template>
      <template #filter="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i">
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>{{ text }}</template>
      </template>

      <template #date="date">{{ formatDate(date) }}</template>
      <template #action="item">
        <a @click.prevent="onEdit(item)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认删除？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="deleteUser(item._id)"
        >
          <a>删除</a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a @click.prevent="onDetail(item)">详情</a>
      </template>
    </a-table>

    <!--编辑赛事信息-->
    <EditRace
      type="update"
      v-if="updateVisible"
      :visible.sync="updateVisible"
      :race="curRace"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { Modal } from 'ant-design-vue'
import { createNamespacedHelpers } from 'vuex'
import { SET_RACE_LIST, DELETE_RACE } from '../../store/mutation-types'
const { mapState, mapActions } = createNamespacedHelpers('race')
export default {
  name: 'ShowRace',
  components: {
    EditRace: () => import(
      /* webpackChunkName: "EditUser" */
      /* webpackPrefetch: true */
      './EditRace'
    )
  },
  data () {
    return {
      loading: true,
      updateVisible: false,
      curRace: null,
      searchText: '',
      searchedColumn: 0,
      columns: createColumns.call(this)
    }
  },
  computed: mapState({
    races: 'races'
  }),
  mounted () {
    this.setRaceList().then(data => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      setRaceList: SET_RACE_LIST,
      deleteUser: DELETE_RACE
    }),
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    onEdit (race) {
      this.updateVisible = true
      this.curRace = race
    },
    onDetail (race) {
      Modal.info({
        title: race.title,
        class: 'detail-box',
        centered: true,
        maskClosable: true,
        icon: 'profile',
        content: h => {
          return h('a-descriptions', {
            props: { layout: 'vertical', bordered: true, size: 'small' }
          }, [
            h('a-descriptions-item', { props: { label: '主办方' } }, race.sponsor),
            h('a-descriptions-item', { props: { label: '年度' } }, race.year),
            h('a-descriptions-item', { props: { label: '级别' } }, race.level),
            h('a-descriptions-item', { props: { label: '时间' } }, this.formatDate(race.date)),
            h('a-descriptions-item', { props: { label: '地点' } }, race.location),
            h('br'),
            h('a-descriptions-item', { props: { label: '描述' } }, race.description)
          ])
        }
      })
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    }
  }
}

function createColumns () {
  return [
    {
      title: '举办时间',
      dataIndex: 'date',
      ellipsis: true,
      width: 110,
      sorter: (a, b) => a.date > b.date,
      scopedSlots: {
        customRender: 'date'
      }
    },
    {
      title: '赛事名称',
      dataIndex: 'title',
      ellipsis: true,
      scopedSlots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'filter'
      },
      onFilter: (value, record) => record.title.includes(value),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            this.$refs.searchInput.focus()
          }, 0)
        }
      }
    },
    {
      title: '级别',
      dataIndex: 'level',
      width: 80,
      ellipsis: true,
      onFilter: (value, record) => record.level.includes(value),
      filters: [
        {
          text: '校级',
          value: '校级'
        },
        {
          text: '省级',
          value: '省级'
        },
        {
          text: '国家级一般',
          value: '国家级一般'
        },
        {
          text: '国家级重点',
          value: '国家级重点'
        }
      ]
    },
    {
      title: '年度',
      dataIndex: 'year',
      width: 70,
      ellipsis: true
    },
    {
      title: '主办方',
      dataIndex: 'sponsor',
      ellipsis: true
    },
    {
      title: '地点',
      dataIndex: 'location',
      ellipsis: true
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true
    },
    {
      title: '操作',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ]
}
</script>

<style lang="stylus">
  .detail-box .ant-modal-confirm-content
    margin-left 0 !important
</style>
