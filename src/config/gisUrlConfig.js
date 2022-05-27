/** 天地图服务token */
const tdtAccessToken = 'd4a3ea97540bebbd2c400faaeed26986'
/** mapbox服务token */
const mapboxAccessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'

/** 天地图XYZ格式影像图url */
const tdtXYZurl = {
  /**img 天地图影像图层*/
  img: `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtAccessToken}`,
  /** cia 天地图影像注记 */
  cia: `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtAccessToken}`,
  /** ibo 天地图影像国境线 */
  ibo: `http://t0.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtAccessToken}`,
  /** vec 天地图电子地图 */
  vec: `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtAccessToken}`,
  /** cva 天地图电子地图注记 */
  cva: `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtAccessToken}`,
  /** ter 天地图地形晕渲图 */
  ter: `http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtAccessToken}`,
  /** cta 天地图地形注记 */
  cta: `http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtAccessToken}`,
  /** tbo 天地图地形国境线 */
  tbo: `http://t0.tianditu.gov.cn/tbo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=tbo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtAccessToken}`
}

/** arcgisOnline在线地图 */
const arcgisOnlineUrl = {
  /** 全球街景地图 */
  World_Street_Map:
    'http://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer',
  /** 全球影像图 */
  World_Imagery:
    'http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
  /** 全球地形晕渲图 */
  World_Terrain_Base:
    'http://server.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer',
  /** 彩色中文含兴趣点版高清中国基础地图 */
  ChinaOnlineCommunity_Mobile:
  'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity_Mobile/MapServer',
  /** 彩色英文含兴趣点版中国基础地图 */
  ChinaOnlineCommunityENG:
  'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunityENG/MapServer',
  /** 彩色中文含兴趣点版中国基础地图 */
  ChinaOnlineCommunity:
  'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer',
  /** 灰色中文不含兴趣点版中国基础地图 */
  ChinaOnlineStreetGray:
  'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
  /** 蓝黑色中文不含兴趣点版中国基础地图 */
  ChinaOnlineStreetPurplishBlue:
  'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
  /** 暖色中文不含兴趣点版中国基础地图 */
  ChinaOnlineStreetWarm:
  'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer'
}

/** mapbox地图服务id*/
const mapboxIds = [
  'mapbox.satellite',
  'mapbox.streets',
  'mapbox.streets-basic',
  'mapbox.light',
  'mapbox.streets-satellite',
  'mapbox.wheatpaste',
  'mapbox.comic',
  'mapbox.outdoors',
  'mapbox.run-bike-hike',
  'mapbox.pencil',
  'mapbox.pirates',
  'mapbox.emerald',
  'mapbox.high-contrast'
]
/** mapbox地图样式*/
const mapboxStyles = [
  'streets-v11',
  'outdoors-v11',
  'light-v10',
  'dark-v10',
  'satellite-v9',
  'satellite-streets-v11',
  'navigation-day-v1',
  'navigation-night-v1'
]
const googleXYZUrl = {}

/** 超图服务地址 */
const supermapXYZUrl = {
  /** 超图云地图 */
  china400:
    'http://www.supermapol.com/realspace/services/map-China400/rest/maps/China400/zxyTileImage/{z}/{x}/{y}.png'
}

/** wms服务地址 */
const wmsTestLayerUrl = [
  {
    url: 'http://geo.hydrology.vip/geoserver/geo/wms',
    layerName: 'geo:shanxi_boundary',
    isGeoServerService: true
  },
  {
    url: 'http://geo.hydrology.vip/geoserver/geo/wms',
    layerName: 'geo:地理分区',
    isGeoServerService: true
  },
  {
    url: 'http://geo.hydrology.vip/geoserver/geo/wms',
    layerName: 'geo:干湿分区',
    isGeoServerService: true
  },
  {
    url: 'http://geo.hydrology.vip/geoserver/geo/wms',
    layerName: 'geo:温度带分区',
    isGeoServerService: true
  }
]

/** wmts 测试服务地址 */
const wmtsTestLayerUrl = [
  {
    url: 'http://geo.hydrology.vip/geoserver/gwc/service/wmts/rest/geo:地理分区/{style}/{TileMatrixSet}/{TileMatrixSet}:{TileMatrix}/{TileRow}/{TileCol}?format=image/png',
    layerName: 'geo:地理分区',
    tileMatrixSetID: 'EPSG:900913',
    isWGS_84: false
  },
  {
    url: 'http://39.103.211.1:8090/iserver/services/map-china400/wmts-china',
    layerName: 'China',
    tileMatrixSetID: 'ChinaPublicServices_China',
    isWGS_84: true
  }
]

export default {
  tdtXYZurl,
  arcgisOnlineUrl,
  mapboxIds,
  mapboxStyles,
  googleXYZUrl,
  mapboxAccessToken,
  supermapXYZUrl,
  wmsTestLayerUrl,
  wmtsTestLayerUrl
}
