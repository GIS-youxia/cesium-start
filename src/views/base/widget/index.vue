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
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const el = this.$refs['widgetDom']
      const widget = new Cesium.CesiumWidget(el)
      console.log(widget)
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
