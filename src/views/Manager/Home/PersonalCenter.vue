<template>
  <div>
    <el-card class="box-card">
      <div>
        <div style="display:flex;justify-content: center" slot="header" class="clearfix">
          <span>{{ user.managerid}}</span>
        </div>
        <div style="display:flex;justify-content: center">
          <img title="点击修改用户头像" :src="src" style="height: 100px;width: 100px; border-radius: 50px" alt="">
        </div>
        <div style="margin-top: 20px">账户：
          <el-tag style="margin-right:100px; width:100px">{{ user.account }}</el-tag>
          邮箱：
          <el-tag style=" width:180px">{{ user.email }}</el-tag>
        </div>

        <div style="margin-top: 20px">电话：
          <el-tag style="margin-right:100px; width:100px">{{ user.phone }}</el-tag>
        </div>
        <div style="display:flex;justify-content: space-around;margin-top: 20px">
          <el-button type="primary" @click="showUpdateAdminInfoView">修改信息</el-button>
          <el-button type="danger" @click="showUpdatePasswordView">修改密码</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog
        title="编辑用户信息"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <table>
          <tr>
            <td>用户名</td>
            <td>
              <el-input v-model="user2.account" placeholder="placeholder"></el-input>
            </td>
          </tr>
          <tr>
            <td>邮箱</td>
            <td>
              <el-input v-model="user2.email" placeholder="placeholder"></el-input>
            </td>
          </tr>
          <tr>
            <td>电话</td>
            <td>
              <el-input v-model="user2.phone" placeholder="placeholder"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifyForm('user2')" >确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
        title="修改密码"
        :visible.sync="passwordvisible"
        width="30%">
      <div>
        <table>
          <tr>
            <td >旧密码</td>
            <td >
              <el-input type="text" v-model="password" placeholder="请输入旧密码" ></el-input>
            </td>
          </tr>
          <tr >
            <td prop="checkPass">新密码</td>
            <td>
              <el-input type="text" v-model="newPass" placeholder="请输入新密码" ></el-input>
            </td>
          </tr>
        </table>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="passwordvisible = false">取 消</el-button>
    <el-button type="primary" @click="passForm()" >确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

import {getAdmin, newPass, postAdmin, postAdmin1, postAdmin2, postEmail, postRegister} from "@/utils/axiosApi";

export default {
  name: "Student_PersonalCenter",
  components: {},
  data() {

    return {
      user: {
        email:"",
        whichpeople: "",
        account:"",
        password:"",
        code:"",
        managerid:"",
        phone:"19814200063",
        checkPass: ""
      },
      password:"",
      newPass:"",
      user2: null,
      dialogVisible: false,
      passwordvisible:false,
      src: require('/src/assets/default.jpeg'),
    }
  },
  mounted() {
    this.initAdmin();
  },
  methods: {
    initAdmin() {
      getAdmin(2, localStorage.getItem("uid")).then(resp => {
        if (resp) {
          this.user = resp.data;
          this.user2=Object.assign({},this.user);
        }
      })
    },
    showUpdateAdminInfoView(){
      this.dialogVisible=true;
    },
    showUpdatePasswordView(){
      this.passwordvisible=true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    passForm() {
      newPass(this.user.email,this.password,this.newPass).then(resp => {
        if (resp) {
          this.passwordvisible = false;
          this.initAdmin();
        }
      });
    },
    modifyForm(user2) {
      postAdmin2(2,this.user2.email,this.user2.account,this.user2.password
          ,this.user2.managerid,this.user2.phone).then(resp => {
        if (resp) {
          this.dialogVisible = false;
          localStorage.setItem("uid",this.user2.account);
          this.initAdmin();
        }
      });
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 550px;
}

</style>