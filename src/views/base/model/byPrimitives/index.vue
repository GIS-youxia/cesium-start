<!-- 
    @description 
    @author zhangcj
    @date 2022-06-07 15:09:52 
 -->
<template>
  <div class="add-model-by-primitives-container" ref="viewerDom"></div>
</template>
<script>
import * as Cesium from 'cesium'
const url = '/data/SampleData/models/CesiumAir/Cesium_Air.glb'
const height = 5000
let viewer
export default {
  mounted() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      const dom = this.$refs['viewerDom']
      viewer = new Cesium.Viewer(dom, {
        infoBox: false,
        selectionIndicator: false,
        shadows: true,
        shouldAnimate: true,
      })
      window.viewer = viewer
      this.handleCreateModel(url, height)
    },
    handleCreateModel(url, height, heading, pitch, roll) {
      height = Cesium.defaultValue(height, 0.0)
      heading = Cesium.defaultValue(heading, 0.0)
      pitch = Cesium.defaultValue(pitch, 0.0)
      roll = Cesium.defaultValue(roll, 0.0)
      const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
      const origin = new Cesium.Cartesian3.fromDegrees(108.94, 34.34, height)
      const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
        origin,
        hpr,
      )
      const scene = viewer.scene
      scene.primitives.removeAll()
      const model = scene.primitives.add(
        Cesium.Model.fromGltf({
          url: url,
          modelMatrix: modelMatrix,
          minimumPixelSize: 128,
        }),
      )
      model.readyPromise
        .then((m) => {
          this.handleZoomToModel(m)
        })
        .catch(function (error) {
          window.alert(error)
        })
    },
    handleZoomToModel(model) {
      const camera = viewer.camera
      const scene = viewer.scene
      // Zoom to model
      const controller = scene.screenSpaceCameraController
      const r = 2.0 * Math.max(model.boundingSphere.radius, camera.frustum.near)
      controller.minimumZoomDistance = r * 0.5

      const center = Cesium.Matrix4.multiplyByPoint(
        model.modelMatrix,
        model.boundingSphere.center,
        new Cesium.Cartesian3(),
      )
      const heading = Cesium.Math.toRadians(230.0)
      const pitch = Cesium.Math.toRadians(-20.0)
      camera.lookAt(
        center,
        new Cesium.HeadingPitchRange(heading, pitch, r * 2.0),
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.add-model-by-primitives-container {
  height: 100%;
  width: 100%;
}
</style>
