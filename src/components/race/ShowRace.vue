<template>
  <div>
    <a-table
      size="small"
      row-key="_id"
      bordered
      :loading="loading"
      :columns="columns"
      :data-source="races"
      :pagination="{
        showSizeChanger: true,
        showQuickJumper: true
      }"
    >
      <!--自定义搜索下拉菜单-->
      <template #filterIcon="filtered">
        <a-icon
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
      </template>
      <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            size="small"
            style="margin-right: 10px; width: 90px"
            @click="() => handleReset(clearFilters)"
          >
            重置
          </a-button>
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            搜索
          </a-button>
        </div>
      </template>
      <template #filter="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
            >
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>

      <template #date="date">
        {{ formatDate(date) }}
      </template>

      <!--管理员页面显示编辑按钮，学生界面不显示-->
      <template
        v-if="type === 'student'"
        #action="item"
      >
        <a @click.prevent="$emit('add-record', item)">登记</a>
      </template>
      <template
        v-else-if="type === 'teacher'"
        #action="item"
      >
        <a @click.prevent="onDetail(item)">详情</a>
      </template>
      <template
        v-else
        #action="item"
      >
        <a @click.prevent="$emit('update-race', item)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认删除？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="$emit('delete-race', item)"
        >
          <a>删除</a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a @click.prevent="onDetail(item)">详情</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import moment from 'moment'
import TableSearchMixin from '../table-search-mixin'
export default {
  name: 'ShowRace',
  mixins: [TableSearchMixin],
  props: {
    loading: Boolean,
    races: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'admin',
      validator (value) {
        return ['admin', 'student', 'teacher'].includes(value)
      }
    }
  },
  data () {
    return {
      columns: createColumns.call(this)
    }
  },
  methods: {
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    onDetail (race) {
      this.$router.push({
        path: 'detail',
        query: {
          id: race._id
        }
      })
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
  .custom-box .ant-modal-confirm-content
    margin 20px 0 0 0 !important
</style>
