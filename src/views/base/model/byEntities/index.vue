<!-- 
    @description 加载glb模型
    @author zhangcj
    @date 2022-06-07 14:20:53 
 -->
<template>
  <div class="glb-model-container" ref="viewerDom">
    <el-select
      v-model="activeModelId"
      class="model-switcher"
      @change="handleModelChange"
    >
      <el-option
        v-for="item in modelGallery"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script>
const Cesium = window.Cesium
let viewer
export default {
  data() {
    return {
      activeModelId: '1',
      modelGallery: [
        {
          id: '1',
          name: 'Aircraft',
          url: '/data/SampleData/models/CesiumAir/Cesium_Air.glb',
          height: 5000.0,
        },
        {
          id: '2',
          name: 'Drone',
          url: '/data/SampleData/models/CesiumDrone/CesiumDrone.glb',
          height: 150.0,
        },
        {
          id: '3',
          name: 'Ground Vehicle',
          url: '/data/SampleData/models/GroundVehicle/GroundVehicle.glb',
          height: 0,
        },
        {
          id: '4',
          name: 'Hot Air Balloon',
          url: '/data/SampleData/models/CesiumBalloon/CesiumBalloon.glb',
          height: 1000.0,
        },
        {
          id: '5',
          name: 'Milk Truck',
          url: '/data/SampleData/models/CesiumMilkTruck/CesiumMilkTruck.glb',
          height: 0,
        },
        {
          id: '6',
          name: 'Skinned Character',
          url: '/data/SampleData/models/models/CesiumMan/Cesium_Man.glb',
          height: 0,
        },
        {
          id: '7',
          name: 'Draco Compressed Model',
          url: '/data/SampleData/models/DracoCompressed/CesiumMilkTruck.gltf',
          height: 0,
        },
        {
          id: '8',
          name: 'KTX2 Compressed Balloon',
          url: '/data/SampleData/models/CesiumBalloonKTX2/CesiumBalloonKTX2.glb',
          height: 1000.0,
        },
        // {
        //   text: 'KTX2 Compressed Balloon',
        //   onselect: function () {
        //     if (!Cesium.FeatureDetection.supportsBasis(viewer.scene)) {
        //       window.alert(
        //         'This browser does not support Basis Universal compressed textures'
        //       )
        //     }
        //     createModel(
        //       '../SampleData/models/CesiumBalloonKTX2/CesiumBalloonKTX2.glb',
        //       1000.0
        //     )
        //   }
        // }
      ],
    }
  },
  mounted() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      const el = this.$refs['viewerDom']
      viewer = new Cesium.Viewer(el, {
        infoBox: false,
        selectionIndicator: false,
        shadows: true,
        shouldAnimate: true,
      })
      window.viewer = viewer
      const url = '/data/SampleData/models/CesiumAir/Cesium_Air.glb'
      const height = 5000
      this.handleCreateModel(url, height)
    },
    handleCreateModel(url, height) {
      viewer.entities.removeAll()
      const position = Cesium.Cartesian3.fromDegrees(
        -123.0744619,
        44.0503706,
        height,
      )
      const heading = Cesium.Math.toRadians(135)
      const pitch = 0
      const roll = 0
      const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr,
      )

      const entity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
          uri: url,
          minimumPixelSize: 128,
          maximumScale: 20000,
        },
      })
      viewer.trackedEntity = entity
    },
    handleModelChange(modelId) {
      const model = this.modelGallery.filter((item) => item.id === modelId)[0]
      this.handleCreateModel(model.url, model.height)
    },
  },
}
</script>
<style lang="scss" scoped>
.glb-model-container {
  height: 100%;
  width: 100%;
  .model-switcher {
    position: absolute;
    top: 30px;
    left: 10px;
    z-index: 99;
  }
}
</style>
