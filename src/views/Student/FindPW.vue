<template>
  <div>
    <h1 class="title">疫情防控通（学生端）</h1>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt=""/>
    </div>
    <div>
      <el-form :model="findForm" status-icon :rules="rules" ref="findForm" label-width="70px"
               class="registerContainer">
        <h3 class="registerTitle">找回密码</h3>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="findForm.email" placeholder="请输入邮箱" style="width: 250px;margin-right: 5px">
          </el-input>
          <el-button style=" width: 50px" type="text" @click="emailForm('findForm')">发送密码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="submitForm('findForm')">去登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

import {postFind} from "@/utils/axiosApi";

export default {
  name: "Student_FindPW",
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
    return {
      findForm: {
        email: '',
      },
      rules: {
        email: [
          {validator: validateEmail, trigger: 'blur'}
        ],
      },
      imgSrc: require('/src/assets/background1.jpeg')
    };
  },
  methods: {
    emailForm(findForm) {
      this.$refs.findForm.validate((valid) => {
        if (valid) {
          postFind( this.findForm.email).then(resp => {
            if (resp) {
              alert('密码已发送至邮箱');
            }
          });
        } else {
          this.$message.error('错误');
          return false;
        }
      });
    },
    submitForm(findForm) {
      this.$router.replace('/student/login');
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
