<template>
  <div class="container">
    <a-descriptions
      :title="`赛事详情：${race.title}`"
      style="padding: 10px"
    >
      <a-descriptions-item label="主办方">
        {{ race.sponsor }}
      </a-descriptions-item>
      <a-descriptions-item label="类别">
        {{ race.type }}
      </a-descriptions-item>
      <a-descriptions-item label="级别">
        {{ race.level }}
      </a-descriptions-item>
      <a-descriptions-item label="时间">
        {{ formatDate(race.date) }}
      </a-descriptions-item>
      <a-descriptions-item label="地点">
        {{ race.location }}
      </a-descriptions-item>
      <br>
      <a-descriptions-item label="描述">
        {{ race.description }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'Detail',
  props: {
    race: {
      type: Object,
      required: true,
    },
    records: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
  },
};
</script>
