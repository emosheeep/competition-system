<template>
  <!--管理员的编辑和删除功能-->
  <template v-if="identity === 'admin'">
    <!--编辑和删除 需要管理员权限为root或write-->
    <span>
      <a @click="$emit('update-record', record)">
        <EditOutlined />
      </a>
      <a-divider type="vertical" />
      <a-popconfirm
        title="确认删除？"
        ok-text="确认"
        cancel-text="取消"
        @confirm="$emit('delete-record', record)"
      >
        <template #icon>
          <QuestionCircleOutlined style="color: orange" />
        </template>
        <a><DeleteOutlined /></a>
      </a-popconfirm>
      <a-divider type="vertical" />
    </span>
    <a-tooltip
      placement="top"
      title="查看详情"
    >
      <a @click.prevent="$emit('detail', record)">
        <FileTextOutlined />
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
        <FileTextOutlined />
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
          <EditOutlined />
        </a>
      </a-tooltip>
      <a-divider type="vertical" />
      <a-tooltip
        placement="top"
        title="上传附件"
      >
        <a @click="$emit('upload', record)">
          <CloudUploadOutlined />
        </a>
      </a-tooltip>
      <a-divider type="vertical" />
    </template>
    <a-tooltip
      placement="top"
      title="查看详情"
    >
      <a @click.prevent="$emit('detail', record)">
        <FileTextOutlined />
      </a>
    </a-tooltip>
  </template>
</template>

<script>
import {
  FileTextOutlined,
  CloudUploadOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue';

export default {
  name: 'RecordAction',
  components: {
    FileTextOutlined,
    CloudUploadOutlined,
    EditOutlined,
    QuestionCircleOutlined,
    DeleteOutlined,
  },
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  emits: ['update-record', 'delete-record', 'detail', 'upload'],
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
