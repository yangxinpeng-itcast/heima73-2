<template>
  <el-container class="home-container">
    <el-aside width="200px" class="aside">Aside</el-aside>
    <el-container>
      <el-header class="el-icon-s-fold header">Header</el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
  .home-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .header {
      width: 100%;

    }
    .aside {
      width: 200px;
      height: 100%;

    }
  }
</style>
