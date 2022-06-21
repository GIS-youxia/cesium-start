<!-- 
    @description positionBar 
    鼠标移动记录坐标
    @author zhangcj
    @date 2022-06-21 15:36:17 
 -->
<template>
  <div class="compoent-container">
    <div class="cesium-container" ref="threeDOM"></div>
    <div class="position-bar">
      <div class="bar-item">
        <div class="bar-item-label">经度</div>
        <div class="bar-item-value">{{ longitude }}</div>
      </div>
      <div class="bar-item">
        <div class="bar-item-label">纬度</div>
        <div class="bar-item-value">{{ latitude }}</div>
      </div>
      <div class="bar-item">
        <div class="bar-item-label">高度</div>
        <div class="bar-item-value">{{ height }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import viewerUtil from '@/utils/cesium/viewerUtil'
import imageryLayerUtil from '@/utils/cesium/imageryLayerUtil'
import * as Cesium from 'cesium'
export default {
  data() {
    return {
      longitude: undefined,
      latitude: undefined,
      height: undefined,
    }
  },
  mounted() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      const viewer = viewerUtil.viewerInit(this.$refs.threeDOM)
      imageryLayerUtil.addTDTLayer(viewer, 'img', 'img')
      const canvas = viewer.scene.canvas
      //获取当前三维场景的椭球体
      const ellipsoid = viewer.scene.globe.ellipsoid
      // 定义当前事件处理
      const handler = new Cesium.ScreenSpaceEventHandler(canvas)
      // 设置鼠标移动事件的处理函数。
      handler.setInputAction((movement) => {
        // 获取鼠标的绝对坐标
        const position = movement.endPosition
        // 获取鼠标的绝对坐标
        const cartesian = viewer.camera.pickEllipsoid(position, ellipsoid)
        console.log(cartesian)
        if (cartesian) {
          //将笛卡尔坐标转换为地理坐标
          const cartographic = ellipsoid.cartesianToCartographic(cartesian)
          //将弧度转为度的十进制度表示
          this.longitude = Cesium.Math.toDegrees(cartographic.longitude)
          this.latitude = Cesium.Math.toDegrees(cartographic.latitude)
          this.height = Math.ceil(viewer.camera.positionCartographic.height)
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    },
  },
}
</script>
<style lang="scss" scoped>
.compoent-container {
  width: 100%;
  height: 100vh;
  .cesium-container {
    width: 100%;
    height: 100;
  }
  .position-bar {
    height: 50px;
    width: 100%;
    position: absolute;
    bottom: 0px;
    background-color: #1890ff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .bar-item {
      height: 100%;
      width: 30%;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #fff;
      .bar-item-label {
        font-size: 16px;
        font-weight: 400;
        line-height: 50px;
      }
      .bar-item-value {
        margin-left: 10px;
        font-size: 16px;
        line-height: 50px;
      }
    }
  }
}
</style>
