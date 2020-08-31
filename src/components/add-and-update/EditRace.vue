<template>
  <a-form
    ref="form"
    :model="formData"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item
      label="名称"
      name="title"
    >
      <a-input
        v-model:value="formData.title"
        placeholder="赛事名称"
      />
    </a-form-item>
    <a-form-item
      label="主办方"
      name="sponsor"
    >
      <a-input
        v-model:value="formData.sponsor"
        placeholder="主办方"
      />
    </a-form-item>
    <a-form-item
      label="地点"
      name="location"
    >
      <a-input
        v-model:value="formData.location"
        placeholder="地点"
      />
    </a-form-item>
    <a-form-item
      label="时间"
      name="date"
    >
      <a-date-picker
        v-model:value="formData.date"
        placeholder="选择比赛时间"
        :disabled-date="disableDate"
      />
    </a-form-item>
    <a-form-item
      label="类别"
      name="type"
    >
      <a-select
        v-model:value="formData.type"
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
    <a-form-item
      label="级别"
      name="level"
    >
      <a-select
        v-model:value="formData.level"
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
    <a-form-item
      label="描述"
      name="description"
    >
      <a-textarea
        v-model:value="formData.description"
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
  data () {
    return {
      formData: {
        title: '',
        sponsor: '',
        date: null,
        location: '',
        level: '校级',
        type: '',
        description: '',
      },
    }
  },
  beforeMount () {
    this.rules = rules
  },
  methods: {
    disableDate (cur) {
      const yesterday = moment().startOf('day')
      return cur.isSameOrBefore(yesterday)
    },
    initData () {
      const { data } = this
      // 挨个字段对应是为了移除不必要的、可能存在的_id字段
      this.formData = {
        title: data.title,
        sponsor: data.sponsor,
        date: moment(data.date),
        location: data.location,
        level: data.level,
        type: data.type,
        description: data.description,
      }
    },
  },
}

const rules = {
  title: [{
    required: true,
    message: '请输入赛事名称！',
  }],
  sponsor: [{
    required: true,
    message: '请输入主办方！',
  }],
  date: [{
    required: true,
    message: '选择时间！',
  }],
  location: [{
    required: true,
    message: '请填写地点！',
  }],
  type: [{
    required: true,
    message: '请选择赛事类别！',
  }],
}
</script>

<style scoped>

</style>
