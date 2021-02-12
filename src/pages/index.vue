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
  components: { TabLayout, GlobalLayout },
};
</script>
