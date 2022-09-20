<!-- 
    @description quickstart页面
    @author zhangcj
    @date 2022-05-27 15:07:08 
 -->
<template>
  <div class="quick-start-container">
    <cesium-com @handleViewerInited="handleViewerInited" />
  </div>
</template>
<script>
import CesiumCom from '@/components/CesiumCom'
import layerUtil from '@/utils/cesium/imageryLayerUtil'
export default {
  name: '',
  components: { CesiumCom },
  data() {
    return {
      _viewer: {},
    }
  },
  methods: {
    handleViewerInited(viewer) {
      this._viewer = viewer
      layerUtil.addTDTLayer(viewer, 'img', 'img')
      layerUtil.addTDTLayer(viewer, 'cia', 'cia')
      layerUtil.addTDTLayer(viewer, 'ibo', 'ibo')
    },
  },
}
</script>
<style lang="scss" scoped>
.quick-start-container {
  height: 100%;
}
</style>
