<template>
  <div>
    <h1 class="title">疫情防控通（管理员端）</h1>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt=""/>
    </div>
    <div>
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="70px"
               class="registerContainer">
        <h3 class="registerTitle">注册</h3>
        <el-form-item  label="用户名" prop="username">
          <el-input type="text" v-model="registerForm.username" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item  label="邮箱" prop="email">
          <el-input type="text" v-model="registerForm.email" placeholder="请输入邮箱" ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input type="text" v-model="registerForm.code" placeholder="请输入验证码" style="width: 250px;margin-right: 5px">
          </el-input>
          <el-button style=" width: 50px" type="text" @click="codeForm('registerForm')">获取验证码</el-button>
        </el-form-item>
        <el-form-item  label="密码" prop="pass">
          <el-input type="password" v-model="registerForm.pass" placeholder="请输入密码" ></el-input>
        </el-form-item>
        <el-form-item  label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" placeholder="请确认密码" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style=" width: 100px" type="primary" @click="submitForm('registerForm')">提交</el-button>
          <el-button style="margin-left:50px; width: 100px" @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
        <el-link :underline="false" style="margin-bottom:30px; float: right" class="header link" href="/manager/login">
          已有帐号,去登录
        </el-link>
      </el-form>
    </div>
  </div>
</template>

<script>

import {postEmail, postRegister, postRequest} from "@/utils/axiosApi";

export default {
  name: "Manager_Register",
  components: {},
  data() {

    var validateEmail = (rule, value, callback) => {
      const reg = /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+.[a-z]*$/;
      if (value == '' || value == undefined || value == null) {
        return callback(new Error('邮箱不能为空'));
      } else {
        setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱'));
          } else {
            callback();
          }
        }, 1000);
      }
    }
    var validateUid = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: '',
        email: '',
        pass: '',
        checkPass: '',
        code: '',
      },
      rules: {
        username: [
          {validator: validateUid, trigger: 'blur'}
        ],
        code: [
          {validator: validateCode, trigger: 'blur'}
        ],
        email: [
          {validator: validateEmail, trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      },
      imgSrc: require('/src/assets/background1.jpeg')
    };
  },
  methods: {
    codeForm(registerForm) {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          postEmail(this.registerForm.email).then(resp => {
            if (resp) {
              alert('验证码发送成功');
            }
          });
        } else {
          this.$message.error('错误');
          return false;
        }
      });
    },
    submitForm(registerForm) {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          postRegister(this.registerForm.username,this.registerForm.pass,this.registerForm.email,this.registerForm.code).then(resp => {
            if (resp) {
              //存储token
              const tokenStr = resp.data;
              window.sessionStorage.setItem('tokenStr', tokenStr);
              //跳转
              this.$router.replace('/manager/home');
            }
          });
        } else {
          this.$message.error('错误');
          return false;
        }
      });
    },
    resetForm(registerForm) {
      this.$refs.registerForm.resetFields();
    }
  }
}
</script>

<style>
.registerContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px 600px auto;
  width: 400px;
  padding: 15px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(109, 101, 101, 0.8);
  box-shadow: 0 0 25px #333131;
  z-index: 1;
  position: absolute;
}

.registerTitle {
  margin: 8px auto 40px auto;
  text-align: center;
}

.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}

.title {
  margin: 100px 150px auto;
  z-index: 1;
  position: absolute;
}

</style>
