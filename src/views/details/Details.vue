<template>
  <div class="box">
    <!-- 头部 -->
    <mt-header :title="data.city + '市'" class="headerNav">
        <mt-button slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </mt-button>
    </mt-header>
    <!-- 头部end -->

    <!-- 内容 -->
    <scroll ref="scroll" class="content" :probe-type="3" :pull-up-load="true">
      <details-content :info="data"></details-content>
    </scroll>
    <!-- 内容end -->

    <!-- 评论框-->
    <details-comment :data="data" @reloadInfoData="reloadInfoData"></details-comment>
    <!-- 评论框end-->
  </div>
</template>

<script>
import Scroll from "../../common/scroll/Scroll";
import DetailsContent from "./children/DetailsContent";
import DetailsComment from "./children/DetailsComment";

export default {
  name: "Details",
  components: {
    Scroll,
    DetailsContent,
    DetailsComment,
  },
  data() {
    return {
      data: {},
      loading: false,
    };
  },
  methods: {
    init() {
      if (this.$route.query != null) {
        let id = this.$route.query.id;
        this.$axios({
          url: "?service=Request.getInfoById",
          method: "post",
          data: {
            id: id,
          },
        }).then(({data: {data}}) => {
          // console.log(data);
          this.data = data;
          this.loading.close();
        });
      }
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
    reloadInfoData() {
      this.init()
    }
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
    this.loading = this.$Loading.service({
      text: "拼命加载中...",
      background: "rgba(255,255,255,.5)",
    });
    this.init();
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 100vh;
  z-index: 100;
  position: relative;
  background-color: #ffffff;
}

.headerNav {
  height: 40px;
}

.content {
  height: calc(100vh - 80px);
  overflow: hidden;
}

</style>