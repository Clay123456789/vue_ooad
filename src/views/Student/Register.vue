<template>
    <div>
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="registerContainer">
        <h3 class="registerTitle">注册</h3>
        <el-form-item style="width: 350px;" label="邮箱" prop="email">
          <el-input type="email" v-model="registerForm.email" placeholder="请输入邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="width: 350px;" label="密码" prop="pass">
          <el-input type="password" v-model="registerForm.pass" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="width: 350px;" label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" placeholder="请确认密码" autocomplete="off"></el-input>
        </el-form-item>
        <a class="headerlink" style="float: left" href="/student/login">已有帐号,去登录</a>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>

    export default {
      name: "Student_Register",
      components: {

      },
      data() {
        var validateEmail = (rule, value, callback) => {
          const reg =/^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+$/;
          if(value==''||value==undefined||value==null){
            return callback(new Error('邮箱不能为空'));
          }else{
            setTimeout(() => {
              if (!reg.test(value)){
                callback(new Error('请输入正确的邮箱'));
              } else {
                callback();
              }
            }, 1000);
          }
        }

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
            email: '',
            pass: '',
            checkPass: '',
          },
          rules: {
            email: [
              { validator: validateEmail, trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm(registerForm) {
          this.$refs.registerForm.validate((valid) => {
            if (valid) {
              alert('submit!');
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

<style >
.registerContainer{
  border-radius: 15px;
  background-clip:padding-box;
  margin:100px 600px auto;
  width:400px;
  padding: 15px 20px 15px 20px;
  background: rgba(255, 255, 255, 0.08);
  border:1px solid #6d6565;
  box-shadow:0 0 25px #333131;
}
.registerTitle{
  margin: 8px auto 40px auto;
  text-align: center;
}
</style>
