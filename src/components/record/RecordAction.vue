<template>
  <a-space>
    <a v-if="$has('record:update')" @click="editRecord">
      <a-icon type="edit" />
    </a>
    <DelPopConfirm v-if="$has('record:delete')" @confirm="deleteRecord" />
  </a-space>
</template>

<script>
import AuditRecord from '@/components/record/AuditRecord';

export default {
  name: 'RecordAction',
  props: {
    record: {
      type: Object,
      required: true,
    },
    freshData: {
      type: Function,
      default() {},
    },
  },
  computed: {
    identity() {
      return this.$store.state.user.identity;
    },
  },
  methods: {
    deleteRecord() {
      this.$api.deleteRecord([this.record.record_id]).then(data => {
        this.$message.success(data.msg);
        this.freshData();
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '删除失败');
      });
    },
    editRecord() {
      if (this.identity === 'student') {
        this.studentEditRecord();
      } else {
        this.auditRecord();
      }
    },
    studentEditRecord() {
      let score = this.record.score;
      this.$confirm({
        title: '修改成绩',
        content: h => (
          <a-form-model>
            <a-form-model-item required={true} label="成绩录入">
              <a-input
                value={score}
                placeholder="请输入比赛成绩"
                onInput={e => { score = e.target.value; }}
              />
            </a-form-model-item>
          </a-form-model>
        ),
        onOk: () => {
          let msg;
          score = score.trim();
          if (!score) {
            msg = '请输入成绩';
          } else if (this.record.score === score) {
            msg = '未检测到变动';
          }
          if (msg) {
            this.$message.warn(msg);
            throw new Error(msg);
          }
          return this.$api.updateRecord({
            record_id: this.record.record_id,
            score,
          }).then(() => {
            this.$message.success('修改成功');
            this.freshData();
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '修改失败');
            throw e;
          });
        },
      });
    },
    auditRecord() {
      let vnode;
      this.$confirm({
        title: '审核',
        content: h => (vnode = <AuditRecord record={this.record} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.updateRecord({
            record_id: this.record.record_id,
            status: values.status,
            description: values.description,
          }).then(() => {
            this.$message.success('提交成功');
            this.freshData();
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '提交失败');
            throw e;
          });
        },
      });
    },
  },
};
</script>
