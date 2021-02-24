<template>
  <div class="comment">
    <input class="textInput" type="text" placeholder="我也来聊几句" v-model="comment"/>
    <el-button type="primary" size="mini" round @click="report()">发表</el-button>

    <!-- 评论按钮-->
    <div @click="commentFocus()">
      <el-badge :value="data.commentNumber" :max="999" class="item">
        <i class="el-icon-chat-dot-round"></i>
      </el-badge>
    </div>

    <!-- 收藏按钮-->
    <div @click="collectionInformation()">
      <i v-if="data.collection" class="el-icon-star-on" @click="collection = true"></i>
      <i v-else class="el-icon-star-off" @click="collection = false"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsComment",
  props: {
    data: {
      default() {
        return {
          commentNumber: 0,
          collection: false
        }
      }
    }
  },
  data() {
    return {
      collection: false,
      comment: "",
    }
  },
  methods: {
    commentFocus() {
      let comment = event.path[2]
      comment.previousElementSibling.previousElementSibling.focus()
    },
    /**
     * 收藏\取消收藏资料
     * */
    collectionInformation() {
      let id = Number(this.data.info_id);
      this.$axios({
        url: "?service=Update.updateCollection",
        method: "post",
        data: {
          id: id,
          value: this.collection
        },
      }).then(({data}) => {
        // console.log(data)
        if (data.data === 1) {
          this.data.collection = !this.data.collection;
        } else {
          this.$message({
            showClose: true,
            message: "操作失败，请先去登录",
            type: "error",
          });
        }
      });
    },
    report() {
      if (this.comment.length >= 4) {
        this.$axios({
          url: "?service=Add.addComment",
          method: "post",
          data: {
            info_id: this.data.info_id,
            value: this.comment
          },
        }).then(({data: {data}}) => {
          // console.log(data)
          if (data.code.constructor === Object) {
            this.comment = ""
            this.commentNumber++
            this.$message({
              message: data.msg,
              type: 'success'
            });
            this.$emit("reloadInfoData")
          }
        });
      } else {
        this.$message({
          message: "评论内容最少为四个字符",
          type: 'error'
        });
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  div {
    display: inline-block;

    i {
      font-size: 22px;
    }
  }
}

.textInput {
  width: 200px;
  height: 20px;
  border-radius: 15px;
  padding: 10px;
  font-size: 12px;
  display: inline-block;
  border: 2px solid rgba(0, 0, 0, .1);
}
</style>