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
        <el-form-item  label="用户名" prop="account">
          <el-input type="text" v-model="registerForm.account" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item  label="邮箱" prop="email">
          <el-input type="text" v-model="registerForm.email" placeholder="请输入邮箱" ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input type="text" v-model="registerForm.code" placeholder="请输入验证码" style="width: 250px;margin-right: 5px">
          </el-input>
          <el-button style=" width: 50px" type="text" @click="codeForm('registerForm')">获取验证码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="70px"
               class="registerContainer1">
        <el-form-item  label="管理员号" prop="managerid">
          <el-input type="text" v-model="registerForm.managerid" placeholder="请输入管理员号" ></el-input>
        </el-form-item>
        <el-form-item  label="手机" prop="phone">
          <el-input type="phone" v-model="registerForm.phone" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" ></el-input>
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

import {postEmail, postRegister, postRegister2, postRequest} from "@/utils/axiosApi";

export default {
  name: "staff_Register",
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
    var validateSid = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('管理员号不能为空'));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      const reg1=/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/;
        if (value == '' || value == undefined || value == null) {
          return callback(new Error('手机号不能为空'));
        } else {
          setTimeout(() => {
            if (!reg1.test(value)) {
              callback(new Error('请输入正确的手机号'));
            } else {
              callback();
            }
          }, 1000);
        }
      }
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
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        email:"",
        whichpeople: "",
        account:"",
        password:"",
        code:"",
        managerid:"",
        phone:"19814200063",
        checkPass: ""
      },
      rules: {
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ],
        managerid: [
          {validator: validateSid, trigger: 'blur'}
        ],
        account: [
          {validator: validateUid, trigger: 'blur'}
        ],
        code: [
          {validator: validateCode, trigger: 'blur'}
        ],
        email: [
          {validator: validateEmail, trigger: 'blur'}
        ],
        password: [
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
        const reg = /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+.[a-z]*$/;
        if (reg.test(this.registerForm.email)) {
          postEmail(this.registerForm.email,0).then(resp => {
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
          postRegister2(this.registerForm.email,2,this.registerForm.account,this.registerForm.password
              ,this.registerForm.code,this.registerForm.managerid,this.registerForm.phone).then(resp => {
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

<style scoped>
.registerContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 200px 100px;
  width: 400px;
  padding: 15px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(109, 101, 101, 0.8);
  box-shadow: 0 0 25px #333131;
  z-index: 1;
  position: absolute;
}

.registerContainer1 {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px 600px;
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
