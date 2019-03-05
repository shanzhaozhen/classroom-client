<template>
  <div class="login-body">
    <vueCanvasNest :config="config"/>
    <el-form class="login-container" ref="loginForm" :rules="rules" :model="loginForm">
      <h3 class="title">用户登陆</h3>
      <router-link class="to-link" to="/register">没有账号？</router-link>
      <el-form-item prop="username">
        <el-input prefix-icon="cm-icon-user" status-icon placeholder="请输入用户名" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="cm-icon-lock" status-icon placeholder="请输入密码" show-password v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" class="remember">记住密码</el-checkbox>
        <el-button type="primary" @click="submitForm('loginForm')" class="submit-btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import vueCanvasNest from 'vue-canvas-nest'

export default {
  name: 'Login',
  components: { vueCanvasNest },
  data () {
    return {
      config: {
        color: '45, 52, 54',
        count: 150,
        opacity: 0.9,
        zIndex: -1
      },
      loginForm: {
        username: '',
        password: '',
        rememberMe: false
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    signIn () {},
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
    z-index: 1;
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
    .submit-btn {
      float: right;
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
