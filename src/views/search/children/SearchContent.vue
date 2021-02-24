<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>猜你想找</span>
      </div>
      <div v-for="(item,index) in HotData" :key="index" class="text item" @click="jumpDetails(item.info_id)">
        {{ item.info_title }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SearchContent",
  data() {
    return {
      HotData: [],
    }
  },
  methods: {
    getHotData() {
      let city = JSON.parse(sessionStorage.getItem("city"));
      let province = city.province_id !== null ? city.province_id : 0;
      this.$axios({
        url: "?service=Request.getHotInfoData",
        method: "post",
        data: {
          province: province,
        }
      }).then(({data: {data}}) => {
        // console.log(data)
        this.HotData = data;
      })
    },
    jumpDetails(info_id) {
      this.$router.push({
        path: "/details",
        query: {
          id: info_id,
        },
      });
    }
  },
  created() {
    this.getHotData();
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

</style>