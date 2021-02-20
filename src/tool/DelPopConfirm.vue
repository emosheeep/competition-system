<template>
  <a-popconfirm
    v-on="$listeners"
    v-bind="props"
  >
    <template #icon>
      <a-icon
        type="question-circle-o"
        style="color: orange"
      />
    </template>
    <a>
      <slot>
        <a-icon type="delete" />
      </slot>
    </a>
  </a-popconfirm>
</template>

<script>
export default {
  name: 'DelPopConfirm',
  computed: {
    props() {
      return {
        title: '确认删除？',
        placement: 'left',
        ...this.$attrs,
      };
    },
  },
};
</script>
