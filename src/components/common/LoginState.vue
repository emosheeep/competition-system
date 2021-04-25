<template>
  <a-dropdown>
    <a-spin v-if="!user.name" size="small" />
    <div v-else class="header-avatar">
      <a-icon class="avatar" type="user" />
      <span class="name">{{ user.name }}</span>
    </div>
    <a-menu slot="overlay">
      <a-menu-item disabled>
        <a-icon type="smile" />
        {{ user.role && user.role.label }}
      </a-menu-item>
      <a-menu-item @click="modifySelfInfo">
        <a-icon type="user" />
        <span>个人信息</span>
      </a-menu-item>
      <a-menu-item @click="modifyPassword">
        <a-icon type="lock" />
        <span>修改密码</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import UpdatePassword from '@/components/common/UpdatePassword';
import EditStudent from '@/components/edit/EditStudent';
import EditTeacher from '@/components/edit/EditTeacher';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'LoginState',
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['initUser']),
    logout() {
      this.$store.commit('logout');
      this.$router.replace('/login');
    },
    modifyPassword() {
      let vnode;
      this.$drawer({
        title: '修改密码',
        content: h => (vnode = <UpdatePassword />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.updatePassword({
            account: this.user.account,
            identity: this.user.identity,
            oldVal: values.oldVal,
            newVal: values.newVal,
          }).then(() => {
            this.$message.success('修改成功');
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '修改失败');
            throw e;
          });
        },
      });
    },
    modifySelfInfo() {
      let vnode;
      this.$drawer({
        title: '修改个人信息',
        content: h => (vnode = this.user.identity === 'student'
          ? <EditStudent type="update" data={this.user} />
          : <EditTeacher type="update" data={this.user} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.updateUser(
            this.user.identity,
            values,
          ).then(() => {
            this.$message.success('修改成功');
            this.$store.dispatch('initUser');
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '修改失败');
            throw e;
          });
        },
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.header-avatar
  display inline-flex
  align-items center
  cursor pointer
  padding 0 10px
  .avatar
    position relative
    top -1px
    margin-right 8px
  .name
    font-weight 500
</style>
