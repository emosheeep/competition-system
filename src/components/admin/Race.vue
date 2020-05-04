<template>
  <div class="container">
    <a-page-header
      :back-icon="false"
      title="竞赛管理"
      subTitle="管理竞赛数据"
      style="padding: 0; margin-bottom: 20px"
    >
      <template #extra>
        <a-button
          type="primary"
          @click="addRaceVisible = true"
        >添加赛事</a-button>
      </template>
    </a-page-header>

    <ShowRace />
    <EditRace type="add" v-if="addRaceVisible" :visible.sync="addRaceVisible" />
  </div>
</template>

<script>
import ShowRace from '../race/ShowRace'

export default {
  name: 'Race',
  components: {
    ShowRace,
    EditRace: () => import(
      /* webpackChunkName: "AddRace" */
      /* webpackPrefetch: true */
      '../race/EditRace'
    )
  },
  data () {
    return {
      addRaceVisible: false
    }
  }
}
</script>

<style scoped lang="stylus">
  .container
    padding 20px
    background white
</style>
