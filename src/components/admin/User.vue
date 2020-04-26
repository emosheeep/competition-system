<template>
  <div class="container">
    <a-button-group>
      <a-button type="primary" @click="visible = true">新增赛事</a-button>
      <a-button>M</a-button>
      <a-button>R</a-button>
    </a-button-group>

    <!--数据列表-->
    <a-table
      rowKey="raceID"
      :bordered="true"
      :columns="columns"
      :dataSource="data"
    />

    <!--弹出层表单——添加新项-->
    <a-modal
      :visible="visible"
      title='Create a new collection'
      okText='Create'
      @cancel="onCancel"
      @ok="onOk"
    >
      <AddUser />
    </a-modal>
  </div>
</template>

<script>
import { getUserList } from '../../plugins/api'
import AddUser from './AddUser'

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
export default {
  name: 'Race',
  components: { AddUser },
  data () {
    return {
      visible: true,
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
    onOk (e) {
      console.log('ok')
    },
    onCancel (e) {
      console.log('failed')
      this.visible = false
    }
  }
}
</script>

<style scoped lang="stylus">
  .container
    padding 20px
    background white
</style>
