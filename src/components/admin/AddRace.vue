<template>
  <a-modal
    centered
    :visible="visible"
    :confirm-loading="loading"
    title='新增赛事'
    ok-text='创建'
    cancel-text="取消"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-form :form="form">
      <a-form-item label="名称" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input v-decorator="decorator.title" placeholder="赛事名称"/>
      </a-form-item>
      <a-form-item label="主办方" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input v-decorator="decorator.sponsor" placeholder="主办方"/>
      </a-form-item>
      <a-form-item label="地点" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input v-decorator="decorator.location" placeholder="地点"/>
      </a-form-item>
      <a-form-item label="时间" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-date-picker
          v-decorator="decorator.date"
          placeholder="选择比赛时间"
          :disabled-date="cur => cur < Date.now()"
        />
      </a-form-item>
      <a-form-item label="年度" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-select v-decorator="decorator.year" style="width: 120px">
          <a-select-option v-for="y in years" :key="y" :value="y">{{ y }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="级别" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-select v-decorator="decorator.level" style="width: 120px">
          <a-select-option value="0">校级</a-select-option>
          <a-select-option value="1">省级</a-select-option>
          <a-select-option value="3">国家级一般</a-select-option>
          <a-select-option value="2">国家级重点</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="描述" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-textarea v-decorator="decorator.description" placeholder="描述"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ADD_RACE } from '../../store/mutation-types'
const { mapActions } = createNamespacedHelpers('race')

export default {
  name: 'AddRace',
  props: {
    visible: Boolean
  },
  data () {
    return {
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      decorator,
      years
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'add-race' })
  },
  methods: {
    ...mapActions({
      addRace: ADD_RACE
    }),
    onOk (e) {
      this.form.validateFields().then(data => {
        this.loading = true
        data.date = data.date.valueOf() // 将组件默认的moment对象转换为时间戳
        return this.addRace(data)
      }).then(_ => {
        this.$emit('update:visible', false)
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    onCancel (e) {
      console.log('failed')
      this.$emit('update:visible', false)
    }
  }
}

// 初始化年份列表
const years = []
for (let y = new Date().getFullYear(), i = y; i <= y + 3; i++) {
  years.push(i)
}
// 定义装饰器
const decorator = {
  title: ['title', {
    rules: [{
      required: true,
      message: '请输入赛事名称！'
    }]
  }],
  sponsor: ['sponsor', {
    rules: [{
      required: true,
      message: '请输入主办方！'
    }]
  }],
  date: ['date', {
    rules: [{
      required: true,
      message: '选择时间！'
    }]
  }],
  location: ['location', {
    rules: [{
      required: true,
      message: '请填写地点！'
    }]
  }],
  level: ['level', {
    initialValue: '0'
  }],
  year: ['year', {
    initialValue: years[0]
  }],
  description: ['description']
}

</script>

<style scoped>

</style>
