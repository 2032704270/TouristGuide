<template>
  <div>
    <!-- nav -->
    <mt-header title="注册页面" class="headerNav">
      <router-link to="/login" slot="left">
        <i class="el-icon-arrow-left"></i>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="da_box">
      <el-card class="box_card">
        <mt-field label="用户名" placeholder="填写注册的账号" v-model="forData.user"></mt-field>
        <mt-field label="密码" placeholder="填写注册的密码" type="password" v-model="forData.pass"></mt-field>
        <mt-field label="邮箱" placeholder="填写注册的邮箱" type="email" v-model="forData.email"></mt-field>
        <mt-field label="手机号" placeholder="填写注册的手机号" type="tel" v-model="forData.phone"></mt-field>
        <mt-radio
          align="right"
          title="性别"
          v-model="forData.gender"
          :options="options">
        </mt-radio>
        <el-button class="register" @click="addUser" type="primary" round>注册</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      forData: {
        user: "",
        pass: "",
        email: "",
        phone: "",
        gender: "",
      },
      options: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        }
      ]
    };
  },
  methods: {
    addUser() {
      if (this.forData.user.length < 3 || this.forData.user.length > 20) {
        this.$message({
          showClose: true,
          message: "账号长度不允许少于3或大于20个字符",
          type: "error",
        });
        return;
      } else if (this.forData.pass.length < 6 || this.forData.pass.length > 20) {
        this.$message({
          showClose: true,
          message: "密码长度不允许少于6或大于20个字符",
          type: "error",
        });
        return;
      } else if (!this.MailboxVerification()) {
        this.$message({
          showClose: true,
          message: "邮箱格式不正确",
          type: "error",
        });
        return;
      } else if (!this.phoneVerification()) {
        this.$message({
          showClose: true,
          message: "手机号格式不正确",
          type: "error",
        });
        return;
      } else if (this.forData.gender < 1 && this.forData.gender > 2) {
        this.$message({
          showClose: true,
          message: "性别格式不正确",
          type: "error",
        });
        return;
      }
      this.$axios({
        url: '?service=Add.UserRegister',
        method: 'post',
        data: this.forData
      }).then(({data})=>{
        console.log(data)
        if (data.meta.status === 200) {
          this.$message({
            showClose: true,
            message: data.data.msg,
            type: "success",
          });
          this.$router.push("/login");
        } else {
          this.$message({
            showClose: true,
            message: data.meta.msg,
            type: "error",
          });
        }
      })
    },
    MailboxVerification() {
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      return reg.test(this.forData.email);
    },
    phoneVerification() {
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      return reg.test(this.forData.phone);
    }
  }
};
</script>
<style lang="less" scoped>
.headerNav {
  height: 49px;
}
.box_card {
  margin-top: 15px;
}
.da_box {
  padding: 0 15px;
}
.register {
  display: block;
  width: 100px;
  margin: 10px auto 0;
}
</style>