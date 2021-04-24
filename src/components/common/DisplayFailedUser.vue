<template>
  <div>
    <div style="margin-bottom: 20px">
      <span style="color: limegreen">
        <a-icon type="check-circle" />
        <span>成功 {{ users.length - fail.length }} 人</span>
      </span>
      <a-divider type="vertical" />
      <span style="color: red">
        <a-icon type="exclamation-circle" />
        <span>失败 {{ fail.length }} 人</span>
      </span>
    </div>
    <span>失败详情：</span>
    <a-divider style="margin: 5px 0 10px 0" />
    <a-list
      size="small"
      :grid="{ gutter: 16, column: 3 }"
      :data-source="fail"
      :pagination="{
        pageSize: 12,
        simple: true,
      }"
    >
      <template #renderItem="item">
        <a-list-item>
          <a-tag>{{ item.name }}({{ item[primaryKey] }})</a-tag>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'DisplayFailedUser',
  props: {
    primaryKey: {
      type: String,
      required: true,
      validator: value => ['sid', 'tid'].includes(value),
    },
    users: {
      type: Array,
      required: true,
    },
    fail: {
      type: Array,
      required: true,
    },
  },
};
</script>
