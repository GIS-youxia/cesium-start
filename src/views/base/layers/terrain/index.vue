<!-- 
    @description cesium地形加载
    @author zhangcj
    @date 2022-06-21 10:17:39 
 -->
<template>
  <div class="viewer-container" ref="viewerDOM"></div>
</template>
<script>
import { Viewer, createWorldTerrain } from 'cesium'
import layerUtil from '@/utils/cesium/imageryLayerUtil'
let viewer
export default {
  mounted() {
    const viewerDOM = this.$refs.viewerDOM
    const worldTerrain = createWorldTerrain({
      // 水面纹理
      requestWaterMask: true,
      // 山体阴影
      requestVertexNormals: true,
    })
    viewer = new Viewer(viewerDOM, {
      // 地理位置查询定位控件
      geocoder: false,
      // 是否显示home按钮
      homeButton: false,
      // 是否显示3D/2D选择器
      sceneModePicker: false,
      // 是否显示底图选择器
      baseLayerPicker: false,
      // 是否显示右上角的帮助按钮
      navigationHelpButton: false,
      // 是否创建动画小部件
      animation: false,
      // 是否显示时间轴
      timeline: false,
      // 是否显示全屏按钮
      fullscreenButton: false,
      //是否显示信息框
      infoBox: false,
      // 加载地形
      terrainProvider: worldTerrain,
      // 不自动添加影像图层
      imageryProvider: false,
    })
    // 去掉cesium标识
    viewer.cesiumWidget.creditContainer.style.display = 'none'
    // 加载天地图
    layerUtil.addTDTLayer(viewer, 'img', 'img')
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
