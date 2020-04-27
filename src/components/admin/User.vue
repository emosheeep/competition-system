<template>
  <div class="container">
    <a-button-group>
      <a-button @click="addUser('student')">学生</a-button>
      <a-button @click="addUser('teacher')">教师</a-button>
      <a-button @click="addUser('admin')">管理员</a-button>
    </a-button-group>

    <!--数据列表-->
<!--    <a-table-->
<!--      rowKey="raceID"-->
<!--      :bordered="true"-->
<!--      :columns="columns"-->
<!--      :dataSource="data"-->
<!--    />-->

    <!--弹出层表单——添加新项-->
    <AddUser
      v-if="visible"
      :visible.sync="visible"
      :type="type"
    />
  </div>
</template>

<script>
import { getUserList } from '../../plugins/api'
import AddUser from './AddUser'
export default {
  name: 'Race',
  components: {
    AddUser
  },
  data () {
    return {
      visible: false,
      type: 'student',
      data: [],
      columns
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'add-race' })
  },
  mounted () {
    getUserList().then(({ data }) => {
      this.data = data
      console.log(data)
    })
  },
  methods: {
    addUser (type) {
      this.type = type
      this.visible = true
    }
  }
}
const columns = [
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: 'Date',
    dataIndex: 'date'
  },
  {
    title: 'Location',
    dataIndex: 'location'
  },
  {
    title: 'Level',
    dataIndex: 'level'
  },
  {
    title: 'Year',
    dataIndex: 'year'
  },
  {
    title: 'Sponsor',
    dataIndex: 'sponsor'
  },
  {
    title: 'Description',
    dataIndex: 'description'
  }
]

</script>

<style scoped lang="stylus">
  .container
    padding 20px
    background white
</style>
