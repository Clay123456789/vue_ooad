<template>
  <div>
    <el-card class="box-card">
      <div>
        <div slot="header" class="clearfix">
          <span>{{ user.staffid }}</span>
        </div>
        <div style="display:flex;justify-content: center">
          <img title="点击修改用户头像" :src="user.touxiang" style="height: 100px;width: 100px; border-radius: 50px" alt="">
        </div>
        <div>邮箱：
          <el-tag>{{ user.email }}</el-tag>
        </div>
        <div>姓名：
          <el-tag>{{ user.name }}</el-tag>
        </div>
        <div>性别：
          <el-tag>{{ user.sex }}</el-tag>
        </div>
        <div>年级：
          <el-tag>{{ user.grade }}</el-tag>
        </div>
        <div>班级：
          <el-tag>{{ user.class }}</el-tag>
        </div>
        <div style="display:flex;justify-content: space-around;margin-top: 10px">
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
            <td><el-input v-model="user.user" placeholder="placeholder" ></el-input></td>
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

export default {
  name: "Student_PersonalCenter",
  components: {},
  data() {
    return {
      user: null,
      dialogVisible: false
    }
  },
  mounted() {
    this.initAdmin();
  },
  methods: {
    initAdmin() {
      this.getAdmin(localStorage.getItem("uid")).then(resp => {
        if (resp) {
          this.user = resp;
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
  width: 480px;
  margin: 100px 600px auto;;
}
</style>
