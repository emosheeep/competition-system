<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="我的参赛记录"
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
      :data="records"
      @update-record="onUpdate"
    />
    <UpdateRecord
      ref="updateRecord"
      v-model:visible="updateRecordVisible"
      :record="curRecord"
    />
  </div>
</template>

<script>
import { omit } from 'lodash';
import { createNamespacedHelpers } from 'vuex';
import { makeExcel } from '@/utils/excel';
import ShowRecord from '../../components/record/ShowRecord';
import UpdateRecord from '../../components/record/UpdateRecord';

const { mapState } = createNamespacedHelpers('records');
export default {
  name: 'StudentShowRecord',
  components: {
    ShowRecord,
    UpdateRecord,
  },
  inject: ['init'],
  data() {
    return {
      updateRecordVisible: false,
      curRecord: {},
    };
  },
  computed: mapState({
    records: 'records',
  }),
  methods: {
    onUpdate(record) {
      this.updateRecordVisible = true;
      this.curRecord = record;
    },
    exportExcel() {
      makeExcel({
        records: this.records.map(item => {
          const temp = omit(item, ['_id', 'id']);
          temp.date = new Date(temp.date);
          return temp;
        }),
      });
    },
  },
};
</script>
