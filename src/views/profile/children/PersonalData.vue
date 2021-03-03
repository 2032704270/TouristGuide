<template>
  <div class="box">
    <mt-header title="个人资料" class="headerNav">
      <router-link to="/profile" slot="left">
        <mt-button @click="handleClose">
          <i class="el-icon-arrow-left"></i>
        </mt-button>
      </router-link>
    </mt-header>
    <!-- scroll -->
    <scroll class="content" :probe-type="3" :pull-up-load="true">
      <div class="cont_box">
        <el-card class="box_card">
          <div class="user_info">
            <div class="user_tx">
              <span>头像</span>
              <span>
                <img v-if="userData.headIcon" :src="$root.URL + userData.headIcon" />
              </span>
            </div>
            <div class="user_m">
              <span>用户名</span>
              <span>{{ userData.uName }}</span>
            </div>
            <div class="user_xb">
              <span>性别</span>
              <span v-if="userData.gender === 1">男</span>
              <span v-else>女</span>
            </div>
            <div class="user_sj">
              <span>绑定手机</span>
              <span>{{ userData.phone }}</span>
            </div>
            <div class="user_yx">
              <span>绑定邮箱</span>
              <span>{{ userData.uEmail }}</span>
            </div>
          </div>
        </el-card>
        <!-- 退出按钮 -->
        <el-button type="primary" round @click="signOut">退出登陆</el-button>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "../../../common/scroll/Scroll";
export default {
  name: "PersonalData",
  components: {
    Scroll,
  },
  data() {
    return {
      userData: {
        headIcon: null,
        uName: "加载中",
        gender: 1,
        phone: null,
        uEmail: null,
      },
    };
  },
  methods: {
    handleClose() {},
    signOut() {
      this.$store.dispatch("signOut");
      this.$router.push('/profile');
    },
    getUserData() {
      this.$axios({
        url: "?service=User.getUserData",
      }).then(({data: {data}}) => {
        // console.log(data)
        this.userData = data;
      });
    },
  },
  created() {
    this.getUserData();
  }
};
</script>
<style lang="less" scoped>
.box {
  height: calc(100vh - 40px);
  z-index: 100;
  position: relative;
  background-color: #f5f5f5;
  position: relative;
}
.headerNav {
  height: 49px;
}
.content {
  // height: calc(100vh - 49px);
  height: 100vh;
  overflow: hidden;
}
.cont_box {
  padding: 10px;
}
.box_card {
  box-shadow: 1px 1px 5px #ccc;
}
.user_info {
  span {
    font-size: 16px;
  }
  span:nth-of-type(2) {
    color: #000;
  }
  div {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
  }
  .user_tx {
    margin-top: -2px;
    span:nth-of-type(1) {
      line-height: 60px;
    }
    span {
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.el-button {
  width: 95vw;
  margin-top: 15px;
}
</style>