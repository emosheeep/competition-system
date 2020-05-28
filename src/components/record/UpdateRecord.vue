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
    <a-form :form="form">
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

      <!--以下内容管理员才能修改-->
      <template v-if="identity === 'admin'">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="状态"
        >
          <a-radio-group
            v-decorator="decorator.state"
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
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="原因"
        >
          <a-input
            v-decorator="decorator.reason"
            :auto-focus="true"
            placeholder="为什么不通过？"
          />
        </a-form-item>
        <a-form-item
          v-else
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="备注"
        >
          <a-input
            v-decorator="decorator.description"
            placeholder="对审核结果加以说明"
          />
        </a-form-item>
      </template>
    </a-form>
  </a-modal>
</template>

<script>
import { UPDATE_RECORD } from '../../store/mutation-types'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('records')
export default {
  name: 'UpdateRecord',
  props: {
    visible: Boolean,
    record: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      decorator,
      reviewState: 'fulfilled'
    }
  },
  computed: {
    identity () {
      return this.$store.state.user.identity
    }
  },
  watch: {
    visible (isVisible) {
      if (!isVisible) return
      if (this.identity === 'admin') {
        this.adminInit()
      } else {
        this.$nextTick(() => {
          this.form.setFieldsValue({
            score: this.record.score
          })
        })
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    ...mapActions({
      updateRecord: UPDATE_RECORD
    }),
    onCancel (e) {
      this.$emit('update:visible', false)
    },
    adminInit () {
      const { record } = this
      let result = {}
      if (record.state === 'rejected') {
        // 渲染原因输入框
        this.reviewState = 'rejected'
        result = {
          state: 'rejected',
          score: record.score,
          reason: record.description
        }
      } else {
        // 渲染备注输入框
        this.reviewState = 'fulfilled'
        result = {
          state: 'fulfilled', // 默认为fulfilled
          score: record.score,
          description: record.description
        }
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(result)
        this.$refs.score.focus()
      })
    },
    changeReviewState ({ target: { value } }) {
      this.reviewState = value
    },
    confirm () {
      this.form.validateFields().then(values => {
        this.loading = true
        const description = values.state === 'rejected'
          ? values.reason
          : values.description
        return this.updateRecord({
          _id: this.record._id,
          score: values.score,
          state: values.state,
          description
        })
      }).then(_ => {
        this.$emit('update:visible', false)
      }).catch(console.warn).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    }
  }
}

/**
 * 定义decorator
 */
const decorator = {
  state: ['state'],
  score: ['score', {
    rules: [{
      required: true,
      message: '请填写成绩'
    }]
  }],
  description: ['description'],
  // 审核失败、原因是必填的
  reason: ['reason', {
    rules: [{
      required: true,
      message: '请填写失败原因'
    }]
  }]
}
</script>

<style scoped lang="stylus"></style>
