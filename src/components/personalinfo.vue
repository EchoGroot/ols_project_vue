<template>
  <el-card class="box-card">
    <el-tag class="text-title">用户名:</el-tag>
    <el-tag
      type="info"
      class="text-data"
    >{{user.name}}</el-tag><br>
    <el-tag class="text-title">性别:</el-tag>
    <el-tag
      type="info"
      class="text-data"
    >{{user.sex}}</el-tag><br>
    <el-tag class="text-title">出生日期:</el-tag>
    <el-tag
      type="info"
      class="text-data"
    >{{user.birthday}}</el-tag><br>
    <el-tag class="text-title">邮箱:</el-tag>
    <el-tag
      type="info"
      class="text-data"
    >{{user.email}}</el-tag><br>
    <el-tag class="text-title">积分:</el-tag>
    <el-tag
      type="info"
      class="text-data"
    >{{user.points}}</el-tag><br>
    <el-button
      class="text-title"
      type="warning"
      plain
      @click="gotochangepassword"
    >修改密码</el-button>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: '',
        sex: '',
        birthday: '',
        email: '',
        points: 0
      }
    }
  },
  created () {
    this.getuserinfo()
  },
  methods: {
    async getuserinfo () {
      var { data: res } = await this.$http.post('user/getUserInfo', { id: '10000' })
      console.log(res)
      if (res.meta.status !== '200') return this.$message.error(res.meta.msg)
      this.user.name = res.data.userInfo.name
      console.log(res.data.userInfo.name)
      this.user.sex = res.data.userInfo.sex
      this.user.birthday = res.data.userInfo.birthday
      this.user.email = res.data.userInfo.email
      this.user.points = res.data.userInfo.points
    },
    gotochangepassword () {
      this.$router.push('/changepassword')
    }
  }
}
</script>

<style scoped>
.el-card {
  height: 100%;
}
.text-title {
  margin-top: 6px;
  font-size: 25px;
}
.text-data {
  margin-left: 20px;
  font-size: 20px;
}
</style>
