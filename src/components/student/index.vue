<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="赛事信息列表"
      subTitle="请根据提示操作"
      style="padding: 0; margin-bottom: 20px"
    />
    <ShowRace type="student" />
  </div>
</template>

<script>
import ShowRace from '../common/ShowRace'
import { SET_TEACHERS } from '../../store/mutation-types'

export default {
  name: 'ShowRaceInStudent',
  components: { ShowRace },
  mounted () {
    this.$store.dispatch(`student/${SET_TEACHERS}`)
  }
}
</script>

<style scoped>

</style>
