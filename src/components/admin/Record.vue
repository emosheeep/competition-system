<template>
  <div class="container">
    <a-page-header
      title="参赛记录"
      sub-title="对应赛事的登记信息"
      style="padding: 0; margin-bottom: 20px"
      @back="e => $router.back()"
    />
    <a-descriptions :title="`赛事详情：${race.title}`">
      <a-descriptions-item label="主办方">{{ race.sponsor }}</a-descriptions-item>
      <a-descriptions-item label="年度">{{ race.year }}</a-descriptions-item>
      <a-descriptions-item label="级别">{{ race.level }}</a-descriptions-item>
      <a-descriptions-item label="时间">{{ formatDate(race.date) }}</a-descriptions-item>
      <a-descriptions-item label="地点">{{ race.location }}</a-descriptions-item>
      <br />
      <a-descriptions-item label="描述">{{ race.description }}</a-descriptions-item>
    </a-descriptions>

    <!--展示对应赛事的参赛人员，id为赛事id-->
    <ShowRecord :id="id"/>
  </div>
</template>

<script>
import moment from 'moment'
import ShowRecord from '../common/ShowRecord'
export default {
  name: 'Record',
  props: {
    id: String
  },
  components: { ShowRecord },
  data () {
    return {
      addRecordVisible: false,
      race: undefined
    }
  },
  computed: {
    races () {
      return this.$store.state.races.races // 注意命名空间
    }
  },
  created () {
    this.race = this.races.find(race => race._id === this.id)
  },
  methods: {
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>

</style>
