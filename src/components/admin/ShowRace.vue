<template>
  <a-table
    rowKey="date"
    bordered
    :loading="loading"
    :columns="columns"
    :dataSource="races"
  >
    <template #date="date">
      {{ formatDate(date) }}
    </template>
  </a-table>
</template>

<script>
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
import { SET_RACE_LIST } from '../../store/mutation-types'
const { mapState, mapActions } = createNamespacedHelpers('race')
export default {
  name: 'ShowRace',
  data () {
    return {
      loading: true,
      columns
    }
  },
  computed: mapState({
    races: 'races'
  }),
  mounted () {
    this.setRaceList().then(data => {
      console.log(data)
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      setRaceList: SET_RACE_LIST
    }),
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
const columns = [
  {
    title: '赛事名称',
    dataIndex: 'title'
  },
  {
    title: '举办时间',
    dataIndex: 'date',
    scopedSlots: {
      customRender: 'date'
    }
  },
  {
    title: '地点',
    dataIndex: 'location'
  },
  {
    title: '级别',
    dataIndex: 'level'
  },
  {
    title: '年度',
    dataIndex: 'year'
  },
  {
    title: '主办方',
    dataIndex: 'sponsor'
  },
  {
    title: '描述',
    dataIndex: 'description'
  }
]
</script>

<style scoped>

</style>
