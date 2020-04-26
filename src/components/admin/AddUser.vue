<template>
  <a-form layout="vertical" :form="form">
    <a-form-item>
      <a-input v-decorator="account" placeholder="账号"/>
    </a-form-item>
    <a-form-item>
      <a-input v-decorator="password" placeholder="密码"/>
    </a-form-item>
    <a-form-item>
      <a-radio-group v-decorator="identity" class="identity">
        <a-radio value="student">
          学生
        </a-radio>
        <a-radio value="teacher">
          教师
        </a-radio>
        <a-radio value="admin">
          管理员
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item>
      <a-input v-decorator="['description']"/>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'Add'
}
</script>

<style scoped>

</style>
