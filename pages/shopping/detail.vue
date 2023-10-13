<template>
  <view>
    <!-- 01. 轮播区 -->
    <view class="swiper-area w-full pos-f">
      <swiper class="h-full pos-r" indicator-dots circular="true" duration="400">
        <swiper-item>
          <view class="wh-full">
            <image
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f034dbfa-a6f0-4bce-912d-5425bd5fbadf/d1888b99-0dbd-47dc-937f-c0717f366f62.jpg"
              class="wh-full loaded"
              lazy-load="true"
              mode="aspectFill"
            ></image>
          </view>
        </swiper-item>
        <swiper-item>
          <view class="wh-full">
            <image
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f034dbfa-a6f0-4bce-912d-5425bd5fbadf/d1888b99-0dbd-47dc-937f-c0717f366f62.jpg"
              class="wh-full loaded"
              lazy-load="true"
              mode="aspectFill"
            ></image>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view
      class="pos-f dflex-c border-radius-c"
      style="top: 30rpx; right: 30rpx; width: 80rpx; height: 80rpx; background: #333; opacity: 0.6"
      @click="toShare"
    >
      <view class="iconfont iconfenxiang ft-white fs-xl"></view>
    </view>

    <!-- 02. 作品数据区 -->
    <view class="goods-area bg-main padding">
      <view class="dflex-b margin-tb-sm">
        <view class="dflex">
          <image
            :src="$getOssFileByPath('/static/logo/logo.png')"
            class="headimg border-radius-c"
            style="width: 70rpx; height: 70rpx"
          ></image>
          <view class="margin-left-xs fs-xxs">Usecloud</view>
        </view>
        <view class="bg-dark border-radius-lg padding-lr fs-xs dflex-c" @click="toFollow">
          <text class="iconfont iconaixin-01 ft-base" v-if="follow"></text>
          <text class="iconfont iconaixin" v-else></text>
          <text class="padding-tb-16" style="margin-left: 6rpx">关注</text>
        </view>
      </view>

      <text class="title fwb clamp-2 fs margin-bottom-xs">油画</text>
      <view class=""></view>
    </view>
    <!-- 07. 操作区 -->
    <view class="oper-area pos-f dflex-b w-full padding-lr-lg">
      <view class="dflex">
        <view class="btn-area dflex-c" :class="{ active: favorite }">
          <text class="iconfont iconaixin"></text>
          <text>758</text>
        </view>
        <view class="btn-area dflex-c" :class="{ active: favorite }">
          <text class="iconfont iconshoucang-01" :class="favorite ? 'iconshoucang-' : 'iconshoucang-01'"></text>
          <text>60</text>
        </view>
        <view class="btn-area dflex-c">
          <text class="iconfont iconkefu-01"></text>
          <text>95</text>
        </view>
      </view>
      <view class="btn-container border-radius-big">
        <view class="tac padding-tb-sm flex1 bg-base" style="padding: 16rpx 50rpx" @click="toBuy(goods)">购买同款</view>
      </view>
    </view>
    <!-- 置顶 -->
    <use-totop ref="usetop" bottom="120"></use-totop>
  </view>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState(['islogin', 'member']),
    },
    data() {
      return {
        id: '',
        follow: true,

        static: this.$staticPaths,
      };
    },
    onShareAppMessage: function (ops) {
      let _this = this;
      let mid = 0;
      if (_this.member && _this.member._id) {
        mid = _this.member._id;
      }

      return {
        title: '艺心益盟 · 传播艺术之美',
        path: `/pages/shopping/detail?id=${this.id}&mid=${mid}`, //这里设定都是以"/page"开头,并拼接好传递的参数
        success: function (res) {
          // 转发成功
          console.log('转发成功', res);
        },
        fail: function (res) {
          // 转发失败
          console.log('转发失败', res);
        },
      };
    },
    methods: {
      // 立即购买
      toBuy(item) {
        this.$api.msg('购买');
      },
      toFollow() {
        this.follow = !this.follow;
        if (this.follow) {
          this.$api.msg('已关注');
        } else {
          this.$api.msg('取消关注');
        }
      },
      toShare() {
        this.$api.msg('分享');
      },
    },
  };
</script>

<style lang="scss">
  page {
    padding-bottom: 120rpx;
    background: #fff;
  }

  /* 01. 轮播区 */
  .swiper-area {
    top: 0;
    z-index: -1;
    height: 66vh;
  }

  /* #ifndef MP */
  .swiper-area {
    margin-top: calc(44px + env(safe-area-inset-top));
  }

  /* #endif */

  /* 02. 作品数据区 */
  .goods-area {
    height: 100vh;
    margin-top: 66vh;

    .price-box {
      display: flex;
      align-items: baseline;
    }

    .title {
      height: 46rpx;
      line-height: 46rpx;
      color: $font-color-dark;
    }
  }

  /* 07. 操作区 */
  .oper-area {
    bottom: 0;
    left: 0;
    z-index: 95;
    height: 100rpx;
    background: rgba(245, 245, 245, 0.95);
    box-shadow: 0 0 20rpx 0 #f0f0f0;

    .btn-area {
      width: 96rpx;
      margin-right: 30rpx;
      color: #000;
      text-align: center;

      .iconfont {
        margin-right: 6rpx;
        font-size: 40rpx;
        line-height: 48rpx;
      }
    }
  }
</style>
