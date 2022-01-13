<template>
  <div class="home">
    <div class="background">
      <img :src="imgSrc" style="width:1200px;height:960px" alt=""/>
    </div>
    <el-container >
      <el-header width="100%" class="el-header">
        疫情防控后台管理系统
      </el-header>
      <el-container>
        <el-aside width="200px" class="el-aside">
          <el-menu @select="menuClick">
            <el-menu-item index="/staff/homepage">疫情信息管理</el-menu-item>
            <el-menu-item index="/staff/personalcenter">个人中心</el-menu-item>
            <el-menu-item>疫情信息分析</el-menu-item>
            <el-menu-item>疫情信息上报</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="el-main"><router-view></router-view></el-main>
      </el-container>
    </el-container>


  </div>
</template>

<script>

export default {
  name: "Student_Home",
  components: {

  },
  methods: {
    menuClick(index) { this.$router.push(index); }

  },
  data(){
    return{
      imgSrc: require('/src/assets/background1.jpeg')
    }
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

.el-aside {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  color: #333;
  height: 900px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
}

.el-main {
  background: rgba(255, 255, 255, 0.5);
}

.background {
  width: 900px;
  height: 960px;
  z-index: -1;
  position: absolute;
}

</style>