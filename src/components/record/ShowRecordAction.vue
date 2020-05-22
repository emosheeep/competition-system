<template>
  <div>
    <!--详情界面的纯展示（本身收到columns限制不会渲染，这里以防万一）-->
    <template v-if="common" />
    <!--教师，管理员的编辑和删除功能-->
    <template v-if="teacherAndAdmin">
      <a @click="$emit('edit-record', record)">
        <a-icon type="edit" />
      </a>
      <a-divider type="vertical" />
      <a-popconfirm
        title="确认删除？"
        ok-text="确认"
        cancel-text="取消"
        @confirm="$emit('delete-record', record.id)"
      >
        <template #icon>
          <a-icon
            type="question-circle-o"
            style="color: orange"
          />
        </template>
        <a><a-icon type="delete" /></a>
      </a-popconfirm>
    </template>
    <!--学生的附件上传功能-->
    <template v-if="student">
      <div v-if="record.uploaded">
        <a>预览</a>
        <a-divider type="vertical" />
        <a @click="$emit('upload', record)">重传</a>
      </div>
      <div v-else>
        <a @click="$emit('upload', record)">附件上传</a>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'RecordAction',
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['student', 'admin', 'teacher', 'common'].includes(value)
      }
    },
    record: {
      type: Object,
      required: true
    }
  },
  computed: {
    teacherAndAdmin () {
      const { type } = this
      return type === 'teacher' || type === 'admin'
    },
    common () {
      return this.type === 'common'
    },
    student () {
      return this.type === 'student'
    }
  }
}
</script>
