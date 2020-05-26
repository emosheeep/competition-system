<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="记录管理"
      sub-title="学生的参赛记录"
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
      type="teacher"
      :records="records"
      @delete-record="onDelete"
      @update-record="onUpdate"
    />
    <UpdateRecord
      :visible.sync="updateRecordVisible"
      :record="curRecord"
    />
  </div>
</template>

<script>
import { omit } from 'lodash'
import { createNamespacedHelpers } from 'vuex'
import { makeExcel } from '../../utils/excel'
import { DELETE_RECORD } from '../../store/mutation-types'
import ShowRecord from '../../components/record/ShowRecord'
import UpdateRecord from '../../components/record/UpdateRecord'
const { mapState, mapActions } = createNamespacedHelpers('records')
export default {
  name: 'TeacherShowRecord',
  components: {
    ShowRecord,
    UpdateRecord
  },
  inject: ['init'],
  data () {
    return {
      updateRecordVisible: false,
      curRecord: null
    }
  },
  computed: mapState({
    records: 'records'
  }),
  methods: {
    ...mapActions({
      deleteRecord: DELETE_RECORD
    }),
    onDelete (id) {
      this.deleteRecord(id)
    },
    onUpdate (record) {
      this.curRecord = record
      this.updateRecordVisible = true
    },
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
