<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="赛事信息列表"
      sub-title="请根据提示操作"
      style="padding: 0; margin-bottom: 20px"
    >
      <template #extra>
        <a-button-group class="button-group">
          <a-button @click="init">
            刷新
          </a-button>
          <a-button
            type="primary"
            @click="exportExcel"
          >
            导出Excel
          </a-button>
        </a-button-group>
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
import { SET_RACE_LIST } from '../../store/mutation-types'

export default {
  name: 'StudentShowRace',
  components: {
    ShowRace,
    AddRecord: () => import(
      /* webpackChunkName: "AddRecord" */
      /* webpackPrefetch: true */
      '../record/AddRecord'
    )
  },
  data () {
    return {
      loading: false,
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
    this.init()
  },
  methods: {
    init () {
      if (this.loading) return
      this.loading = true
      this.$store.dispatch(`races/${SET_RACE_LIST}`).finally(_ => {
        this.loading = false
      })
    },
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
