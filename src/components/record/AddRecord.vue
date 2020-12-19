<template>
  <a-modal
    centered
    :visible="visible"
    :confirm-loading="loading"
    :mask-closable="false"
    :destroy-on-close="true"
    title="参赛登记"
    ok-text="确认参赛"
    cancel-text="取消"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-form
      ref="form"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      :model="formData"
      :rules="rules"
    >
      <a-form-item
        label="成绩"
        name="score"
      >
        <a-input
          v-model:value="formData.score"
          placeholder="比赛成绩"
          :auto-focus="true"
        />
      </a-form-item>
      <a-form-item
        label="导师"
        name="teacher"
      >
        <a-select
          v-model:value="formData.teacher"
          show-search
          placeholder="选择导师，没有可不填"
        >
          <a-select-option
            v-for="teacher in teachers"
            :key="teacher.account"
            :value="`${teacher.account}-${teacher.name}`"
          >
            {{ teacher.account }} - {{ teacher.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { mapState } from 'vuex';
import { ADD_RECORD } from '@/store/types';

export default {
  name: 'AddRecord',
  props: {
    visible: Boolean,
    race: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:visible'],
  data() {
    return {
      loading: false,
      formData: {
        teacher: '',
        score: '',
      },
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapState('users', ['teachers']),
  },
  beforeCreate() {
    this.rules = {
      score: [{
        required: true,
        message: '请输入比赛成绩',
      }],
    };
  },
  methods: {
    onCancel() {
      this.$emit('update:visible', false);
    },
    onOk() {
      this.$refs.form.validate().then(values => {
        let teacher = {};
        if (values.teacher) {
          const [tid, tname] = values.teacher.split('-');
          teacher = { tid, tname };
        }
        const result = {
          id: this.race._id, // record的id为race的_id
          title: this.race.title,
          date: this.race.date,
          sid: this.user.account, // 当前登录用户
          sname: this.user.name,
          score: values.score,
          ...teacher,
        };
        this.$store.dispatch(
          `records/${ADD_RECORD}`,
          result,
        ).then(_ => {
          this.onCancel();
        }).catch(e => e).finally(() => {
          this.loading = false;
        });
      });
    },
  },
};
</script>
