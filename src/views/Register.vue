<template>
  <div class="login-body">
    <vueCanvasNest :config="config"/>
    <el-form class="login-container" ref="registerForm" :rules="rules" :model="registerForm">
      <h3 class="title">用户注册</h3>
      <router-link class="to-link" to="/login">已有账号？</router-link>
      <el-form-item prop="username">
        <el-input prefix-icon="cm-icon-user" status-icon placeholder="请输入用户名" v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="cm-icon-lock" status-icon placeholder="请输入密码" show-password v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="confirm_password">
        <el-input prefix-icon="cm-icon-lock" status-icon placeholder="请输入确认密码" show-password v-model="registerForm.confirm_password"></el-input>
      </el-form-item>
      <el-form-item class="form-btn">
        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import vueCanvasNest from 'vue-canvas-nest'

export default {
  name: 'Register',
  components: { vueCanvasNest },
  data () {
    return {
      config: {
        color: '45, 52, 54',
        count: 150,
        opacity: 0.9,
        zIndex: -1
      },
      registerForm: {
        username: '',
        password: '',
        confirm_password: '',
        rememberMe: false
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' }
        ],
        confirm_password: [
          { validator: this.checkPass, trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    checkPass (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

  .login-body {
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #aac4bc;
    background: -moz-linear-gradient(-45deg, #aac4bc 0%, #eca8a8 100%, #eed5a9 100%);
    background: -webkit-linear-gradient(-45deg, #aac4bc 0%,#eca8a8 100%,#eed5a9 100%);
    background: linear-gradient(135deg, #aac4bc 0%,#eca8a8 100%,#eed5a9 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cfd8dc', endColorstr='#b0bec5',GradientType=1 );
    z-index: 0;
  }

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    position: relative;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .form-btn {
      text-align: center;
    }
    .to-link {
      display: inline-block;
      font-size: 14px;
      color: #909399;
      float: right;
      position: absolute;
      top: 15px;
      right: 10px;
      text-decoration: blink;
    }
    .to-link:hover {
      color: #000;
    }
  }
</style>
