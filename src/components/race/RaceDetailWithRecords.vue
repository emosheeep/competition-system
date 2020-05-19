<template>
  <div>
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
    <Detail
      :loading="loading"
      :race="race"
      :records="records"
    />
  </div>
</template>

<script>
import { getRaceList, getRecordList } from '../../api'
import Detail from '../common/Detail'
export default {
  name: 'RaceDetailWithRecords',
  components: { Detail },
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['admin', 'teacher'].includes(value)
      }
    }
  },
  data () {
    return {
      loading: false,
      race: {},
      records: []
    }
  },
  watch: {
    id: {
      handler () {
        this.init()
      },
      immediate: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.loading) return
      this.loading = true
      const { id } = this
      const { account } = this.$store.state.user
      Promise.all([
        getRaceList({ _id: id }),
        this.type === 'teacher'
          ? getRecordList({ id, tid: account })
          : getRecordList({ id })
      ]).then(([
        { data: races },
        { data: records }
      ]) => {
        this.race = races[0]
        this.records = records
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
