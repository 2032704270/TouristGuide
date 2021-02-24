<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <i class="el-icon-arrow-left" @click="$router.push('/home')"></i>
      <div class="searchInput">
        <el-input
            placeholder="请输入您想查找的内容"
            prefix-icon="el-icon-search"
            v-model="searchStr">
        </el-input>
      </div>
    </div>
    <!-- 头部end -->

    <scroll ref="scroll" class="content" :probe-type="3" :pull-up-load="true" @pullUpLoad="pullUpLoad">
      <!--渲染城市列表-->
      <div v-if="searchStr.length===0">
        <search-content></search-content>
      </div>

      <!--渲染搜索列表-->
      <div v-else>
        <div v-for="(item, index) in searchDetails" :key="index" class="searchDetails"
             @click="jumpDetails(item.info_id)" v-if="searchDetails.length > 0">
          {{ item.info_title }}
        </div>
        <div v-else>
          <h1>我好像找不到你要的内容!</h1>
        </div>
      </div>

    </scroll>

  </div>
</template>
<script>
import Scroll from "../../common/scroll/Scroll";
import SearchContent from "./children/SearchContent"

export default {
  name: 'Search',
  components: {
    Scroll,
    SearchContent
  },
  data() {
    return {
      searchStr: "",
      searchDetails: [],
    }
  },
  methods: {
    pullUpLoad() {
      this.$bus.$emit("reloadScroll");
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
    jumpDetails(info_id) {
      this.$router.push({
        path: "/details",
        query: {
          id: info_id,
        },
      });
    },
    searchData(value) {
      this.$axios({
        url: "?service=Request.searchInfoData",
        method: "post",
        data: {
          value: value,
        }
      }).then(({data}) => {
        // console.log(data)
        this.searchDetails = data.data;
      })
    },
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
    searchStr(newVal) {
      if (newVal.length !== 0) {
        this.searchData(newVal);
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

.searchDetails {
  color: black;
  margin: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #666;
}
</style>