<template>
  <view class="w-full">
    <!-- 01. 头部组件 -->
    <use-header :search-tip="searchTip" :search-auto="searchAuto" @search="search"></use-header>

    <!-- 02. 公益课视频 -->
    <view class="gyk-video" id="gyk-video" v-for="(item, index) in gykDatas" :key="index">
      <view class="container"
        ><video class="video" :src="item.url" :danmu-list="item.danmuList" enable-danmu danmu-btn controls></video
      ></view>
      <view class="dflex padding-xs u-border">
        <u--image :src="item.avatar" width="50rpx" height="50rpx" shape="circle"></u--image>
        <view class="title">{{ item.title }}</view>
      </view>
    </view>

    <!-- 上拉加载更多 -->
    <use-loadmore :type="loadmoreType"></use-loadmore>

    <!-- 置顶 -->
    <use-totop ref="usetop"></use-totop>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        gykDatas: [
          {
            title: '手绘',
            avatar: '/static/images/user/default.png',
            url: '/static/images/user/default.png',
            danmuList: [
              {
                text: '第 1s 出现的弹幕',
                color: '#ff0000',
                time: 1,
              },
              {
                text: '第 3s 出现的弹幕',
                color: '#ff00ff',
                time: 3,
              },
            ],
          },
          {
            title: '手绘',
            avatar: '/static/images/user/default.png',
            url: '/static/images/user/default.png',
            danmuList: [
              {
                text: '第 1s 出现的弹幕',
                color: '#ff0000',
                time: 1,
              },
              {
                text: '第 3s 出现的弹幕',
                color: '#ff00ff',
                time: 3,
              },
            ],
          },
          {
            title: '手绘',
            avatar: '/static/images/user/default.png',
            url: '/static/images/user/default.png',
            danmuList: [
              {
                text: '第 1s 出现的弹幕',
                color: '#ff0000',
                time: 1,
              },
              {
                text: '第 3s 出现的弹幕',
                color: '#ff00ff',
                time: 3,
              },
            ],
          },
          {
            title: '手绘',
            avatar: '/static/images/user/default.png',
            url: '/static/images/user/default.png',
            danmuList: [
              {
                text: '第 1s 出现的弹幕',
                color: '#ff0000',
                time: 1,
              },
              {
                text: '第 3s 出现的弹幕',
                color: '#ff00ff',
                time: 3,
              },
            ],
          },
        ],
      };
    },
    onReady: function (res) {
      // #ifndef MP-ALIPAY
      this.videoContext = uni.createVideoContext('gyk-video');
      // #endif
    },

    methods: {
      sendDanmu: function () {
        this.videoContext.sendDanmu({
          text: this.danmuValue,
          color: this.getRandomColor(),
        });
        this.danmuValue = '';
      },
      getRandomColor: function () {
        const rgb = [];
        for (let i = 0; i < 3; ++i) {
          let color = Math.floor(Math.random() * 256).toString(16);
          color = color.length == 1 ? '0' + color : color;
          rgb.push(color);
        }
        return '#' + rgb.join('');
      },
    },
    onPageScroll(e) {
      // 兼容iOS端下拉时顶部漂移
      if (e.scrollTop >= 0) {
        this.headerPosition = 'fixed';
      } else {
        this.headerPosition = 'absolute';
      }
      // this.scrollTop = e.scrollTop
      this.$refs.usetop.change(e.scrollTop);
    },
    //下拉刷新
    onPullDownRefresh() {
      this.loadData('refresh');
    },
  };
</script>

<style lang="scss">
  .gyk-video {
    .container {
      width: 750rpx;
      height: 420rpx;

      .video {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      margin-left: 10rpx;
    }
  }
</style>
