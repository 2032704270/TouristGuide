<template>
  <div>
    <!-- 头部 -->
    <mt-header title="收藏列表" class="headerNav">
      <mt-button slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </mt-button>
    </mt-header>
    <!-- 头部end -->

    <scroll ref="scroll" class="content" :probe-type="3" :pull-up-load="true" @pullUpLoad="pullUpLoad">
      <el-card class="box-card" v-if="data !== null">
        <div class="box" @click="openDetailsScreen(item)" v-for="(item,index) in data" :key="index">

          <div class="covermap">
            <img :src="$root.URL + item.info_covermap" @load="busEmit"/>
          </div>

          <div class="contentBox">
            <div class="title">
              <i class="el-icon-guide"></i>
              <span>{{ item.info_title }}</span>
            </div>
            <div class="info">
              <div>{{ item.updateTime }}</div>
              <div>
                <i class="el-icon-star-on"></i>
              </div>

            </div>
          </div>
        </div>
      </el-card>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../../common/scroll/Scroll";

export default {
  name: "PersonalCollection",
  data() {
    return {
      data: null,
    }
  },
  components: {
    Scroll,
  },
  methods: {
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
    openDetailsScreen(item) {
      this.$router.push({
        path: "/details",
        query: {
          id: item.info_id,
        },
      });
    },
    busEmit() {
      // 如果执行了一次监听图片是否加载完成,就会执行一次this.$bus.$emit 事件
      this.$bus.$emit("ItemImageLoad");
    },
    getData(value) {
      this.$axios({
        url: "?service=Request.getInfoDataById",
        method: "post",
        data: {
          data: value,
        }
      }).then(({data: {data}}) => {
        // console.log(data);
        this.data = data;
      })
    }
  },
  created() {
    if (this.$route.params.data == null) {
      this.getData(sessionStorage.getItem("collection"));
    } else {
      sessionStorage.setItem("collection", this.$route.params.data);
      this.getData(this.$route.params.data);
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 100vh;
  overflow: hidden;
}

.box {
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #999999;
}

.box-card {
  width: 100%;
  height: 100%;
}

.covermap {
  display: inline-block;
  width: 26%;
  height: 60px;

  img {
    width: 100%;
    height: 100%;
  }
}

.contentBox {
  display: inline-block;
  width: 70%;
  height: 60px;
  vertical-align: top;
  position: relative;
  margin-left: 5px;
}

.title {
  text-indent: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.info {
  text-indent: 5px;
  position: absolute;
  width: 100%;
  right: 0;
  bottom: 0;
  text-align: right;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  div {
    display: inline-block;
  }
}
</style>