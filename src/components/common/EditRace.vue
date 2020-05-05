<template>
  <a-modal
    centered
    :visible="visible"
    :confirm-loading="loading"
    :title="type === 'add' ? '新增赛事' : '更新数据'"
    :ok-text="type === 'add' ? '创建' : '更新'"
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
          :disabled-date="disableDate"
        />
      </a-form-item>
      <a-form-item label="年度" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-select v-decorator="decorator.year" style="width: 120px">
          <a-select-option v-for="y in years" :key="y" :value="y">{{ y }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="级别" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-select v-decorator="decorator.level" style="width: 120px">
          <a-select-option value="校级">校级</a-select-option>
          <a-select-option value="省级">省级</a-select-option>
          <a-select-option value="国家级一般">国家级一般</a-select-option>
          <a-select-option value="国家级重点">国家级重点</a-select-option>
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
import moment from 'moment'
import { ADD_RACE, UPDATE_RACE } from '../../store/mutation-types'
const { mapActions } = createNamespacedHelpers('races')

export default {
  name: 'EditRace',
  props: {
    visible: Boolean,
    race: Object,
    type: {
      type: String,
      default: 'add',
      validator (value) {
        return ['add', 'update'].includes(value)
      }
    }
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
    this.form = this.$form.createForm(this, { name: 'add-races' })
  },
  mounted () {
    if (this.type === 'update') {
      const temp = {}
      for (const key of Object.keys(this.race)) {
        if (!key.startsWith('_')) {
          temp[key] = this.race[key]
        }
      }
      temp.date = moment(temp.date)
      this.form.setFieldsValue(temp)
    }
  },
  methods: {
    ...mapActions({
      addRace: ADD_RACE,
      updateRace: UPDATE_RACE
    }),
    disableDate (cur) {
      const yesterday = moment().startOf('day')
      return cur.isSameOrBefore(yesterday)
    },
    onOk (e) {
      this.form.validateFields().then(data => {
        this.loading = true
        data.date = data.date.valueOf() // 将组件默认的moment对象转换为时间戳
        return this.type === 'add'
          ? this.addRace(data)
          : this.updateRace({ id: this.race._id, data })
      }).then(_ => {
        this.$emit('update:visible', false)
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    onCancel (e) {
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
    initialValue: '校级'
  }],
  year: ['year', {
    initialValue: years[0]
  }],
  description: ['description']
}

</script>

<style scoped>

</style>
