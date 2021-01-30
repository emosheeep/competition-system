<template>
  <GlobalLayout :loading="loading">
    <TabLayout />
  </GlobalLayout>
</template>

<script>
import GlobalLayout from '../layouts/GlobalLayout';
import TabLayout from '../layouts/TabLayout';
import { SET_RACE_LIST, SET_RECORD_LIST, SET_USER_LIST } from '../store/mutation-types';

export default {
  name: 'Home',
  metaInfo: {
    title: '管理员',
  },
  components: { TabLayout, GlobalLayout },
  provide() {
    return {
      init: this.init,
    };
  },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      Promise.all([
        this.$store.dispatch(`users/${SET_USER_LIST}`),
        this.$store.dispatch(`races/${SET_RACE_LIST}`),
        this.$store.dispatch(`records/${SET_RECORD_LIST}`),
      ]).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>
