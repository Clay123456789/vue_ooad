<template>
  <div>
    <h1 class="title" style="font-size:50px">疫情防控通</h1>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt=""/>
    </div>
    <div>
      <el-form :model="homeForm" status-icon :rules="rules" ref="homeForm" label-width="70px"
               class="registerContainer">
        <h3 class="homeTitle">登录</h3>
        <el-form-item label="选择身份" prop="type">
          <el-select v-model="homeForm.type" placeholder="您是？">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="教师员工" value="教师员工"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 220px;" type="primary" @click="submitForm('homeForm')">去登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

import {postRequest} from "@/utils/axiosApi";

export default {
  name: "Home",
  components: {},
  data() {
    var validateType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('身份不能为空'));
      } else {
        callback();
      }
    };
    return {
      homeForm: {
        type: '',
      },
      rules: {
        type: [
          {validator: validateType, trigger: 'blur'}
        ],
      },
      imgSrc: require('/src/assets/background1.jpeg')
    };
  },
  methods: {
    submitForm(homeForm) {
      this.$refs.homeForm.validate((valid) => {
        if (valid) {
          if(this.homeForm.type == "管理员"){
            this.$router.replace('/manager/login');
          }else if(this.homeForm.type == "教师员工"){
            this.$router.replace('/staff/login');
          }else if(this.homeForm.type == "学生"){
            this.$router.replace('/student/login');
          }
        } else {
          this.$message.error('错误');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.registerContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px 600px auto;
  width: 300px;
  padding: 15px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(109, 101, 101, 0.8);
  box-shadow: 0 0 25px #333131;
  z-index: 1;
  position: absolute;
}

.homeTitle {
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

