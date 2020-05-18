<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="记录管理"
      sub-title="查看参赛记录信息"
      style="padding: 0; margin-bottom: 20px"
    >
      <template #extra>
        <a-button-group class="button-group">
          <a-button @click="refresh">
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
    <ShowRecord
      :type="type"
      :loading="loading"
      :records="records"
      @delete-record="onDelete"
      @update-record="onUpdate"
    />
    <UpdateRecord
      v-if="updateRecordVisible"
      :visible.sync="updateRecordVisible"
      :record="curRecord"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { throttle, omit } from 'lodash'
import { makeExcel } from '../../utils/excel'
import ShowRecord from '../record/ShowRecord'
import { DELETE_RECORD, SET_RECORD_LIST } from '../../store/mutation-types'
const { mapState, mapActions } = createNamespacedHelpers('records')
export default {
  name: 'Record',
  components: {
    ShowRecord,
    UpdateRecord: import(
      /* webpackChunkName: "UpdateRecord" */
      /* webpackPrefetch: true */
      './UpdateRecord'
    )
  },
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['student', 'teacher', 'admin'].includes(value)
      }
    }
  },
  data () {
    return {
      loading: true,
      updateRecordVisible: false,
      curRecord: null
    }
  },
  computed: mapState({
    records: 'records'
  }),
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions({
      setRecordList: SET_RECORD_LIST,
      deleteRecord: DELETE_RECORD
    }),
    refresh: throttle(function () {
      this.init()
    }, 500),
    init () {
      let promise
      const { account } = this.$store.state.user
      this.loading = true
      switch (this.type) {
        case 'student':
          promise = this.setRecordList({ type: 'sid', value: account })
          break
        case 'teacher':
          promise = this.setRecordList({ type: 'tid', value: account })
          break
        default: // admin
          promise = this.setRecordList()
      }
      promise.then(res => {
        this.loading = false
      })
    },
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
