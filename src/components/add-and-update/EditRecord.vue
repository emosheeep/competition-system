<template>
  <a-form :form="form">
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="赛事ID"
    >
      <a-input
        v-decorator="decorator.id"
        disabled
        placeholder="赛事ID"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="赛事名称"
    >
      <a-input
        v-decorator="decorator.title"
        disabled
        placeholder="赛事名称"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="比赛时间"
    >
      <a-date-picker
        v-decorator="decorator.date"
        disabled
        placeholder="比赛时间"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="学生账号"
    >
      <a-input
        v-decorator="decorator.sid"
        disabled
        placeholder="学生账号"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="学生姓名"
    >
      <a-input
        v-decorator="decorator.sname"
        disabled
        placeholder="学生姓名"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="教师账号"
    >
      <a-input
        v-decorator="decorator.tid"
        disabled
        placeholder="教师账号"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="教师姓名"
    >
      <a-input
        v-decorator="decorator.tname"
        disabled
        placeholder="教师姓名"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="成绩"
    >
      <a-input
        ref="score"
        v-decorator="decorator.score"
        placeholder="填入获奖情况"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import EditMixin from './edit-mixin'

export default {
  name: 'EditRecord',
  mixins: [EditMixin],
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      decorator
    }
  },
  mounted () {
    this.$refs.score.focus()
  }
}

/**
 * 定义decorator
 */
const decorator = {
  id: ['id'],
  title: ['title'],
  date: ['date'],
  sid: ['sid'],
  sname: ['sname'],
  tid: ['tid'],
  tname: ['tname'],
  score: ['score']
}
</script>
