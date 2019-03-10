<template>

  <div class="amap-page-container">
    <el-amap-search-box class="search-box" :on-search-result="onSearchResult" :center="center"></el-amap-search-box>
    <el-amap
      class="amap-demo"
      vid="amapDemo"
      :center="center"
      :zoom.sync="zoom"
      :plugin="plugin"
      :events="events">
      <el-amap-marker
        :position="marker.position"
        :events="marker.events"
        :visible="marker.visible"
        :draggable="marker.draggable">
      </el-amap-marker>
    </el-amap>
    <div class="toolbar">
      经纬度: [{{ lng }}, {{ lat }}] 地址: {{ tempAddress }}
    </div>
  </div>

</template>

<script>
export default {
  name: "index",
  created() {
    this.init()
  },
  props: {
    longitude: {
      type: Number,
      default: 112.495301
    },
    latitude: {
      type: Number,
      default: 23.107272
    },
    address: String
  },
  data() {
    return {
      marker:{
        position: [112.495301, 23.107272],
        visible: true,
        draggable: false
      },
      zoom: 16,
      center: [112.495301, 23.107272],
      events: {
        click: (e) => {
          let { lng, lat } = e.lnglat;
          this.lng = lng;
          this.lat = lat;
          this.marker.position = [lng, lat]
          this.getAddressFromGeocoder()
        }
      },
      plugin: ['OverView', 'Scale', 'ToolBar']
    }
  },
  computed: {
    lng: {
      get() {
        return this.longitude
      },
      set(val) {
        this.$emit('update:longitude', val)
      }
    },
    lat: {
      get() {
        return this.latitude
      },
      set(val) {
        this.$emit('update:latitude', val)
      }
    },
    tempAddress: {
      get() {
        return this.address
      },
      set(val) {
        this.$emit('update:address', val)
      }
    }
  },
  methods: {
    init() {
      this.marker.position = [this.longitude, this.latitude]
      this.center = [this.longitude, this.latitude]
      this.tempAddress = this.address
      this.zoom = 16
      this.getAddressFromGeocoder()
    },
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let {lng, lat} = poi;
          lngSum += lng;
          latSum += lat;
          // this.markers.push([poi.lng, poi.lat]);
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.center = [center.lng, center.lat]
        this.marker.position = [center.lng, center.lat]
      }
    },
    getAddressFromGeocoder() {
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });
      geocoder.getAddress([this.lng ,this.lat], (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.regeocode) {
            this.tempAddress = result.regeocode.formattedAddress;
            this.$nextTick();
          }
        }
      });
    }
  }

}
</script>

<style scoped>

  .amap-demo {
    height: 450px;
  }

  .amap-page-container {
    position: relative;
  }

  .search-box {
    position: absolute;
    top: 25px;
    right: 20px;
  }

  .toolbar {
    margin-top: 10px;
  }

</style>
