<template>
  <GlobalLayout>
    <TabLayout />
  </GlobalLayout>
</template>

<script>
import GlobalLayout from '../layouts/GlobalLayout';
import TabLayout from '../layouts/TabLayout';

export default {
  name: 'Home',
  metaInfo: {
    title: '管理员',
  },
  components: { TabLayout, GlobalLayout },
};
</script>
