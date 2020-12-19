<template>
  <a-drawer
    height="80%"
    placement="bottom"
    title="赛事详情"
    :visible="visible"
    :destroy-on-close="true"
    @close="$emit('update:visible', false)"
  >
    <a-button
      style="float: right"
      @click="init"
    >
      刷新
    </a-button>
    <Detail
      :race="race"
      :records="records"
    />
    <Loading :loading="loading" />
  </a-drawer>
</template>

<script>
import { getRaceList, getRecordList } from '@/api';
import Detail from './Detail';
import Loading from '../common/Loading';

export default {
  name: 'RaceDetail',
  components: { Loading, Detail },
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['admin', 'teacher'].includes(value);
      },
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  data() {
    return {
      loading: false,
      race: {},
      records: [],
    };
  },
  watch: {
    visible(isVisible) {
      if (isVisible) {
        this.init();
      }
    },
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
