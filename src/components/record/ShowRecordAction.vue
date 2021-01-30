<template>
  <div>
    <!--管理员的编辑和删除功能-->
    <template v-if="identity === 'admin'">
      <!--编辑和删除 需要管理员权限为root或write-->
      <template>
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

    <!--教师只能查看-->
    <template v-else-if="identity === 'teacher'">
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
    <template v-else-if="identity === 'student'">
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
    record: {
      type: Object,
      required: true,
    },
  },
  computed: {
    identity() {
      return this.$store.state.user.identity;
    },
    isFulfilled() {
      return this.record.state === 'fulfilled';
    },
  },
};
</script>
