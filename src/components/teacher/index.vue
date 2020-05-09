<template>
  <div>
    <a-page-header
      :back-icon="false"
      title="竞赛列表"
      subTitle="已录入系统的所有竞赛，点击详情查看参赛名单"
      style="padding: 0; margin-bottom: 20px"
    />
    <ShowRace type="teacher" />
  </div>
</template>

<script>
import ShowRace from '../race/ShowRace'
export default {
  name: 'ShowRaceInTeacher',
  components: { ShowRace }
}
</script>

<style scoped>

</style>
