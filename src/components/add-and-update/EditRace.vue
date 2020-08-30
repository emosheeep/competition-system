<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
  >
    <a-form-item label="名称">
      <a-input
        v-decorator="decorator.title"
        placeholder="赛事名称"
      />
    </a-form-item>
    <a-form-item label="主办方">
      <a-input
        v-decorator="decorator.sponsor"
        placeholder="主办方"
      />
    </a-form-item>
    <a-form-item
      label="地点"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input
        v-decorator="decorator.location"
        placeholder="地点"
      />
    </a-form-item>
    <a-form-item label="时间">
      <a-date-picker
        v-decorator="decorator.date"
        placeholder="选择比赛时间"
        :disabled-date="disableDate"
      />
    </a-form-item>
    <a-form-item label="类别">
      <a-select
        v-decorator="decorator.type"
        placeholder="请选择赛事类别"
        style="width: 175px"
      >
        <a-select-option
          v-for="item in ['A', 'B', 'C', 'D', 'E', 'F']"
          :key="item"
          :value="item"
        >
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="级别">
      <a-select
        v-decorator="decorator.level"
        style="width: 120px"
      >
        <a-select-option value="校级">
          校级
        </a-select-option>
        <a-select-option value="省级">
          省级
        </a-select-option>
        <a-select-option value="国家级一般">
          国家级一般
        </a-select-option>
        <a-select-option value="国家级重点">
          国家级重点
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="描述">
      <a-textarea
        v-decorator="decorator.description"
        placeholder="描述"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import moment from 'moment'
import EditMixin from './edit-mixin'

export default {
  name: 'EditRace',
  mixins: [EditMixin],
  beforeMount () {
    this.decorator = decorator
  },
  methods: {
    disableDate (cur) {
      const yesterday = moment().startOf('day')
      return cur.isSameOrBefore(yesterday)
    },
    initData () {
      const { data } = this
      this.form.setFieldsValue({
        title: data.title,
        sponsor: data.sponsor,
        date: moment(data.date),
        location: data.location,
        level: data.level,
        type: data.type,
        description: data.description,
      })
    },
  },
}

// 定义装饰器
const decorator = {
  title: ['title', {
    rules: [{
      required: true,
      message: '请输入赛事名称！',
    }],
  }],
  sponsor: ['sponsor', {
    rules: [{
      required: true,
      message: '请输入主办方！',
    }],
  }],
  date: ['date', {
    rules: [{
      required: true,
      message: '选择时间！',
    }],
  }],
  location: ['location', {
    rules: [{
      required: true,
      message: '请填写地点！',
    }],
  }],
  level: ['level', {
    initialValue: '校级',
  }],
  type: ['type', {
    rules: [{
      required: true,
      message: '请选择赛事类别！',
    }],
  }],
  description: ['description'],
}
</script>

<style scoped>

</style>
