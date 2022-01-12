<template>
  <div>
    <h1 class="title">疫情防控通（管理员端）</h1>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt=""/>
    </div>
    <div>
      <a class="header link" style="float: left" href="/manager/home">登录</a>
    </div>
    <div>
      <el-form :model="LoginForm" status-icon :rules="rules" ref="LoginForm" label-width="50px"
               class="registerContainer">
        <h3 class="LoginTitle">登录</h3>
        <el-form-item  label="账户" prop="user">
          <el-input type="user" v-model="LoginForm.user" placeholder="请输入用户名或邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="pass">
          <el-input type="password" v-model="LoginForm.pass" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-link :underline="false" style=" float: left" class="header link" href="/manager/register">
            注册
          </el-link>
          <el-link :underline="false" style=" float: right" class="header link" href="/manager/FindPW">
            忘记密码
          </el-link>
          <el-button style="width: 100%;" type="primary" @click="submitForm('LoginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

import {postLogin} from "@/utils/axiosApi";

export default {
  name: "Student_Login",
  components: {},
  data() {
    var validateUser = (rule, value, callback) => {
      if (value == '' || value == undefined || value == null) {
        return callback(new Error('用户名或邮箱不能为空'));
      } else {
        callback();
      }
    }

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };

    return {
      LoginForm: {
        user: '',
        pass: '',
      },
      rules: {
        user: [
          {validator: validateUser, trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
      },
      imgSrc: require('/src/assets/background1.jpeg')
    };
  },
  methods: {
    submitForm(LoginForm) {
      this.$refs.LoginForm.validate((valid) => {
        if (valid) {
          postLogin(this.LoginForm.user,this.LoginForm.pass,2).then(resp => {
            if (resp) {
              //存储token
              const tokenStr = resp.data;
              window.sessionStorage.setItem('tokenStr', tokenStr);
              localStorage.setItem("uid",this.LoginForm.user);
              this.$router.replace('/manager/home');
              //跳转

            }
          });
        } else {
          this.$message.error('错误');
          return false;
        }
      });
    },
  }
};
</script>

<style scoped>
.registerContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px 600px auto;
  width: 350px;
  padding: 5px 15px 5px 15px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(109, 101, 101, 0.8);
  box-shadow: 0 0 25px #333131;
  z-index: 1;
  position: absolute;
}

.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}

.LoginTitle {
  margin: 8px auto 40px auto;
  text-align: center;
}

.title {
  margin: 100px 150px auto;
  z-index: 1;
  position: absolute;
}
</style>