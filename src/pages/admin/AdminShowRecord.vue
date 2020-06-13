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

    <a-button-group>
      <a-button
        :type="isMultiple ? 'primary' : ''"
        @click="isMultiple = !isMultiple"
      >
        {{ isMultiple ? '取消' : '批量删除' }}
      </a-button>
      <a-popconfirm
        v-if="isMultiple"
        title="确认删除？"
        ok-text="确认"
        cancel-text="取消"
        placement="topRight"
        @confirm="() => $refs.record.multipleDelete()"
      >
        <template #icon>
          <a-icon
            type="question-circle-o"
            style="color: orange"
          />
        </template>
        <a-button>确认删除</a-button>
      </a-popconfirm>
    </a-button-group>
    <a-divider style="margin-top: 10px;" />
    <ShowRecord
      ref="record"
      type="admin"
      :data="records"
      :multiple="isMultiple"
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
import { createNamespacedHelpers } from 'vuex'
import { omit } from 'lodash'
import { makeExcel } from '../../utils/excel'
import ShowRecord from '../../components/record/ShowRecord'
import UpdateRecord from '../../components/record/UpdateRecord'
import { DELETE_RECORD } from '../../store/mutation-types'
const { mapState, mapActions } = createNamespacedHelpers('records')
export default {
  name: 'AdminShowRecord',
  components: {
    ShowRecord,
    UpdateRecord
  },
  inject: ['init'],
  data () {
    return {
      updateRecordVisible: false,
      isMultiple: false,
      curRecord: {}
    }
  },
  computed: mapState({
    records: 'records'
  }),
  methods: {
    ...mapActions([DELETE_RECORD]),
    onDelete (data) {
      this.DELETE_RECORD(data).finally(() => {
        this.isMultiple = false
      })
    },
    onUpdate (record) {
      this.curRecord = record
      this.updateRecordVisible = true
    },
    exportExcel () {
      makeExcel({
        records: this.records.map(item => {
          const temp = omit(item, ['_id', 'id'])
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
