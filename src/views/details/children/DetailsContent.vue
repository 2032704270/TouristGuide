<template>
  <div>
    <!-- 顶部图片-->
    <div class="top">
      <img :src="$root.URL + info.info_covermap" alt="图片加载中..." class="covermap" @load="busEmit">
      <div class="textRight">收录时间: {{ info.createTime }}</div>
      <div class="title">{{ info.info_title }}</div>
    </div>

    <!-- 资料内容-->
    <el-collapse v-model="activeNames" class="content">
      <el-collapse-item name="1">
        <template slot="title">
          行前须知 Travel_Guide <i class="header-icon el-icon-info"></i>
        </template>
        <div v-html="info.info_content" @load="busEmit"></div>
      </el-collapse-item>

      <!-- 资料内容结束-->
      <el-card shadow="always">
        <div class="textCenter">
            <span class="like" @click="evaluate(true)">
              <i v-if="info.evaluate === 1" :id="'likeYes'"></i>
              <i v-else></i>
              赞
            </span>
          <span class="belittle" @click="evaluate(false)">
              <i v-if="info.evaluate === 2" :id="'belittle'"></i>
              <i v-else></i>
              踩
            </span>
        </div>
        <div class="textCenter time">最后更新: {{ info.updateTime }}</div>
      </el-card>

      <div class="commentBox">
        <div v-for="(item, index) in comment" :key="index" class="comment">
          <div class="leftBox">
            <img :src="$root.URL + item.headIcon" alt="头像" @load="busEmit">
          </div>
          <div class="rightBox">
            <p class="username">
              {{ item.uName }}
              <span v-if="index === 0">沙发</span>
              <span v-else-if="index === 1">板凳</span>
              <span v-else-if="index === 2">地板</span>
              <span v-else># {{ index + 1 }}楼</span>
            </p>
            <p class="cTime">{{ item.cTime }}</p>
            <p class="cContent">{{ item.cContent }}</p>
          </div>
        </div>
      </div>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "DetailsContent",
  props: {
    info: {
      default() {
        return {
          info_title: '标题加载中...'
        }
      }
    }
  },
  data() {
    return {
      activeNames: ['1'],
      loading: false,
      comment: [],
    }
  },
  methods: {
    busEmit() {
      this.$bus.$emit('ItemImageLoad')
    },
    evaluate(is) {
      this.loading = this.$Loading.service({
        text: "拼命加载中...",
        background: "rgba(255,255,255,.5)",
      });
      let value = 0;
      if (is) {
        value = this.info.evaluate === 1 ? 0 : 1
      } else {
        value = this.info.evaluate === 2 ? 0 : 2
      }
      this.$axios({
        url: "?service=Update.updateEvaluate",
        method: 'post',
        data: {
          id: Number(this.info.info_id),
          value: value
        }
      }).then(({data: {data}}) => {
        // console.log(data)
        if (data.code) {
          this.info.evaluate = value
        } else {
          this.$message({
            showClose: true,
            message: "操作失败，请先去登录",
            type: "error",
          });
        }
        this.loading.close()
      })
    },
    getComment() {
      // console.log(this.info)
      this.$axios({
        url: "?service=Request.getCommentByInfoId",
        method: 'post',
        data: {
          info_id: this.info.info_id
        }
      }).then(({data}) => {
        // console.log(data)
        this.comment = data.data
      });
    }
  },
  watch: {
    info() {
      if (this.info.info_id !== null) {
        this.getComment()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  position: relative;
}

.covermap {
  width: 100%;
  height: 100%;
}

.textRight {
  font-size: 12px;
  text-align: right;
  color: #666666;
}

.title {
  position: absolute;
  left: 0;
  bottom: 16px;
  font-size: 18px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
  text-indent: 1em;
  z-index: 10;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.textCenter {
  font-size: 12px;
  color: #666666;
  text-align: center;
}

.time {
  margin-top: 20px;
}

.content {
  padding: 0 20px;
}

.like {
  margin: 0 30px;

  i {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-image: url("../../../assets/images/icon/like-no.png");
    background-size: 100% 100%;
  }
}

.belittle {
  margin: 0 30px;

  i {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-image: url("../../../assets/images/icon/belittle-no.png");
    background-size: 100% 100%;
  }
}

#likeYes {
  background-image: url("../../../assets/images/icon/like-yes.png");
}

#belittle {
  background-image: url("../../../assets/images/icon/belittle-yes.png");
}

.commentBox {
  margin: 20px 0;
}

.comment {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #000;
  margin: 10px 0;

  .leftBox {
    width: 10%;

    img {
      display: block;
      margin: 5px auto;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid rgba(0, 0, 0, .1);
    }
  }

  .rightBox {
    width: 80%;
    margin: 5px 0 15px 0;
    color: #000;

    .username {
      font-size: 14px;
      line-height: 20px;

      span {
        display: inline-block;
        float: right;
      }
    }

    .cTime {
      display: inline-block;
      font-size: 10px;
      color: #656363;
      line-height: 20px;
      margin-bottom: 5px;
    }

    .cContent {
      font-size: 16px;
      line-height: 28px;
    }
  }
}
</style>