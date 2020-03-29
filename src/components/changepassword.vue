<template>
  <el-card>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item
        label="原密码"
        prop="oldpass"
      >
        <el-input
          v-model="ruleForm.oldpass"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="pass"
      >
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认新密码"
        prop="checkPass"
      >
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm ('ruleForm')"
        >提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data () {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userId: '',
      ruleForm: {
        pass: '',
        checkPass: '',
        oldpass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ],
        oldpass: [
          { validator: validateOldPass, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.userId = this.$route.query.userId
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changepassword(formName)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async changepassword (formName) {
      var { data: res } = await this.$http.post('user/changePassWord',
        {
          id: this.userId,
          oldpassword: this.ruleForm.oldpass,
          newpassword: this.ruleForm.pass
        })
      console.log(res)
      console.log(res.meta.status)
      if (res.meta.status !== '200') {
        console.log('!==200')
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.$refs[formName].resetFields()
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
</style>
