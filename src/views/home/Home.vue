<template>
  <div>
    <!-- 搜索框-->
    <home-search :weather="weather"></home-search>
    <!-- 搜索框end-->

    <scroll
        ref="scroll"
        class="content"
        :probe-type="3"
        :pull-up-load="true"
        @pullUpLoad="pullUpLoad"
    >

      <!-- 轮播图 -->
      <home-swiper :banners="swiperList"></home-swiper>
      <!-- 轮播图end -->

      <!-- 天气-->
      <home-weather :weather="weather"></home-weather>
      <!-- 天气end-->

      <!-- 资料内容-->
      <home-information :city="weather.city" :UpLoad="UpLoad"></home-information>
      <!-- 资料内容end-->
    </scroll>
  </div>
</template>
<script>
import Scroll from "../../common/scroll/Scroll";
import HomeSearch from "./childComps/HomeSearch";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeWeather from "./childComps/HomeWeather";
import HomeInformation from "./childComps/HomeInformation";

import {itemListenerMixin} from "../../common/mixin";

import request from "axios";

export default {
  name: "Home",
  components: {
    HomeSearch,
    HomeSwiper,
    Scroll,
    HomeWeather,
    HomeInformation,
  },
  mixins: [
    itemListenerMixin
  ],
  data() {
    return {
      swiperList: [],
      weather: {},
      UpLoad: false,
    };
  },
  methods: {
    // 获取轮播图数据
    getSwiperData() {
      this.$axios({
        url: "?service=Request.getChartData",
      }).then(({data: {data}}) => {
        // console.log(data)
        this.swiperList = data;
      });
    },
    getWeather() {
      let city = sessionStorage.getItem("city");
      let url = "https://v0.yiketianqi.com/api?version=v61&appid=42324689&appsecret=AapextZ9";
      if (sessionStorage.getItem("city")) {
        url = url + "&city=" + JSON.parse(city);
      }
      request.get(url).then(({data}) => {
        // console.log(data);
        this.weather = data;
        if (city === null || city === "undefined") {
          sessionStorage.setItem("city", JSON.stringify(data.city));
        }
      });
    },
    pullUpLoad() {
      this.UpLoad = !this.UpLoad;
    },
  },
  created() {
    this.getSwiperData();
  },
  activated() {
    this.getWeather()
    this.$bus.$emit("ItemImageLoad");
  }
};
</script>
<style lang="less" scoped>
.content {
  height: calc(100vh - 49px - 56px);
  overflow: hidden;
}
</style>