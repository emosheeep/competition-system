<template>
  <div>
    <a-button style="float: right" @click="init">
      刷新
    </a-button>
    <Detail :race="race" :records="records"/>
    <Loading :loading="loading" />
  </div>
</template>

<script>
import { getRaceList, getRecordList } from '../../api';
import Detail from './Detail';
import Loading from '../common/Loading';
export default {
  name: 'RaceDetail',
  components: { Loading, Detail },
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['admin', 'teacher'].includes(value);
      },
    },
  },
  data() {
    return {
      loading: false,
      race: {},
      records: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.loading) return;
      this.loading = true;
      const { id } = this;
      const { account } = this.$store.state.user;
      Promise.all([
        getRaceList({ _id: id }),
        this.type === 'teacher'
          ? getRecordList({ id, tid: account })
          : getRecordList({ id }),
      ]).then(([
        { data: races },
        { data: records },
      ]) => {
        this.race = races[0];
        this.records = records;
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>

</style>
