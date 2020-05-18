<template>
  <a-modal
    centered
    :visible="visible"
    :confirm-loading="loading"
    :mask-closable="false"
    title="参赛登记"
    ok-text="确认参赛"
    cancel-text="取消"
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-row
      align="middle"
      type="flex"
      style="user-select: none"
    >
      <a-col span="6">
        请选择指导老师：
      </a-col>
      <a-col span="11">
        <a-auto-complete
          :data-source="results"
          style="width: 200px"
          placeholder="职工号/教师姓名"
          @select="onSelect"
          @search="onSearch"
        />
      </a-col>
      <a-col span="7">
        <span style="color: red">{{ tips }}</span>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import { debounce } from 'lodash'
import { createNamespacedHelpers } from 'vuex'
import { ADD_RECORD } from '../../store/mutation-types'

const { mapState } = createNamespacedHelpers('student')
export default {
  name: 'AddRecord',
  props: {
    visible: Boolean,
    race: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      selected: false,
      tips: '', // 信息填写不完整警告
      results: [], // 搜索结果数组
      tid: '',
      tname: ''
    }
  },
  computed: {
    ...mapState({
      teachers: ({ teachers }) => teachers.map(item => {
        return `${item.account}-${item.name}`
      })
    }),
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    onSelect (value) {
      this.selected = true
      const [tid, tname] = value.split('-')
      this.tid = tid
      this.tname = tname
    },
    onSearch (value) {
      this.tips = ''
      this.results = !value
        ? []
        : this.teachers.filter(item => item.includes(value))
    },
    onCancel () {
      this.$emit('update:visible', false)
    },
    onOk: debounce(function () {
      if (!this.selected) {
        return (this.tips = '请选择教师！')
      }
      this.$store.dispatch(`records/${ADD_RECORD}`, {
        id: this.race._id,
        title: this.race.title,
        date: this.race.date,
        sid: this.user.account, // 当前登录用户
        sname: this.user.name,
        tid: this.tid,
        tname: this.tname
      }).then(_ => {
        this.onCancel()
      }).catch(e => e).finally(() => {
        this.loading = false
      })
    }, 200)
  }
}
</script>

<style scoped>

</style>
