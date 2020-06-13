<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="竞赛列表"
      sub-title="已录入系统的所有竞赛，点击详情查看参赛名单"
      style="padding: 0; margin-bottom: 20px"
    >
      <template #extra>
        <a-button-group class="button-group">
          <a-button
            type="primary"
            @click="exportExcel"
          >
            导出Excel
          </a-button>
          <a-button @click="init">
            刷新
          </a-button>
        </a-button-group>
      </template>
    </a-page-header>
    <ShowRace
      type="teacher"
      :data="races"
    />
  </div>
</template>

<script>
import { omit } from 'lodash'
import ShowRace from '../../components/race/ShowRace'
import { makeExcel } from '../../utils/excel'
export default {
  name: 'TeacherShowRace',
  components: { ShowRace },
  inject: ['init'],
  computed: {
    races () {
      return this.$store.state.races.races
    }
  },
  methods: {
    exportExcel () {
      makeExcel({
        races: this.races.map(item => {
          const temp = omit(item, ['_id'])
          temp.date = new Date(temp.date)
          return temp
        })
      })
    }
  }
}
</script>
