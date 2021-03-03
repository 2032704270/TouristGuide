<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <i class="el-icon-arrow-left" @click="$router.push('/home')"></i>
      <div class="searchInput">
        <el-input
            placeholder="城市名称"
            prefix-icon="el-icon-search"
            v-model="searchC">
        </el-input>
      </div>
    </div>
    <!-- 头部end -->

    <scroll ref="scroll" class="content" :probe-type="3" :pull-up-load="true" @pullUpLoad="pullUpLoad">
      <!--渲染城市列表-->
      <div v-if="searchC.length===0">
        <locat-city-list :city="city" :CityList="CityList"></locat-city-list>
      </div>

      <!--渲染搜索列表-->
      <div v-else>
        <div v-for="(item, index) in searchCity" :key="index" class="searchCity" @click="selectCity(item.city_name)">
          {{ item.city_name }}
        </div>
      </div>

    </scroll>

    <!--渲染快捷跳转-->
    <div class="list" v-if="searchC.length <= 0">
      <p v-for="(item,j) in CityList" :key="'i' + j">
        <span @click="jumpCity('city' + item.letter.toUpperCase())">
          {{ item.letter.toUpperCase() }}
        </span>
      </p>
    </div>

  </div>
</template>

<script>
import Scroll from "../../common/scroll/Scroll";
import LocatCityList from "./children/LocatCityList"

export default {
  name: "Locat",
  components: {
    Scroll,
    LocatCityList,
  },
  data() {
    return {
      searchC: '',
      city: {},
      CityList: [],
      CityData: [],
      one: true,
      searchCity: [],
    }
  },
  methods: {
    init() {
      if (this.$route.query !== null) {
        this.city.city_name = this.$route.query.city
        this.getCityList()
      }
    },
    getCityList() {
      this.$axios({
        url: '?service=Request.getCityList'
      }).then(({data: {data}}) => {
        // console.log(data)
        this.CityData = data
        this.CityList = data
        this.sortCity()
      })
    },
    sortCity() {
      if (!String.prototype.localeCompare) return null
      let letters = 'abcdefghjklmnopqrstwxyz'.split('')
      let zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('')
      let segs = []
      letters.map((item, i) => {
        let cur = {letter: item, data: []}
        this.CityList.map((item) => {
          if (item.city_name.localeCompare(zh[i]) >= 0 && item.city_name.localeCompare(zh[i + 1]) < 0) {
            cur.data.push(item)
          }
        })
        cur.data.sort(function (a, b) {
          return a.city_name.localeCompare(b, 'zh')
        })
        segs.push(cur)
      })
      this.CityList = segs
      // console.log(this.CityList)
    },
    debounce(fn, delay) {
      let timer = null;
      return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this);
        }, delay);
      };
    },
    pullUpLoad() {
      this.$bus.$emit("reloadScroll");
    },
    jumpCity(id) {
      let scrollTop = document.querySelectorAll("#" + id)[0].offsetTop
      // console.log(scrollTop)
      if (this.one) {
        this.one = false
        this.$refs.scroll.scrollTo(0, -scrollTop + 60)
      } else {
        this.$refs.scroll.scrollTo(0, -scrollTop)
      }
      this.$refs.scroll.refresh()
    },
    selectCity(city) {
      console.log(city)
      window.sessionStorage.setItem("city", JSON.stringify(city));
      this.$router.push("/home");
    }
  },
  created() {
    this.init()
  },
  mounted() {
    // 防抖动
    const refresh = this.debounce(this.$refs.scroll.refresh, 50);
    // 事件总线
    this.$bus.$on("reloadScroll", () => {
      this.debounce();
      refresh();
    });
  },
  watch: {
    searchC(newVal) {
      this.searchCity = []
      for (let i = 0; i < this.CityData.length; i++) {
        if (this.CityData[i].city_name.indexOf(newVal) === 0) {
          this.searchCity.push(this.CityData[i])
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  height: calc(100vh - 60px);
  overflow: hidden;
}

.header {
  background: linear-gradient(to bottom, rgba(72, 160, 215, 0.6) 0%, rgba(72, 160, 215, 0.3) 100%);
  padding: 0 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  i {
    display: inline-block;
    margin: 0 auto;
  }

  .searchInput {
    width: 85%;
    padding: 10px;
  }
}

.list {
  font-size: 12px;
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.searchCity {
  color: black;
  margin: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #666;
}
</style>