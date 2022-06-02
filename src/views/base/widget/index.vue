<!-- 
    @description cesiumWidget相关
    @author zhangcj
    @date 2022-06-01 09:13:45 
 -->
<template>
  <div class="widget-container" ref="widgetDom"></div>
</template>
<script>
const Cesium = window.Cesium
const extent = Cesium.Rectangle.fromDegrees(100, 10, 120, 70)
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent
Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.2
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const el = this.$refs['widgetDom']
      const widget = new Cesium.CesiumWidget(el)
      // 显示帧率
      widget.scene.debugShowFramesPerSecond = true
      // 通过摄像机视口来设置cesium地球大小，0 表示地球填满视窗，越大于0表示地球距离视口越远，越小于0表示距离地球视口越近
      // Camera.DEFAULT_VIEW_FACTOR = 0.2
    },
  },
}
</script>
<style lang="scss" scoped>
.widget-container {
  height: 100%;
  width: 100%;
}
</style>
