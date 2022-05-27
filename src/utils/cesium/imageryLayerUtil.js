/** 图层相关工具方法 参考 https://zhuanlan.zhihu.com/p/340669216 */
/**
 * 无论是二维地图还是三维地图，如果缺少了底图影像或电子地图，都是不完整的。
 * Cesium为我们提供了ImageryLayerCollection、ImageryLayer以及相关的ImageryProvider类
 * 来加载不同的影像图层。虽然Cesium把此类图层叫做Imagery*，但并不是特指卫星影像数据，
 * 还包括一些互联网地图、TMS、WMS、WMTS、单个图片等
 *
 * */

/**
 * ImageryLayer类 *
 * Cesium.ImageryLayer类用于表示Cesium中的影像图层，它就相当于皮毛、衣服，将数据源包裹在内，
 * 它需要数据源（imageryProvider）为其提供内在丰富的地理空间信息和属性信息。同时，通过该类还能设置影像图层相关属性，比如透明度、亮度、对比度、色调等。
 
 * ImageryProvider类 *
 * Cesium.ImageryProvider类及其子类封装了加载各种影像图层的方法，其中Cesium.ImageryProvider类是抽象类、基类或者可将其理解为接口，它不能被直接实例化。
 * 我们可以把ImageryProvider看作是影像图层的数据源（包裹在ImageryLayer类内部），我们想使用哪种影像图层数据或服务就用对应的ImageryProvider子类去加载，
 * 目前Cesium提供了以下14种ImageryProvider。
 * 
 * ImageryLayerCollection类 *
 * Cesium.ImageryLayerCollection类是ImageryLayer类对象的容器，它可以装载、放置多个ImageryLayer或ImageryProvider类对象，而且它内部放置的ImageryLayer
 * 或ImageryProvider类对象是有序的。
 * Cesium.Viewer类对象中包含的imageryLayers属性就是ImageryLayerCollection类的实例，它包含了当前Cesium应用程序所有的ImageryLayer类对象，即所有影像图层，
 * 所以Cesium种的影像图层可以添加多个。
 * 
  */

const {
  Rectangle,
  ImageryLayer,
  UrlTemplateImageryProvider,
  ArcGisMapServerImageryProvider,
  MapboxImageryProvider,
  MapboxStyleImageryProvider,
  WebMapServiceImageryProvider,
  WebMapTileServiceImageryProvider,
  GeographicTilingScheme,
  WebMercatorTilingScheme
} = window.Cesium
import axios from 'axios'
import x2js from 'xml2js'
import gisUrlConfig from '@/config/gisUrlConfig'

/**
 * @description 添加全球arcgis在线服务
 *            ArcGisMapServerImageryProvider -----支持ArcGIS Online和Server的相关服务。
 *
 * @author zcj
 * @param {*} viewer  viewer
 * @param {*} url  服务地址
 * @param {*} id  图层id
 * @return {*} layer 创建的图层
 */
const addEsriRestLayer = (viewer, url, id) => {
  //  图层id判重
  let layer = findLayerById(viewer, id)
  if (layer !== null) {
    throw new Error(`图层${id}已存在，请检查`)
  }
  const provider = new ArcGisMapServerImageryProvider({
    url: url
  })
  layer = new ImageryLayer(provider)
  layer.id = id
  viewer.imageryLayers.add(layer)
  return layer
}

/**
 * @description 加载Mapbox影像服务，根据mapId指定地图风格
 * @author zcj
 * @param {*} viewer
 * @param {*} mapId
 * @param {*} accessToken
 * @return {*}
 */
const addMapboxImageryLayerById = (viewer, mapId, accessToken) => {
  //  图层id判重
  let layer = findLayerById(viewer, mapId)
  if (layer !== null) {
    throw new Error(`图层${mapId}已存在，请检查`)
  }
  const provider = new MapboxImageryProvider({
    mapId,
    accessToken
  })
  layer = new ImageryLayer(provider)
  layer.id = mapId
  viewer.imageryLayers.add(layer)
  return layer
}

/**
 * @description 添加mapboxStyle图层
 * @author zcj
 * @param {*} viewer cesium中的Viewer对象
 * @param {*} styleId mapbox样式id（参考https://docs.mapbox.com/mapbox-gl-js/api/map/）；
 * @param {*} accessToken 密钥
 * @return {*}
 */
const addMapBoxStyleLayer = (viewer, styleId, accessToken) => {
  let layer = findLayerById(viewer, styleId)
  if (layer !== null) {
    throw new Error(`图层${styleId}已存在，请检查`)
  }

  const provider = new MapboxStyleImageryProvider({
    styleId: styleId,
    accessToken
  })
  layer = new ImageryLayer(provider)
  layer.id = styleId
  viewer.imageryLayers.add(layer)
  return layer
}

/**
 * @description 添加指定url的format模版的影像图层
 * @author zcj
 * @param {*} viewer cesium的Viewer
 * @param {*} url 图层url
 * @param {*} id 图层id
 *
 * @return {*}
 */
const addUrlTemplateImageryLayer = (viewer, url, id) => {
  let layer = findLayerById(viewer, id)
  if (layer !== null) {
    throw new Error(`图层${id}已存在，请检查`)
  }
  const provider = new UrlTemplateImageryProvider({
    url
  })
  layer = new ImageryLayer(provider)
  layer.id = id
  viewer.imageryLayers.add(layer)
  return layer
}

/**
 * @description 添加WMS图层
 * @author zcj
 * @param {*} viewer  cesium的Viewer对象
 * @param {*} url 服务地址，
 * @param {*} layerName 图层名称
 * @param {*} isGeoServerService 是否是GeoServer提供的服务 默认为true
 * @param {*} flyTo  是否缩放到该图层，默认为true
 * @return {*}
 */
const addWMSLayer = (
  viewer,
  url,
  layerName,
  isGeoServerService = true,
  flyTo = true
) => {
  // 图层id判重
  let layer = findLayerById(viewer, layerName)
  if (layer !== null) {
    throw new Error(`图层${layerName}已存在，请检查`)
  }
  const provider = new WebMapServiceImageryProvider({
    url: url,
    layers: layerName,
    parameters: {
      // format必须为png,否则transparent 不生效
      format: 'image/png',
      transparent: true
    }
  })
  layer = new ImageryLayer(provider)
  layer.id = layerName
  viewer.imageryLayers.add(layer)
  if (flyTo) {
    // 获取图层的四至范围
    axios
      .get(`${url}?service=WMS&version=1.1.0&REQUEST=GetCapabilities`)
      .then((res) => {
        // 解析xml
        x2js.parseString(res.data, (err, data) => {
          if (err === null) {
            const layersInfo =
              data.WMT_MS_Capabilities.Capability[0].Layer[0].Layer
            layersInfo.forEach((item) => {
              const flag = isGeoServerService
                ? layerName.split(':')[1]
                : layerName
              if (item.Title[0] === flag) {
                const minx = item.LatLonBoundingBox[0].$.minx
                const miny = item.LatLonBoundingBox[0].$.miny
                const maxx = item.LatLonBoundingBox[0].$.maxx
                const maxy = item.LatLonBoundingBox[0].$.maxy
                // 构建可视范围的矩形框
                const rectangle = Rectangle.fromDegrees(
                  parseFloat(minx),
                  parseFloat(miny),
                  parseFloat(maxx),
                  parseFloat(maxy)
                )
                // 定位到可视范围内
                viewer.camera.flyTo({
                  destination: rectangle
                })
              }
            })
          }
        })
      })
  }

  return layer
}

/**
 * @description 添加WMTS服务
 * WebMapTileServiceImageryProvider
 * 服务WMTS1.0.0规范的影像服务，都可以通过该类实现
 * @author zcj
 * @param {*} viewer
 * @param {*} url
 * @param {*} layerName
 * @param {*} tileMatrixSetID
 * @param {*} isWGS_84 默认为false
 * @return {*}
 */
const addWMTSLayer = (
  viewer,
  url,
  layerName,
  tileMatrixSetID,
  isWGS_84 = false
) => {
  let layer = findLayerById(viewer, layerName)
  if (layer !== null) {
    throw new Error(`图层${layerName}已存在，请检查`)
  }
  const provider = new WebMapTileServiceImageryProvider({
    url,
    layer: layerName,
    style: '',
    format: 'image/png',
    tileMatrixSetID,
    tilingScheme: isWGS_84
      ? new GeographicTilingScheme()
      : new WebMercatorTilingScheme()
  })
  layer = new ImageryLayer(provider)
  layer.id = layerName
  viewer.imageryLayers.add(layer)
  return layer
}

/**
 * @description 添加天地图
 * @author zcj
 * @param {*} viewer  viewer
 * @param {*} type
 *                img 天地图影像图层
 *                cia 天地图影像注记
 *                ibo 天地图影像国境线
 *                vec 天地图电子地图
 *                cva 天地图电子地图注记
 *                ter 天地图地形晕渲图
 *                cta 天地图地形注记
 *                tbo 天地图地形国境线
 * @param {*} id  图层id
 * @return {*}
 * @memberof LayerManager
 */
const addTDTLayer = (viewer, type, id) => {
  //  图层id判重
  let layer = findLayerById(viewer, id)
  if (layer !== null) {
    throw new Error(`图层${id}已存在，请检查`)
  }
  const url = gisUrlConfig.tdtXYZurl[type]
  const provider = new UrlTemplateImageryProvider({
    url: url
  })
  layer = new ImageryLayer(provider)
  layer.id = id
  viewer.imageryLayers.add(layer)
  return layer
}

/**
 * @description 根据id查找图层
 * @author zcj
 * @param {*} viewer cesium的Viewer对象
 * @param {*} id 图层id
 * @return {*} layer 查找到的图层
 */
const findLayerById = (viewer, id) => {
  let targetLayer = null
  const layers = viewer.imageryLayers._layers
  layers.forEach((layer) => {
    if (layer.id === id) {
      targetLayer = layer
    }
  })
  return targetLayer
}

/**
 * @description 根据图层id删除图层
 * @author zcj
 * @param {*} viewer cesium的Viewer对象
 * @param {*} id 图层id
 */
const removeLayerById = (viewer, id) => {
  const layer = findLayerById(viewer, id)
  if (layer === null) {
    throw new Error(`图层${id}不存在，请检查`)
  }
  // layer.show = false
  viewer.imageryLayers.remove(layer)
}

export default {
  addTDTLayer,
  addEsriRestLayer,
  addMapboxImageryLayerById,
  addWMSLayer,
  addWMTSLayer,
  addMapBoxStyleLayer,
  addUrlTemplateImageryLayer,
  findLayerById,
  removeLayerById
}
