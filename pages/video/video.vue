<template>
  <view class="box-sizing-b bg-drak">
    <!-- 01. 头部组件 -->
    <view class="x-c-c bg-main padding-lr-xs">
      <view class="search flex1">
        <use-header :search-tip="searchTip" :search-auto="searchAuto" @search="search"></use-header>
      </view>
      <view class="padding-xs" @click="topage(categoryAll)">分类</view>
    </view>

    <!-- 02. 公益课视频 -->
    <view class="y-c-s gyk-video" id="gyk-video" v-for="(item, index) in gykDatas" :key="index">
      <view class="container"
        ><video class="video" :src="item.url" :danmu-list="item.danmuList" enable-danmu danmu-btn controls></video
      ></view>
      <view class="x-s-c padding-xs">
        <view class="u-border border-radius-lg">
          <u--image :src="item.avatar" width="50rpx" height="50rpx" :fade="false"></u--image>
        </view>
        <view class="padding-xs">{{ item.title }}</view>
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
        // 头部参数
        searchAuto: !0,
        searchTip: '请输入搜索关键字',

        // 分类入口
        categoryAll: {
          type: '页面',
          url: `/pages/category/category`,
        },

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
      // 搜索回调函数
      search() {
        console.log('home search');
      },
      // 跳转页面
      topage(item) {
        console.log('分类点击', item.url);
        if (item && item.type == '网页') {
          uni.navigateTo({
            url: `/pages/content/web?url=${item.url}`,
          });
        } else if (item && item.type == '页面') {
          uni.navigateTo({
            url: `${item.url}`,
          });
        } else if (item && item.type == '标签') {
          uni.switchTab({
            url: `${item.url}`,
          });
        } else {
          if (item.id)
            this.$api.togoods({
              id: item._id,
            });
        }
      },
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
  }
</style>
