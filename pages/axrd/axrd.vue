<template>
  <view class="">
    <u-list @scrolltolower="scrolltolower">
      <u-list-item v-for="(item, index) in indexList" :key="index" enableFlex :scrollable="false">
        <view class="x-s-s padding-xs">
          <view class="padding-lr-xs item-c index">
            <u--text mode="text" :text="index + 1" align="center" bold color="#957B54"></u--text>
          </view>
          <u-avatar shape="circle" size="50" :src="item.url" customStyle=""></u-avatar>
          <view class="y-s-s padding-lr-sm">
            <u--text mode="name" text="吴晓军" format="encrypt"></u--text>
            <u--text mode="text" text="中山大学" :size="12" color="#BDC4CE"></u--text>
          </view>
        </view>
        <u-line></u-line>
      </u-list-item>
    </u-list>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        indexList: [],
        urls: [
          'https://cdn.uviewui.com/uview/album/1.jpg',
          'https://cdn.uviewui.com/uview/album/2.jpg',
          'https://cdn.uviewui.com/uview/album/3.jpg',
          'https://cdn.uviewui.com/uview/album/4.jpg',
          'https://cdn.uviewui.com/uview/album/5.jpg',
          'https://cdn.uviewui.com/uview/album/6.jpg',
          'https://cdn.uviewui.com/uview/album/7.jpg',
          'https://cdn.uviewui.com/uview/album/8.jpg',
          'https://cdn.uviewui.com/uview/album/9.jpg',
          'https://cdn.uviewui.com/uview/album/10.jpg',
        ],
      };
    },
    onLoad() {
      this.loadmore();
    },
    methods: {
      scrolltolower() {
        this.loadmore();
      },
      loadmore() {
        for (let i = 0; i < 30; i++) {
          this.indexList.push({
            url: this.urls[uni.$u.random(0, this.urls.length - 1)],
          });
        }
      },
    },
  };
</script>
<style lang="scss">
  .index {
    width: 80rpx;
  }
</style>
