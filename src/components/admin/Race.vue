<template>
  <div>
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

    <ShowRace type="admin" @update-race="onUpdate" @delete-race="onDelete" />
    <AddRace
      v-if="addRaceVisible"
      :visible.sync="addRaceVisible" />
    <UpdateRace
      v-if="updateRaceVisible"
      :visible.sync="updateRaceVisible"
      :race="curRace" />
  </div>
</template>

<script>
import ShowRace from '../race/ShowRace'
import { DELETE_RACE } from '../../store/mutation-types'

export default {
  name: 'Race',
  components: {
    ShowRace,
    UpdateRace: () => import(
      /* webpackChunkName: "UpdateRace" */
      /* webpackPrefetch: true */
      '../race/UpdateRace'
    ),
    AddRace: () => import(
      /* webpackChunkName: "AddRace" */
      /* webpackPrefetch: true */
      '../race/AddRace'
    )
  },
  data () {
    return {
      addRaceVisible: false,
      updateRaceVisible: false,
      curRace: {}
    }
  },
  methods: {
    onUpdate (race) {
      this.updateRaceVisible = true
      this.curRace = race
      console.log(race)
    },
    onDelete ({ _id }) {
      this.$store.dispatch(`races/${DELETE_RACE}`, _id)
    }
  }
}
</script>
