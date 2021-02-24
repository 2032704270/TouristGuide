<template>
  <div v-if="Object.keys(weather).length !== 0" class="box">
    <el-card shadow="always">
      <p>
        <span>
          <i :class="wea[currentWeather]"></i>
          {{ weather.wea }}
          <i class="spacing"></i>
          {{ weather.tem }}
          <i class="spacing"></i>
          空气{{ weather.air_level }}
        </span>
      </p>

      <p class="air_tips">
        <i class="el-icon-s-opportunity"></i>
        {{ weather.air_tips }}
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HomeWeather",
  props: {
    weather: {
      type: Object,
      default() {
        return {
          city: '加载中',
          data: [{wea: '晴天'}]
        }
      }
    }
  },
  data() {
    return {
      wea: {
        'lightning': 'el-icon-lightning',
        'heavyRain': 'el-icon-heavy-rain',
        'lightRain': 'el-icon-light-rain',
        'sunny': 'el-icon-sunny',
        'cloudy': 'el-icon-cloudy-and-sunny',
      },
      currentWeather: '',
    }
  },
  watch: {
    weather() {
      if (this.weather != null) {
        let wea = this.weather.wea
        if (wea.indexOf('雷') !== -1) {
          this.currentWeather = 'lightning'
        } else if (wea.indexOf('小雨') !== -1) {
          this.currentWeather = 'lightRain'
        } else if (wea.indexOf('多云') !== -1) {
          this.currentWeather = 'cloudy'
        } else if (wea.indexOf('晴') !== -1) {
          this.currentWeather = 'sunny'
        } else {
          this.currentWeather = 'heavyRain'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding-top: 10px;
}

.spacing {
  display: inline-block;
  margin: 0 10px;
}

.air_tips {
  font-size: 12px;
  padding-top: 20px;
}
</style>