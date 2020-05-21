<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="记录管理"
      sub-title="查看我的参赛记录信息"
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
    <ShowRecord
      type="student"
      :records="records"
    />
  </div>
</template>

<script>
import { omit } from 'lodash'
import { createNamespacedHelpers } from 'vuex'
import { makeExcel } from '../../utils/excel'
import ShowRecord from '../../components/record/ShowRecord'
import { SET_RECORD_LIST } from '../../store/mutation-types'

const { mapState, mapActions } = createNamespacedHelpers('records')
export default {
  name: 'StudentShowRecord',
  components: {
    ShowRecord
  },
  inject: ['init'],
  computed: mapState({
    records: 'records'
  }),
  methods: {
    ...mapActions({
      setRecordList: SET_RECORD_LIST
    }),
    exportExcel () {
      makeExcel({
        records: this.records.map(item => {
          const temp = omit(item, ['_id', 'id', '__v'])
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
