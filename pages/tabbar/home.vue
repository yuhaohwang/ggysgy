<template>
  <view class="box-sizing-b bg-dark">
    <!-- 01. 头部组件 -->
    <view class="x-c-c bg-main padding-lr-sm">
      <view class="search flex1"><use-header :search-tip="searchTip" :search-auto="searchAuto" @search="search"></use-header></view>
      <view class="margin-left-xs" @click="topage(categoryAll)">分类</view>
    </view>

    <!-- 02. 轮播区 -->
    <view class="swiper-area pos-r" v-if="swiperDatas && swiperDatas.length > 0">
      <!-- 轮播组件 -->
      <swiper class="swiper w-full" autoplay indicator-dots indicator-color="#f7f7f7" indicator-active-color="#FEAA30">
        <block v-for="(item, index) in swiperDatas" :key="index">
          <swiper-item class="swiper-item padding-sm wh-full box-sizing-b">
            <view class="wh-full" @click.stop="topage(item)">
              <image class="border-radius wh-full" mode="scaleToFill" :lazy-load="true" :src="item.img" />
            </view>
          </swiper-item>
        </block>
      </swiper>
    </view>

    <!-- 03. 图文分类 -->
    <view class="x-a-c x-5 padding-xs bg-main" v-if="graphicCategoryDatas && graphicCategoryDatas.length > 0">
      <block v-for="(item, index) in graphicCategoryDatas" :key="index">
        <view class="y-c-c padding-xs category-item" @click="topage(item)">
          <image :lazy-load="true" :src="item.img" mode="widthFix"></image>
          <view>{{ item.name }}</view>
        </view>
      </block>
    </view>

    <!-- 03. 卡片分类 -->
    <view class="x-s-c-w x-3 padding-xs bg-main" v-if="cardCategoryDatas && cardCategoryDatas.length > 0">
      <block v-for="(item, index) in cardCategoryDatas" :key="index">
        <view class="y-c-c padding-xs category-item" @click="topage(item)">
          <image :lazy-load="true" :src="item.img" mode="widthFix"></image>
        </view>
      </block>
    </view>

    <!-- 04. 限时精选 -->
    <view class="margin-top-sm">
      <use-list-title title="限时出售" size="32" fwt="600" color="#333" iconfont="icondaishouhuo-" @goto="limit"></use-list-title>
    </view>
    <view class="padding-sm limit-area bg-main">
      <scroll-view scroll-x>
        <view class="dflex padding-bottom">
          <view class="item margin-right-sm" v-for="(item, index) in goodsLimitDatas" :key="index" @click="toGood(item)">
            <image class="border-radius-xs" mode="aspectFill" :lazy-load="true" :src="item.img"></image>
            <text class="title clamp padding-bottom-xs">{{ item.name }}</text>
            <text class="price">{{ item.price ? item.price / 100 : '面议' }}</text>
            <text class="m-price">{{ item.market_price / 100 }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 05. 热门推荐 -->
    <view class="margin-top-sm"><use-hot-goods :datas="goodsHotDatas" autoload="none" title="热门作品"></use-hot-goods></view>

    <!-- 置顶 -->
    <use-totop ref="usetop" :style="{ marginBottom: navHeight + 'px' }"></use-totop>

    <!-- #ifdef MP-WEIXIN -->
    <official-account @bindload="wxOAccountLoad" @binderror="wxOAccountErr"></official-account>
    <!-- #endif -->
  </view>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['member']),
    },
    data() {
      return {
        env: {},

        // 头部参数
        searchAuto: !0,
        searchTip: '请输入搜索关键字',

        // 分类入口
        categoryAll: {
          type: '页面',
          url: `/pages/category/category`,
        },

        // 轮播区
        swiperDatas: [],
        // 图片分类
        graphicCategoryDatas: [],
        cardCategoryDatas: [],
        // 限时精选
        goodsLimitDatas: [],
        // 热门推荐
        goodsHotDatas: [],

        scrollTop: 0,
        navHeight: 0,
      };
    },
    // 监听页面加载
    onLoad() {
      this.$api.get_env(res => {
        this.env = res;
        this.is_mp = this.env.is_mp;
        this.platform = this.env.platform;
        this.platform_icon = this.env.platform_icon;
        this.platform_name = this.env.platform_name;
      });
    },
    mounted() {
      // #ifdef H5 || MP-360
      this.navHeight = 50;
      // #endif
    },
    // 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {
      this.loadData();
    },
    onPageScroll(e) {
      // this.scrollTop = e.scrollTop
      this.$refs.usetop.change(e.scrollTop);
    },
    // 监听用户下拉刷新
    onPullDownRefresh() {
      this.loadData(() => {
        uni.stopPullDownRefresh();
      });
    },
    // 用户点击右上角分享
    // https://uniapp.dcloud.io/api/plugins/share?id=showsharemenu
    onShareAppMessage: function (ops) {
      let _this = this,
        mid = 0;

      if (_this.member && _this.member._id) {
        mid = _this.member._id;
      }

      return {
        title: '艺心益盟',
        path: `/pages/tabbar/home?mid=${mid}`,
        // imageUrl: 'https://mall-os-api.use-cloud.com/files/upload/image/20200408/200408115587860242.jpg',
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
      // 加载数据
      async loadData(callback) {
        await this.$func.ggysgy
          .call('app/mp/home', {
            rows: 8,
          })
          .then(res => {
            if (res.code === 200) {
              // 轮播图
              this.swiperDatas = res.datas.carousel || [];
              // 图文分类导航
              this.graphicCategoryDatas = res.datas.graphicCategory || [];
              // 卡片分类导航
              this.cardCategoryDatas = res.datas.cardCategory || [];
              // 限时精选
              this.goodsLimitDatas = res.datas.limited || [];
              // 热门推荐
              this.goodsHotDatas = res.datas.hot || [];

              if (typeof callback === 'function') {
                // 数据加载完成回调函数
                callback();
              }

              // #ifdef H5 || MP-360
              // if (this.goodsLimitDatas.length > 0) {
              // 	this.$api.dom('.uni-scroll-view-content').children[0].style.width = (uni
              // 		.upx2px(260) * this.goodsLimitDatas.length) + 'px';
              // 	new this.$iscroll('.uni-scroll-view-content', {
              // 		scrollX: true,
              // 		click: true
              // 	});
              // }
              // #endif
            }
          });
      },
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
            this.$api.toGood({
              id: item._id,
            });
        }
      },
      // 限时精选 -> 商品详情
      toGood(item) {
        // 跳转商品详情
        this.$api.toGood({
          id: item._id,
        });
      },
      // 限时精选
      limit() {
        // 跳转商品列表 - 限时精选类目
        this.$api.toGoodList({
          limited: 1,
        });
      },
    },
  };
</script>

<style lang="scss">
  /* 轮播图区 */
  .swiper-area {
    // padding: ;
    background-color: #feaa30;

    .swiper {
      height: 240rpx;
    }
  }

  /* 分类区 */
  .category-item {
    font-size: $font-sm + 2upx;
    color: $font-color-dark;

    image {
      width: 100%;
    }
  }

  /* 限时精选区 */
  .limit-area {
    min-height: 240rpx;

    .item {
      width: 240rpx;

      image {
        width: 240rpx;
        height: 240rpx;
      }
    }
  }
</style>
