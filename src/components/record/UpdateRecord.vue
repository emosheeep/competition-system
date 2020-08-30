<template>
  <a-modal
    centered
    :visible="visible"
    :confirm-loading="loading"
    :title="record.title"
    ok-text="更新"
    cancel-text="取消"
    @cancel="onCancel"
    @ok="confirm"
  >
    <a-form
      ref="form"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
      :model="formData"
      :rules="rules"
    >
      <a-form-item
        label="成绩"
        name="score"
      >
        <a-input
          ref="score"
          v-model:value="formData.score"
          placeholder="填入获奖情况"
        />
      </a-form-item>

      <!--以下内容管理员才能修改-->
      <template v-if="identity === 'admin'">
        <a-form-item
          label="状态"
          name="state"
        >
          <a-radio-group
            v-model:value="formData.state"
            @change="changeReviewState"
          >
            <a-radio value="fulfilled">
              通过审核
            </a-radio>
            <a-radio value="rejected">
              审核失败
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <!--审核失败是渲染原因-->
        <a-form-item
          v-if="reviewState === 'rejected'"
          label="原因"
          name="reason"
        >
          <a-input
            v-model:value="formData.reason"
            :auto-focus="true"
            placeholder="为什么不通过？"
          />
        </a-form-item>
        <a-form-item
          v-else
          label="备注"
          name="description"
        >
          <a-input
            v-model:value="formData.description"
            placeholder="对审核结果加以说明"
          />
        </a-form-item>
      </template>
    </a-form>
  </a-modal>
</template>

<script>
import { UPDATE_RECORD } from '@/store/types'
import { mapActions } from 'vuex'

export default {
  name: 'UpdateRecord',
  props: {
    visible: Boolean,
    record: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:visible'],
  data () {
    return {
      loading: false,
      reviewState: 'fulfilled',
      formData: {
        state: '',
        score: '',
        description: '',
        reason: '', // 若审核失败、则原因是必填的
      },
    }
  },
  computed: {
    identity () {
      return this.$store.state.user.identity
    },
  },
  watch: {
    visible (isVisible) {
      if (!isVisible) return
      if (this.identity === 'admin') {
        this.adminInit()
      } else {
        this.$nextTick(() => {
          this.formData.score = this.record.score
        })
      }
    },
  },
  beforeCreate () {
    this.rules = rules
  },
  methods: {
    ...mapActions('records', [UPDATE_RECORD]),
    onCancel (e) {
      this.$emit('update:visible', false)
    },
    adminInit () {
      const { record } = this
      console.log(record)
      let result = {}
      if (record.state === 'rejected') {
        this.reviewState = 'rejected' // rejected 渲染原因输入框
        result = {
          state: 'rejected',
          score: record.score,
          reason: record.description,
        }
      } else {
        this.reviewState = 'fulfilled' // fulfilled 渲染备注输入框
        result = {
          state: 'fulfilled', // 默认为fulfilled
          score: record.score,
          description: record.description,
        }
      }
      this.$nextTick(() => {
        this.formData = result
        this.$refs.score.focus()
      })
    },
    changeReviewState ({ target: { value } }) {
      this.reviewState = value
    },
    confirm () {
      this.$refs.form.validate().then(values => {
        this.loading = true
        const description = values.state === 'rejected'
          ? values.reason
          : values.description
        return this.UPDATE_RECORD({
          _id: this.record._id,
          score: values.score,
          state: values.state,
          description,
        })
      }).then(_ => {
        this.$emit('update:visible', false)
      }).catch(console.warn).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
  },
}

/**
 * 定义decorator
 */
const rules = {
  score: [{
    required: true,
    message: '请填写成绩',
  }],
  reason: [{
    required: true,
    message: '请填写失败原因',
  }],
}
</script>

<style scoped lang="stylus"></style>
