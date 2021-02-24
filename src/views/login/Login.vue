<template>
  <div class="box">
    <mt-header title="账号登陆" class="headerNav">
      <router-link to="/profile" slot="left">
        <mt-button @click="handleClose">
          <i class="el-icon-arrow-left"></i>
        </mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <scroll class="contents" :probe-type="3" :pull-up-load="true">
      <div class="view_box">
        <!-- logo图 -->
        <div class="logo_box"></div>
        <el-card>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入账号"></el-input>
            </el-form-item>
            <div class="xxx"></div>
            <el-form-item prop="pass">
              <el-input v-model="ruleForm.pass" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
          </el-form>
          <span class="sssxxx" @click="register">没有账号密码？</span>
        </el-card>
        <el-button type="primary" round @click="submitForm">确定</el-button>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "../../common/scroll/Scroll";
export default {
  name: "Login",
  components: {
    Scroll,
  },
  data() {
    return {
      // form
      ruleForm: {
        name: "",
        pass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    
    };
  },
  methods: {
    handleClose() {
      // console.log(15215);
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
        this.$axios({
          url: "?service=User.userLogin",
          method: "post",
          data: this.ruleForm,
        }).then(({ data: { data } }) => {
          // console.log(data);
          if (data.code !== 0) return this.$Toast(data.msg);
          this.$store.commit("userData", {
            token: data.token,
            uName: data.uName,
          });
          this.$Toast(data.msg);
          this.$router.push("/profile/" + data.uName);
        });
      });
    },
    register() {
      this.$router.push('/register')
    },
  },
};
</script>
<style lang="less">
.box {
  background-color: #f7f7f7;
}
.el-form-item {
  margin: 5px;
}
.el-form-item__error {
  z-index: 10;
}
.el-input__inner {
  border: none;
}
.xxx {
  border-bottom: 1px solid #f2f2f2;
}
.el-button {
  margin-top: 25px;
  width: 95vw;
  border: none;
  background-color: #66b1ff;
}
.headerNav {
  height: 49px;
  background-color: #66b1ff;
}
.contents {
  height: calc(100vh - 45px);
  overflow: hidden;
}
.view_box {
  width: 100vw;
  height: 75vh;
  border-radius: 15px;
  padding: 0 10px;
  .logo_box {
    width: 100%;
    height: 230px;
    background: url(../../assets/logo.png) no-repeat center;
    background-size: 100% 100%;
  }
}
.sssxxx {
  font-size: 12px;
  color: red;
  position: absolute;
  right: 15px;
  padding: 1px 0;
  border-bottom: 1px solid red;
}
.el-dialog {
  padding: 0 10px;
  box-sizing: border-box;
  .el-button {
    width: 80px;
  }
}
</style>