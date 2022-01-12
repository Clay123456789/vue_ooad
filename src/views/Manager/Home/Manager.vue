<template>
  <div class="home">

    <el-container >
      <el-header>
        疫情防控后台管理系统
        <el-link href="/manager/personalcenter" :underline="false" >个人中心</el-link>

      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu @select="menuClick">

            <el-menu-item index="/manager/homepage">疫情信息管理</el-menu-item>
            <el-menu-item index="/manager/personalcenter">个人中心</el-menu-item>
            <el-menu-item>疫情信息分析</el-menu-item>
            <el-menu-item>疫情信息上报</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>


  </div>
</template>

<script>

export default {
  name: "Manager_Home",
  components: {

  },
  methods: {
    menuClick(index) { this.$router.push(index); }

  }
}

</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 3px;
}
.el-header .el-link{
  bottom:60px;
  margin-left:1350px;
}
.el-aside {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  color: #333;
  height: 900px;
}



</style>