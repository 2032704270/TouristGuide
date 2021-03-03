<template>
  <div class="box_profile">
    <scroll class="content" :probe-type="3" :pull-up-load="true">
      <div class="box">
        <!-- top -->
        <div class="box_top" @click="clickLogin">
          <div class="login_box">
            <div v-if="!getToken" class="img_box">
              <img src="../../assets/logo.png"/>
            </div>
            <div v-else class="img_box_success">
              <img v-if="userData.headIcon" :src="$root.URL + userData.headIcon"/>
            </div>
            <div class="text_box">
              <span v-if="!getToken">
                登陆<span>/</span>注册
                <span>></span>
              </span>
              <span v-else>{{ userData.uName }}</span>
            </div>
          </div>
        </div>
        <!-- 卡片 -->
        <el-card class="box-card">
          <div class="box_item">
            <div @click="jumpData(1, userData.collection)">收藏({{ userData.collection.length }})</div>
            <span></span>
            <div @click="jumpData(2, userData.likes)">点赞({{ userData.likes.length }})</div>
            <span></span>
            <div @click="jumpData(3, [])">关注(0)</div>
            <span></span>
            <div @click="jumpData(4, userData.footmark)">足迹({{ userData.footmark.length }})</div>
          </div>
        </el-card>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "../../common/scroll/Scroll"
import {mapGetters} from "vuex";

export default {
  name: "Profile",
  components: {
    Scroll,
  },
  data() {
    return {
      userData: {
        collection: [],
        likes: [],
        footmark: [],
      },
    };
  },
  methods: {
    clickLogin() {
      if (!this.getToken) return this.$router.push("/login");
      this.$router.push('/personaldata')
    },
    getUserData() {
      this.$axios({
        url: "?service=User.getUserData",
      }).then(({data: {data}}) => {
        // console.log(data)
        if (data.length !== 0) {
          this.userData = data;
        }
      });
    },
    jumpData(key, data) {
      if (data.length <= 0) {
        this.$message({
          showClose: true,
          message: "列表为空",
          type: "error",
        });
        return;
      }
      switch (key) {
        case 1:
          this.$router.push({
            name: "personalcollection",
            params: {
              data: JSON.stringify(data)
            }
          })
          break;
        case 2:
          this.$router.push({
            name: "personallikes",
            params: {
              data: JSON.stringify(data)
            }
          })
          break;
        case 3:
          this.$message({
            showClose: true,
            message: "暂未开放该功能",
            type: "error",
          });
          break;
        case 4:
          this.$router.push({
            name: "personalfootmark",
            params: {
              data: JSON.stringify(data)
            }
          })
          break;
      }
    }
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  created() {
    this.getUserData();
  },
};
</script>
<style lang="less" scoped>
.box_profile {
  background-color: #f7f7f7;
}

.content {
  height: calc(100vh - 49px);
  overflow: hidden;
}

.box {
  position: relative;
}

.login_box {
  display: flex;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-60%);
}

.box_top {
  width: 100vw;
  height: 150px;
  position: relative;
  background: #66b1ff;
  border-bottom-left-radius: 8%;
  border-bottom-right-radius: 8%;

  .img_box {
    width: 70px;
    height: 70px;
    padding: 2px;
    border-radius: 50%;
    border: 2px solid #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .img_box_success {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .text_box {
    color: #fff;
    margin-left: 12px;
    line-height: 70px;

    span {
      font-weight: 400;
      font-size: 20px;

      span:nth-of-type(1) {
        font-size: 30px;
        font-weight: 100;
        margin: 0 2px;
        vertical-align: middle;
      }

      span:nth-of-type(2) {
        font-weight: 100;
        margin-left: 5px;
        opacity: 0.8;
      }
    }
  }
}

// 卡片
.box-card {
  width: 95vw;
  border-radius: 8px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: none;

  .box_item {
    display: flex;
    justify-content: space-between;

    div {
      text-align: center;
      color: #65a8e0;
    }

    span {
      display: inline-block;
      width: 1px;
      height: 15px;
      background-color: #ccc;
    }
  }
}
</style>