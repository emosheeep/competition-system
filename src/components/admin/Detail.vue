<template>
  <div class="container">
    <a-page-header
      title="参赛记录"
      sub-title="对应赛事的登记信息"
      style="padding: 0; margin-bottom: 20px"
      @back="e => $router.back()"
    />
    <a-skeleton :loading="loading">
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
      :id="id"
      type="admin"
    />
  </div>
</template>

<script>
import moment from 'moment'
import ShowRecord from '../record/ShowRecord'
import { createNamespacedHelpers } from 'vuex'
import { getRaceList } from '../../api'

const { mapState } = createNamespacedHelpers('races')

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
      loading: true,
      race: {}
    }
  },
  computed: mapState({
    races: 'races'
  }),
  watch: {
    id: {
      handler (newID) {
        if (this.races.length === 0) {
          getRaceList({ _id: this.id }).then(({ data: [race] }) => {
            this.race = race
            this.loading = false
          })
        } else {
          this.race = this.races.find(race => race._id === newID)
          this.loading = false
        }
      },
      immediate: true
    }
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
