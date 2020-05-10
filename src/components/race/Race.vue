<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="竞赛管理"
      subTitle="管理竞赛数据"
      style="padding: 0; margin-bottom: 20px"
    >
      <template #extra>
        <a-button-group>
          <a-button
            type="primary"
            @click="addRaceVisible = true"
          >添加赛事</a-button>
          <a-button @click="exportExcel">导出Excel</a-button>
        </a-button-group>
      </template>
    </a-page-header>

    <ShowRace
      type="admin"
      :races="races"
      :loading="loading"
      @update-race="onUpdate"
      @delete-race="onDelete" />
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
import { omit } from 'lodash'
import { createNamespacedHelpers } from 'vuex'
import ShowRace from './ShowRace'
import { DELETE_RACE, SET_RACE_LIST } from '../../store/mutation-types'
import { makeExcel } from '../../utils/excel'
const { mapState, mapActions } = createNamespacedHelpers('races')

export default {
  name: 'Race',
  components: {
    ShowRace,
    UpdateRace: () => import(
      /* webpackChunkName: "UpdateRace" */
      /* webpackPrefetch: true */
      './UpdateRace'
    ),
    AddRace: () => import(
      /* webpackChunkName: "AddRace" */
      /* webpackPrefetch: true */
      './AddRace'
    )
  },
  data () {
    return {
      loading: true,
      addRaceVisible: false,
      updateRaceVisible: false,
      curRace: {}
    }
  },
  computed: mapState({
    races: 'races'
  }),
  mounted () {
    this.setRaceList().then(_ => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      setRaceList: SET_RACE_LIST
    }),
    onUpdate (race) {
      this.updateRaceVisible = true
      this.curRace = race
    },
    onDelete ({ _id }) {
      this.$store.dispatch(`races/${DELETE_RACE}`, _id)
    },
    exportExcel () {
      makeExcel({
        races: this.races.map(item => {
          const temp = omit(item, ['_id', '__v'])
          temp.date = new Date(temp.date)
          return temp
        })
      })
    }
  }
}
</script>
