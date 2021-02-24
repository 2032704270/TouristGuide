<template>
  <div>
    <scroll
        ref="scroll"
        class="content"
        :probe-type="3"
        :pull-up-load="true"
        @pullUpLoad="pullUpLoad"
    >
      <!-- 搜索框-->
      <home-search :weather="weather"></home-search>
      <!-- 搜索框end-->

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
      let city = window.sessionStorage.getItem("city");
      // console.log(city, typeof city)
      let url = "https://v0.yiketianqi.com/api?version=v61&appid=42324689&appsecret=AapextZ9";
      if (!city instanceof Object) {
        url = url + "&city=" + JSON.parse(city);
      }
      request.get(url).then(({data}) => {
        // console.log(data);
        this.weather = data;
        if (city === null || city === "undefined") {
          window.sessionStorage.setItem("city", JSON.stringify(data.city));
        }
      });
    },
    pullUpLoad() {
      this.UpLoad = !this.UpLoad;
    },
    // 防抖动
    debounce(fn, delay) {
      let timer = null;
      return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this);
        }, delay);
      };
    },
  },
  mounted() {
    // 防抖动
    const refresh = this.debounce(this.$refs.scroll.refresh, 50);
    // 事件总线
    this.$bus.$on("ItemImageLoad", () => {
      this.debounce();
      // 监听图片加载完就刷新一次scrollHeight
      refresh();
    });
  },
  created() {
    this.getSwiperData();
    this.getWeather();
  },
};
</script>
<style lang="less" scoped>
.content {
  height: calc(100vh - 49px);
  overflow: hidden;
}
</style>