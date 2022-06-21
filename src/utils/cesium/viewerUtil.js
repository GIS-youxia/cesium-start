import {
  Viewer,
  Camera,
  Rectangle,
  Cartesian3,
  Math,
  ScreenSpaceEventType,
  ShadowMode,
  Clock,
  SceneMode,
  viewerPerformanceWatchdogMixin
} from 'cesium'
// 视图定位到中国范围内
Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(100,10,120,70)
// 通过摄像机视口来设置cesium地球大小，0 表示地球填满视窗，越大于0表示地球距离视口越远，越小于0表示距离地球视口越近
Camera.DEFAULT_VIEW_FACTOR = 0.2

/**
 * @description 初识化Viewer
 * @author zcj
 * @param {*} cesiumContainer viewer 的dom元素
 * @return {*}
 */
const viewerInit = (cesiumContainer) => {
  const viewer = new Viewer(cesiumContainer, {
    // 是否开启阴影
    shadows: true,
    //地形阴影
    terrainShadows: ShadowMode.ENABLED,
    // 使用基于太阳位置的光照
    enableLighting: true,
    //是否允许动画
    shouldAnimate: true,
    // 是否使用默认的图层选择器
    baseLayerPicker: false,
    // 全屏按钮
    fullscreenButton: false,
    // 不自动添加影像图层
    imageryProvider: false,
    // 地理位置查询定位控件
    geocoder: false,
    // 是否显示home按钮
    homeButton: false,
    //是否显示信息框
    infoBox: false,
    //是否显示右上角的帮助按钮
    navigationHelpButton: false,
    //是否显示选取指示器组件
    selectionIndicator: false,
    // 是否显示3D/2D选择器
    sceneModePicker: false,
    //是否显示时间轴
    timeline: false,
    //是否创建动画小器件，左下角仪表
    animation: false,
    //用于控制当前时间的时钟对象
    clock: new Clock(),
    //全屏时渲染的HTML元素,
    fullscreenElement: document.body,
    //使用默认render loop时的帧率
    targetFrameRate: undefined,
    //如果设为true，将在一个HTML面板中显示错误信息
    showRenderLoopErrors: false,
    //自动追踪最近添加的数据源的时钟设置
    automaticallyTrackDataSourceClocks: true,
    // webgl相关设置
    contextOptions: {
      webgl: {
        // 截屏需要将此功能设置为true
        preserveDrawingBuffer: true
      }
    },
    //初始场景模式
    sceneMode: SceneMode.SCENE3D
  })
  //初始化阴影
  viewer.scene.shadowMap.enabled = false
  //去除镜头阴影遮盖
  viewer.scene.logarithmicDepthBuffer = false
  //解决底图偏暗问题
  viewer.scene.highDynamicRange = false
  //开启抗锯齿,与label清晰度有关
  viewer.scene.postProcessStages.fxaa.enabled = true
  //去除默认双击跟随效果
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  )
  viewer.extend(viewerPerformanceWatchdogMixin, {
    lowFrameRateMessage: '系统刷新缓慢,请稍后.'
  })
  // 禁止相机进入地下
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = true
  // 去掉cesium的标识
  viewer._cesiumWidget._creditContainer.style.display = 'none'
  //地球特性设置
  //平移惯性消失
  viewer.scene.screenSpaceCameraController.inertiaSpin = 0
  //缩放惯性消失
  viewer.scene.screenSpaceCameraController.inertiaZoom = 0
  //关闭深度测试
  viewer.scene.globe.depthTestAgainstTerrain = false
  // setView(viewer)
  return viewer
}

// 调整初始化视角
const setView = (viewer) => {
  viewer.camera.flyTo({
    // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
    // fromDegrees()方法，将经纬度和高程转换为世界坐标
    // 参考 https://blog.csdn.net/renkangever/article/details/106781315
    destination: Cartesian3.fromDegrees(108.94,34.34, 7500000),
    orientation: {
      // 航向角
      heading: Math.toRadians(0),
      // 俯仰角
      pitch: Math.toRadians(-90),
      // 翻滚角
      roll: Math.toRadians(0)
    }
  })
}

export default {
  viewerInit
}
