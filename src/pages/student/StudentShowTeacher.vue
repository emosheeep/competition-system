<template>
  <div>
    <a-page-header
      title="教师信息"
      sub-title="了解教师基本信息"
      style="padding: 0; margin-bottom: 10px"
    >
      <template #extra>
        <a-input-search
          placeholder="搜索 工号/姓名"
          style="width: 200px"
          @search="onSearch"
          @change="onChange"
        />
        <a-button @click="init">
          刷新
        </a-button>
      </template>
    </a-page-header>
    <a-list
      row-key="account"
      :data-source="teachers"
      :pagination="{
        showSizeChanger: true,
        showQuickJumper: true
      }"
    >
      <template #renderItem="item">
        <a-list-item>
          <a-list-item-meta :description="item.description">
            <template #title>
              {{ item.account }}
              <a-divider type="vertical" />
              {{ item.name }}
              <template v-if="item.rank">
                <a-divider type="vertical" />
                <a-tag color="cyan">
                  {{ item.rank }}
                </a-tag>
              </template>
            </template>
            <template #avatar>
              <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'StudentShowTeacher',
  inject: {
    init: 'init',
  },
  data () {
    return {
      isSearching: false,
      result: [],
    }
  },
  computed: {
    teachers () {
      if (this.isSearching) {
        return this.result
      }
      return this.$store.state.users.teachers
    },
  },
  methods: {
    onSearch (key) {
      const { teachers } = this.$store.state.users
      this.result = teachers.filter(item => {
        return item.name.includes(key) || item.account.includes(key)
      })
      this.isSearching = true
    },
    onChange ({ target: { value } }) {
      if (value === '') {
        this.result.splice(0)
        this.isSearching = false
      }
    },
  },
}
</script>
