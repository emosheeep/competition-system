<template>
  <div>
    <!--详情界面的纯展示（本身受到columns限制不会渲染，这里以防万一）-->
    <template v-if="common" />

    <!--管理员的编辑和删除功能-->
    <template v-if="admin">
      <a @click="$emit('update-record', record)">
        <a-icon type="edit" />
      </a>
      <a-divider type="vertical" />
      <a-popconfirm
        title="确认删除？"
        ok-text="确认"
        cancel-text="取消"
        @confirm="$emit('delete-record', record)"
      >
        <template #icon>
          <a-icon
            type="question-circle-o"
            style="color: orange"
          />
        </template>
        <a><a-icon type="delete" /></a>
      </a-popconfirm>
      <a-divider type="vertical" />
      <a-tooltip
        placement="top"
        title="查看详情"
      >
        <a @click.prevent="$emit('detail', record)">
          <a-icon type="file-text" />
        </a>
      </a-tooltip>
    </template>

    <!--教师只能查看-->
    <template v-else-if="teacher">
      <a-tooltip
        placement="top"
        title="查看详情"
      >
        <a @click.prevent="$emit('detail', record)">
          <a-icon type="file-text" />
        </a>
      </a-tooltip>
    </template>

    <!--学生的附件上传功能-->
    <template v-if="student">
      <!--审核状态为成功（fulfilled）时，记录将锁定，不能再上传和修改-->
      <template v-if="!isFulfilled">
        <a-tooltip
          placement="top"
          title="编辑信息"
        >
          <a @click="$emit('update-record', record)">
            <a-icon type="edit" />
          </a>
        </a-tooltip>
        <a-divider type="vertical" />
        <a-tooltip
          placement="top"
          title="上传附件"
        >
          <a @click="$emit('upload', record)">
            <a-icon type="cloud-upload" />
          </a>
        </a-tooltip>
        <a-divider type="vertical" />
      </template>
      <a-tooltip
        placement="top"
        title="查看详情"
      >
        <a @click.prevent="$emit('detail', record)">
          <a-icon type="file-text" />
        </a>
      </a-tooltip>
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
        const types = ['student', 'admin', 'teacher', 'common']
        return types.includes(value)
      }
    },
    record: {
      type: Object,
      required: true
    }
  },
  computed: {
    admin () {
      return this.type === 'admin'
    },
    teacher () {
      return this.type === 'teacher'
    },
    common () {
      return this.type === 'common'
    },
    student () {
      return this.type === 'student'
    },
    isFulfilled () {
      return this.record.state === 'fulfilled'
    }
  }
}
</script>
