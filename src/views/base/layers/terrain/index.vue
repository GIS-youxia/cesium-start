<!-- 
    @description cesium地形加载
    @author zhangcj
    @date 2022-06-21 10:17:39 
 -->
<template>
  <div class="viewer-container" ref="viewerDOM"></div>
</template>
<script>
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
let viewer
export default {
  mounted() {
    const viewerDOM = this.$refs.viewerDOM
    viewer = new Cesium.Viewer(viewerDOM, {
      infoBox: false,
    })
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.viewer-container {
  width: 100%;
  height: 100vh;
}
</style>
