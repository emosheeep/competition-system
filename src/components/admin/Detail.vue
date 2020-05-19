<template>
  <div class="container">
    <a-page-header
      title="参赛记录"
      sub-title="对应赛事的登记信息"
      style="padding: 0; margin-bottom: 20px"
      @back="e => $router.back()"
    >
      <template #extra>
        <a-button @click="init">
          刷新
        </a-button>
      </template>
    </a-page-header>
    <a-skeleton
      active
      :loading="loading"
      :paragraph="{ rows: 4 }"
    >
      <a-descriptions
        v-if="!loading"
        :title="`赛事详情：${race.title}`"
        style="padding: 10px"
      >
        <a-descriptions-item label="主办方">
          {{ race.sponsor }}
        </a-descriptions-item>
        <a-descriptions-item label="年度">
          {{ race.year }}
        </a-descriptions-item>
        <a-descriptions-item label="级别">
          {{ race.level }}
        </a-descriptions-item>
        <a-descriptions-item label="时间">
          {{ formatDate(race.date) }}
        </a-descriptions-item>
        <a-descriptions-item label="地点">
          {{ race.location }}
        </a-descriptions-item>
        <br>
        <a-descriptions-item label="描述">
          {{ race.description }}
        </a-descriptions-item>
      </a-descriptions>
    </a-skeleton>
    <!--展示对应赛事的参赛人员，id为赛事id-->
    <ShowRecord
      type="common"
      :loading="loading"
      :records="localRecords"
    />
  </div>
</template>

<script>
import moment from 'moment'
import ShowRecord from '../record/ShowRecord'
import { getRaceList, getRecordList } from '../../api'

export default {
  name: 'Detail',
  components: { ShowRecord },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      race: {},
      localRecords: []
    }
  },
  watch: {
    id: {
      handler (newID) {
        this.init()
      },
      immediate: true
    }
  },
  methods: {
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    init () {
      if (this.loading) return
      this.loading = true
      const { id } = this
      const { account } = this.$store.state.user
      Promise.all([
        getRaceList({ _id: id }),
        getRecordList({ id, tid: account })
      ]).then(([
        { data: races },
        { data: records }
      ]) => {
        this.race = races[0]
        this.localRecords = records
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
