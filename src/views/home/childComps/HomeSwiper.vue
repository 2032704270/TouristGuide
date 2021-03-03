<template>
  <div v-if="banners.length !== 0">
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <img v-if="item.info_covermap" :src="$root.URL + item.info_covermap" @click="openDetailsScreen(item)" @load="busEmit">
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import {Swiper, SwiperItem} from '../../../common/swiper'

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    openDetailsScreen(item) {
      // console.log(item)
      this.$router.push({
        path: '/details',
        query: {
          id: item.info_id
        }
      });
    },
    busEmit() {
      this.$bus.$emit("ItemImageLoad");
    },
  },
};
</script>
<style lang="less" scoped>

.swiper {
  img {
    width: 100%;
    height: 100%;
  }
}

</style>