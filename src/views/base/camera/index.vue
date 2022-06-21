<!-- 
    @description camera 示例
    @author zhangcj
    @date 2022-06-21 16:22:01 
 -->
<template>
  <div class="cesium-container" ref="cesiumDOM"></div>
</template>
<script>
import viewerUtil from '@/utils/cesium/viewerUtil'
import imageryLayerUtil from '@/utils/cesium/imageryLayerUtil'
import * as Cesium from 'cesium'
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const dom = this.$refs.cesiumDOM
      const viewer = viewerUtil.viewerInit(dom)
      imageryLayerUtil.addTDTLayer(viewer, 'img', 'img')
      // 天安门位置
      const postion = Cesium.Cartesian3.fromDegrees(116.393428, 39.90932, 1000)
      const camera = viewer.camera
      camera.setView({
        destination: postion,
        orientation: {
          // 航向角
          heading: Cesium.Math.toRadians(0),
          // 俯仰角
          pitch: Cesium.Math.toRadians(-90),
          // 翻滚角
          roll: Cesium.Math.toRadians(0),
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.cesium-container {
  width: 100vw;
  height: 100vh;
}
</style>
