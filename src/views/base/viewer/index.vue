<!-- 
    @description viewer实例
    @author zhangcj
    @date 2022-06-01 14:22:49 
 -->
<template>
  <div class="viewer-container" ref="viewerDom"></div>
</template>
<script>
import { Viewer, Rectangle, Camera } from 'cesium'
// 视图定位到中国范围内
const extent = Rectangle.fromDegrees(100, 10, 120, 70)
Camera.DEFAULT_VIEW_RECTANGLE = extent
// 通过摄像机视口来设置cesium地球大小，0 表示地球填满视窗，越大于0表示地球距离视口越远，越小于0表示距离地球视口越近
Camera.DEFAULT_VIEW_FACTOR = 0.2
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const cesiumContainer = this.$refs['viewerDom']
      const viewer = new Viewer(cesiumContainer, {
        // 去除动画控件
        animation: false,
        // 地址搜索控件
        geocoder: false,
        // 图层选择控件
        baseLayerPicker: false,
        // 操作指南控件
        navigationHelpButton: false,
        // 关闭时间轴
        timeline: false,
        // 全屏按钮
        fullscreenButton: false,
        // 模式选择器
        sceneModePicker: false,
        // home按钮
        homeButton: false,
        // 信息框
        infoBox: false,
      })
      // 去掉cesium的标识
      viewer._cesiumWidget._creditContainer.style.display = 'none'
      // 显示帧率
      viewer.scene.debugShowFramesPerSecond = true
    },
  },
}
</script>
<style lang="scss" scoped>
.viewer-container {
  height: 100%;
}
</style>
