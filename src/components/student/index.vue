<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="赛事信息列表"
      subTitle="请根据提示操作"
      style="padding: 0; margin-bottom: 20px"
    />
    <ShowRace type="student" @add-record="onAddRecord"/>
    <AddRecord
      v-if="addRecordVisible"
      :visible.sync="addRecordVisible"
      :race="curRace"
    />
  </div>
</template>

<script>
import ShowRace from '../race/ShowRace'
import { SET_TEACHERS } from '../../store/mutation-types'

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
      addRecordVisible: false,
      curRace: null
    }
  },
  mounted () {
    this.$store.dispatch(`student/${SET_TEACHERS}`)
  },
  methods: {
    onAddRecord (race) {
      this.addRecordVisible = true
      this.curRace = race
    }
  }
}
</script>

<style scoped>

</style>
