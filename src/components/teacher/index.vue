<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="竞赛列表"
      sub-title="已录入系统的所有竞赛，点击详情查看参赛名单"
      style="padding: 0; margin-bottom: 20px"
    >
      <template #extra>
        <a-button
          type="primary"
          @click="exportExcel"
        >
          导出Excel
        </a-button>
      </template>
    </a-page-header>
    <ShowRace
      type="teacher"
      :loading="loading"
      :races="races"
    />
  </div>
</template>

<script>
import { omit } from 'lodash'
import ShowRace from '../race/ShowRace'
import { makeExcel } from '../../utils/excel'
import { SET_RACE_LIST } from '../../store/mutation-types'
export default {
  name: 'ShowRaceInTeacher',
  components: { ShowRace },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    races () {
      return this.$store.state.races.races
    }
  },
  mounted () {
    this.$store.dispatch(`races/${SET_RACE_LIST}`).then(() => {
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
    }
  }
}
</script>

<style scoped>

</style>
