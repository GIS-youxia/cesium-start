<template>
  <div class="viewer-container" ref="viewerDom"></div>
</template>

<script>
import initUtils from '@/utils/cesium/viewerUtil'
export default {
  mounted() {
    this.mapInit()
  },
  methods: {
    mapInit() {
      const mapEl = this.$refs['viewerDom']
      const viewer = initUtils.viewerInit(mapEl)
      this.$emit('handleViewerInited', viewer)
    },
  },
}
</script>

<style lang="scss">
.viewer-container {
  height: 100%;
}
</style>
