<template>
  <div>
    <!--渲染顶部-->
    <div class="lookCity">你正在看: {{ city.city_name }}</div>
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>

    <!--渲染城市列表-->
    <div v-for="(item,index) in CityList" :key="index">
      <div class="letter" :id="'city' + item.letter.toUpperCase()">{{ item.letter.toUpperCase() }}</div>
      <div class="city" v-for="(city,i) in item.data" :key="i">
        <div @click="selectCity(city)">{{ city.city_name }}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LocatCityList",
  props: {
    city: {
      default() {
        return {
          city_name: '广州'
        }
      }
    },
    CityList: {},
  },
  methods: {
    selectCity(city) {
      // console.log(JSON.stringify(city))
      window.sessionStorage.setItem("city", JSON.stringify(city));
      this.$router.push("/home");
    }
  },
}
</script>

<style lang="less" scoped>
.lookCity {
  height: 30px;
  line-height: 50px;
  font-weight: 900;
  color: #000;
  text-indent: 1em;
}

.letter {
  height: 20px;
  line-height: 20px;
  background-color: rgba(0, 0, 0, .1);
  font-size: 14px;
  color: #666;
  text-indent: 1em;
}

.city {
  margin: 10px 15px;
  height: 30px;
  color: #000;
  border-bottom: 1px solid #999;
}
</style>