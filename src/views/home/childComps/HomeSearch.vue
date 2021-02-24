<template>
  <div  v-if="weather !== null" class="box">

    <!-- 城市定位 -->
    <div class="city" @click="openCitySelect()">
      <i class="el-icon-location-information"></i>
      <span>{{ weather.city }}</span>
      <i class="el-icon-arrow-down"></i>
    </div>

    <!-- 搜索框-->
    <div class="search" @click="openSearch()">
      <el-input
          placeholder="点击搜索附近景点"
          prefix-icon="el-icon-search"
          readonly>
      </el-input>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomeSearch",
  props: {
    weather: {
      default() {
        return {
          city: '加载中'
        }
      }
    }
  },
  methods: {
    openSearch() {
      this.$router.push("/search");
    },
    openCitySelect() {
      this.$router.push({
        path: "/locat",
        query: {
          city: this.weather.city
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
.box {
  //background-color: rgba(72, 160, 215, 0.5);
  background: linear-gradient(to bottom, rgba(72, 160, 215, 0.6) 0%, rgba(72, 160, 215, 0.3) 100%);
  padding: 10px;
  position: relative;
}
.city {
  width: 25%;
  display: inline-block;
  margin: 10px 0;
  font-size: 14px;
  text-align: center;
}

.search {
  width: 65%;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-33%, -50%);
}
</style>