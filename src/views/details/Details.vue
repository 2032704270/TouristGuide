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

import {itemListenerMixin} from "../../common/mixin";

export default {
  name: "Details",
  components: {
    Scroll,
    DetailsContent,
    DetailsComment,
  },
  mixins: [
    itemListenerMixin
  ],
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
    reloadInfoData() {
      this.init()
    }
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