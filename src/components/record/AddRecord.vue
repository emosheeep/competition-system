<template>
  <a-form-model
    ref="form"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    :model="formData"
    :rules="rules"
  >
    <a-form-model-item label="成绩" prop="score">
      <a-input v-model="formData.score" placeholder="比赛成绩" auto-focus />
    </a-form-model-item>
    <a-form-model-item label="导师" prop="tid">
      <a-select
        v-model="formData.tid"
        show-search
        allow-clear
        placeholder="请选择导师，没有可不填"
        :filter-option="false"
        :show-arrow="false"
        :options="teachers"
        @search="onSearch"
      >
        <a-spin
          v-if="loading"
          slot="notFoundContent"
          size="small"
          style="width: 100%; height: 100px; line-height: 100px"
        />
      </a-select>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { debounce } from 'lodash-es';

export default {
  name: 'AddRecord',
  data() {
    return {
      teachers: [],
      loading: false,
      formData: {
        score: '',
        tid: undefined,
      },
      rules: {
        score: { required: true, message: '请输入比赛成绩' },
      },
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(() => this.formData);
    },
    onSearch: debounce(function(query) {
      if (!query) return;
      this.loading = true;
      this.$api.getUserList({
        type: 'teacher',
        name: query,
        offset: 1,
        limit: 10,
      }).then(data => {
        this.teachers = data.data.map(item => ({
          label: `(${item.tid})${item.name}`,
          value: item.tid,
        }));
      }).catch(e => {
        this.$message.error(e.msg || '查询失败');
      }).finally(() => {
        this.loading = false;
      });
    }, 300),
  },
};
</script>
