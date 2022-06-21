<!-- 
    @description home页面
    @author zhangcj
    @date 2022-05-27 14:56:10 
 -->
<template>
  <div class="home-container">
    <router-link to="/quickstart" class="nav-item">quickStart</router-link>
    <router-link to="/widget" class="nav-item">widget</router-link>
    <router-link to="/viewer" class="nav-item">Viewer</router-link>
    <router-link to="/addModelByEntity" class="nav-item"
      >addModelByEntity</router-link
    >
    <router-link to="/addModelByPrimitives" class="nav-item"
      >addModelByPrimitives</router-link
    >
    <router-link to="/base/layers/terrain" class="nav-item"
      >加载地形</router-link
    >
    <router-link to="/base/coordinate/transform" class="nav-item"
      >坐标转换</router-link
    >
    <router-link to="/components/positionBar" class="nav-item"
      >位置栏</router-link
    >
  </div>
</template>
<script>
export default {
  name: 'Home',
}
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav-item {
    height: 24px;
    margin-top: 10px;
    margin-left: 10px;
  }
}
</style>
