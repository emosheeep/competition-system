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
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      :form="form"
    >
      <a-form-item label="成绩">
        <a-input
          v-decorator="decorator.score"
          placeholder="比赛成绩"
          :auto-focus="true"
        />
      </a-form-item>
      <a-form-item label="导师">
        <a-select
          v-decorator="decorator.teacher"
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
import { ADD_RECORD } from '../../store/types'
export default {
  name: 'AddRecord',
  props: {
    visible: Boolean,
    race: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      loading: false,
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    teachers () {
      return this.$store.state.users.teachers
    },
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'add-record' })
    this.decorator = decorator
  },
  methods: {
    onCancel () {
      this.$emit('update:visible', false)
    },
    onOk () {
      this.form.validateFields().then(values => {
        let teacher = {}
        if (values.teacher) {
          const [tid, tname] = values.teacher.split('-')
          teacher = { tid, tname }
        }
        const result = {
          id: this.race._id, // record的id为race的_id
          title: this.race.title,
          date: this.race.date,
          sid: this.user.account, // 当前登录用户
          sname: this.user.name,
          score: values.score,
          ...teacher,
        }
        this.$store.dispatch(
          `records/${ADD_RECORD}`,
          result,
        ).then(_ => {
          this.onCancel()
        }).catch(e => e).finally(() => {
          this.loading = false
        })
      })
    },
  },
}

const decorator = {
  teacher: ['teacher'],
  score: ['score', {
    rules: [{
      required: true,
      message: '请输入比赛成绩',
    }],
  }],
}
</script>

<style scoped>

</style>
