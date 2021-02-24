<template>
  <div v-if="city !== null">
    <el-card class="box-card">
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
              <i class="el-icon-chat-dot-round"></i>
              {{ item.commentNumber }} 评论
            </div>

          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HomeInformation",
  props: {
    city: {
      default() {
        return "";
      },
    },
    UpLoad: {},
  },
  data() {
    return {
      start: 0,
      count: 8,
      data: [],
      loading: "",
    };
  },
  methods: {
    // 获取资料数据
    getInfoData() {
      this.$axios({
        url: "?service=Request.getInformationData",
        method: "post",
        data: {
          city: this.city,
          start: this.start,
          count: this.count,
        },
      }).then(({data}) => {
        // console.log(data)
        this.data = this.data.concat(data.data);
        this.start++;
        this.loading.close();
      });
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
    uploadInformationList() {
      this.loading = this.$Loading.service({
        text: "拼命加载中...",
        background: "rgba(255,255,255,.5)",
      });
      this.getInfoData();
    }
  },
  watch: {
    city(newVal, oldVal) {
      if (oldVal === "" || oldVal === null) {
        this.uploadInformationList()
      } else {
        this.data = [];
        this.start = 0;
        this.count = 8;
        this.getInfoData();
      }
    },
    UpLoad() {
      this.uploadInformationList()
    },
  },
};
</script>

<style lang="less" scoped>
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