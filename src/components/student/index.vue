<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="赛事信息列表"
      subTitle="请根据提示操作"
      style="padding: 0; margin-bottom: 20px"
    >
      <template #extra>
        <a-button type="primary" @click="exportExcel">导出Excel</a-button>
      </template>
    </a-page-header>
    <ShowRace
      type="student"
      :races="races"
      :loading="loading"
      @add-record="onAddRecord"
    />
    <AddRecord
      v-if="addRecordVisible"
      :visible.sync="addRecordVisible"
      :race="curRace"
    />
  </div>
</template>

<script>
import { omit } from 'lodash'
import ShowRace from '../race/ShowRace'
import { makeExcel } from '../../utils/excel'
import { SET_TEACHERS, SET_RACE_LIST } from '../../store/mutation-types'

export default {
  name: 'ShowRaceInStudent',
  components: {
    ShowRace,
    AddRecord: () => import(
      /* webpackChunkName: "AddRecord" */
      /* webpackPrefetch: true */
      './AddRecord'
    )
  },
  data () {
    return {
      loading: true,
      addRecordVisible: false,
      curRace: null
    }
  },
  computed: {
    races () {
      return this.$store.state.races.races
    }
  },
  mounted () {
    Promise.all([
      this.$store.dispatch(`student/${SET_TEACHERS}`),
      this.$store.dispatch(`races/${SET_RACE_LIST}`)
    ]).then(_ => {
      this.loading = false
    })
  },
  methods: {
    exportExcel () {
      makeExcel({
        races: this.races.map(item => {
          const temp = omit(item, ['_id', '__v'])
          temp.date = new Date(temp.date)
          return temp
        })
      })
    },
    onAddRecord (race) {
      this.addRecordVisible = true
      this.curRace = race
    }
  }
}
</script>

<style scoped>

</style>
