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
      <template #filterDropdown="options">
        <TableSearch v-bind="options" />
      </template>

      <template #date="date">
        {{ formatDate(date) }}
      </template>

      <!--学生界面操作-->
      <template
        v-if="type === 'student'"
        #action="item"
      >
        <template v-if="isParticipate(item._id)">
          <a-icon
            type="check-circle"
            style="color: limegreen"
          />
          <span> 已报备</span>
        </template>
        <template v-else>
          <a @click.prevent="$emit('add-record', item)">登记</a>
        </template>
      </template>
      <!--教师界面操作-->
      <template
        v-else-if="type === 'teacher'"
        #action="item"
      >
        <a @click.prevent="onDetail(item)">详情</a>
      </template>
      <!--管理员界面操作-->
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
import TableSearch from '../common/TableSearch'
import createColumns from '../../table-columns/showrace-columns'
export default {
  name: 'ShowRace',
  components: {
    TableSearch
  },
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
  computed: {
    records () {
      return this.$store.state.records.records
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
    },
    isParticipate (raceID) {
      return !!this.records.find(record => record.id === raceID)
    }
  }
}
</script>

<style lang="stylus">
  .custom-box .ant-modal-confirm-content
    margin 20px 0 0 0 !important
</style>
