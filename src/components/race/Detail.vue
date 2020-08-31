<template>
  <div class="container">
    <a-descriptions
      :title="race.title"
      style="padding: 10px"
    >
      <a-descriptions-item
        label="主办方"
        :span="2"
      >
        {{ race.sponsor }}
      </a-descriptions-item>
      <a-descriptions-item label="类别">
        {{ race.type }}
      </a-descriptions-item>
      <a-descriptions-item label="时间">
        {{ formatDate(race.date) }}
      </a-descriptions-item>
      <a-descriptions-item label="地点">
        {{ race.location }}
      </a-descriptions-item>
      <a-descriptions-item label="级别">
        {{ race.level }}
      </a-descriptions-item>
      <a-descriptions-item label="描述">
        {{ race.description }}
      </a-descriptions-item>
    </a-descriptions>
    <!--展示对应赛事的参赛人员，id为赛事id-->
    <ShowRecord :data="records" />
  </div>
</template>

<script>
import moment from 'moment'
import ShowRecord from '../record/ShowRecord'

export default {
  name: 'Detail',
  components: { ShowRecord },
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
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
  },
}
</script>
