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
