<!-- 
    @description cesium 中的坐标转换
    @author zhangcj
    @date 2022-06-21 15:04:46 
    cesium 中的坐标 参考https://www.cnblogs.com/matanzhang/p/11846929.html
 -->
<template>
  <div class="cesium-container" ref="cesiumDOM"></div>
</template>
<script>
import imageryLayerUtil from '@/utils/cesium/imageryLayerUtil'
import viewerUtil from '@/utils/cesium/viewerUtil'
import { Math, Cartesian3, Cartographic } from 'cesium'
let viewer
export default {
  mounted() {
    this.cesiumInit()
  },
  methods: {
    cesiumInit() {
      viewer = viewerUtil.viewerInit(this.$refs.cesiumDOM)
      imageryLayerUtil.addTDTLayer(viewer, 'img', 'img')
      // 弧度转角度
      const degree = Math.toDegrees(2 * Math.PI)
      console.log(degree)
      // 角度转弧度
      const radian = Math.toRadians(90)
      console.log(radian)
      // 经纬度转笛卡尔空间坐标
      const cartesian3 = Cartesian3.fromDegrees(116.39, 39.9, 100)
      console.log(cartesian3)
      // 笛卡尔空间坐标转经纬度
      const lonlat = Cartographic.fromCartesian(cartesian3)
      console.log(lonlat)
    },
  },
}
</script>
<style lang="scss" scoped>
.cesium-container {
  width: 100%;
  height: 100vh;
}
</style>
