<template>
  <div>
    <tab-bar>
      <!-- 动态封装了 点击的字体颜色 -->
      <tab-bar-itme path="/home" activeColor="#4CDE80">
        <img slot="item-icon" src="../../assets/images/tabbar/home.png" />
        <img slot="item-icon-active" src="../../assets/images/tabbar/home_active.png" />
        <div slot="item-text">旅游</div>
      </tab-bar-itme>
<!--      <tab-bar-itme path="/locat" activeColor="#4CDE80">-->
<!--        <img slot="item-icon" src="~assets/images/tabbar/guide.png" />-->
<!--        <img slot="item-icon-active" src="~assets/images/tabbar/guide_active.png" />-->
<!--        <div slot="item-text">定位</div>-->
<!--      </tab-bar-itme>-->
<!--      <tab-bar-itme path="/search" activeColor="#4CDE80">-->
<!--        <img slot="item-icon" src="~assets/images/tabbar/seek.png" />-->
<!--        <img slot="item-icon-active" src="~assets/images/tabbar/seek_active.png" />-->
<!--        <div slot="item-text">搜索</div>-->
<!--      </tab-bar-itme>-->
      <tab-bar-itme path="/profile" activeColor="#4CDE80">
        <img slot="item-icon" src="../../assets/images/tabbar/profile.png" />
        <img slot="item-icon-active" src="../../assets/images/tabbar/profile_active.png" />
        <div slot="item-text">我的</div>
      </tab-bar-itme>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "./TabBar";
import TabBarItme from "./TabBarItme";

export default {
  name: "MainTabbar",
  components: {
    TabBar,
    TabBarItme,
  },
};
</script>

<style>
</style>