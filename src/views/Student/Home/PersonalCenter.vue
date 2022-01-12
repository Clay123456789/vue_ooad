<template>
  <div>
    <el-card class="box-card">
      <div>
        <div style="display:flex;justify-content: center" slot="header" class="clearfix">
          <span>{{ user.studentid}}</span>
        </div>
        <div style="display:flex;justify-content: center">
          <img title="点击修改用户头像" :src="src" style="height: 100px;width: 100px; border-radius: 50px" alt="">
        </div>
        <div style="margin-top: 20px">姓名：
          <el-tag style="margin-right:100px; width:100px">{{ user.stu_name }}</el-tag>
          邮箱：
          <el-tag style=" width:150px">{{ user.email }}</el-tag>
        </div>
        <div style="margin-top: 20px">性别：
          <el-tag style="margin-right:100px; width:100px">{{ user.sex }}</el-tag>
          年级：
          <el-tag style=" width:150px">{{ user.grade }}</el-tag>
        </div>
        <div style="margin-top: 20px">班级：
          <el-tag style="margin-right:100px; width:100px">{{ user.class_ }}</el-tag>
          学院：
          <el-tag style=" width:150px">{{ user.college }}</el-tag>
        </div>
        <div style="margin-top: 20px">导师：
          <el-tag style="margin-right:100px; width:100px">{{ user.tutor_name }}</el-tag>
          宿舍：
          <el-tag style=" width:150px">{{ user.dormitory }}</el-tag>
        </div>
        <div style="margin-top: 20px">电话：
          <el-tag style="margin-right:100px; width:100px">{{ user.phone }}</el-tag>
          地址：
          <el-tag style=" width:150px">{{ user.address }}</el-tag>
        </div>
        <div style="margin-top: 20px">家乡：
          <el-tag style="margin-right:100px; width:100px">{{ user.nativeplace }}</el-tag>
        </div>
        <div style="display:flex;justify-content: space-around;margin-top: 20px">
          <el-button type="primary">修改信息</el-button>
          <el-button type="danger">修改密码</el-button>
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
              <el-input v-model="user.account" placeholder="placeholder"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

import {getAdmin} from "@/utils/axiosApi";

export default {
  name: "Student_PersonalCenter",
  components: {},
  data() {
    return {
      user: {
        email: "",
        whichpeople: "",
        account: "",
        password: "",
        code: "",
        studentid: "",
        stu_name: "",
        sex: "",
        grade: "",
        college: "",
        class_: "",
        tutor_name: "",
        dormitory: "",
        nativeplace: "",
        address: "",
        phone: "",
        checkPass: ""
      },
      dialogVisible: false,
      src: require('/src/assets/default.jpeg')
    }

  },
  mounted() {
    this.initAdmin();
  },
  methods: {
    initAdmin() {
      getAdmin(0, localStorage.getItem("uid")).then(resp => {
        if (resp) {
          this.user = resp.data;
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
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