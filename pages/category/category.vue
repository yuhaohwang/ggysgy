<template>
  <view class="box-sizing-b">
    <!-- 01. 头部组件 -->
    <view class="x-c-c bg-main padding-lr-sm">
      <view class="search flex1"><use-header :search-tip="searchTip" :search-auto="searchAuto" @search="search"></use-header></view>
    </view>

    <!-- 分类 -->
    <view class="category x-c-s h-full">
      <!-- 左侧一级分类 -->
      <view class="h-full left">
        <scroll-view scroll-y class="h-full">
          <view v-for="item in fdatas" :key="item._id" class="item dflex-c" :class="{ active: item._id === cid }" @click="fSelect(item)">
            {{ item.name }}
          </view>
        </scroll-view>
      </view>

      <!-- 右侧 1二级分类 2作品列表 -->
      <scroll-view
        class="h-full right"
        scroll-with-animation
        scroll-y
        :scroll-top="top"
        :style="{ height: scrollHeight }"
        @scroll="onScroll"
      >
        <!-- 右侧二级分类 -->
        <view v-if="mode == 1" class="">
          <view class="dflex-s dflex-wrap-w bg-main">
            <block v-for="item in sdatas" :key="item._id">
              <view class="item padding-bottom-sm dflex dflex-flow-c" v-if="item.pid == cid" @click="toGoodList(item)">
                <image :lazy-load="true" :src="item.img || $getOssFileByPath('/static/logo/logo.png')"></image>
                <text class="tac clamp margin-top-sm">{{ item.name }}</text>
              </view>
            </block>
          </view>
        </view>

        <!-- 右侧分类对应作品列表 -->
        <view v-if="mode == 2" class="">
          <!-- 空白页 -->
          <use-empty v-if="empty" e-style="round" tip="无作品数据"></use-empty>

          <view v-else class="x-s-s-w x-2 padding-lr-xs">
            <view class="y-s-c padding-xs" v-for="(item, index) in goodsDatas" :key="index" @click="toGood(item)">
              <view class="w-full border-radius-sm bg-main">
                <view class="" style="height: 300rpx">
                  <image :src="item.img" :lazy-load="true" mode="aspectFill" style="width: 100%; height: 100%"></image>
                </view>
                <view class="x-b-c padding-lr-xs fs-xs">
                  <view class="clamp">{{ item.name }}</view>
                  <view class="">￥{{ item.price ? item.price / 100 : '面议' }}</view>
                </view>
                <!--               <view class="x-b-c padding-lr-xs fs-xs">
                  <view class=""><image src="" mode=""></image></view>
                  <view class="clamp">陈宇轩</view>
                  <view class="clamp">广州美术学院</view>
                </view> -->
              </view>
            </view>
          </view>

          <!-- 上拉加载更多 -->
          <use-loadmore v-if="!empty && hasmore" :type="loadmoreType"></use-loadmore>
          <!-- 置顶 -->
          <use-totop ref="usetop" bottom="150" :style="{ marginBottom: navHeight + 'px' }" @to="totop"></use-totop>
        </view>
      </scroll-view>
    </view>

    <!-- 切换模式 1二级分类 2作品列表 -->
    <view class="fixed-top" :style="{ marginBottom: navHeight + 'px' }" @click="changeMode">
      <text class="iconfont iconpailie" v-if="mode == 1"></text>
      <text class="iconfont iconpailie02" v-if="mode == 2"></text>
    </view>
  </view>
</template>

<script>
  const _goods = 'ggysgy-goods';
  const _goodscategory = 'ggysgy-goods-category';
  export default {
    data() {
      return {
        // 1分类列表 2作品列表
        mode: 2,
        // 兼容支付宝 height 显示 bug
        scrollHeight: '100%',

        // 头部参数
        headerPlaceholder: 0,
        headerFixed: !0,
        searchAuto: !0,
        searchTip: '请输入搜索关键字',

        // 当前选中分类ID
        cid: 0,
        // 一级数据
        fdatas: [],
        // 二级数据
        sdatas: [],

        // 作品列表
        goodsDatas: [],
        empty: false,
        hasmore: 0,
        loadmoreType: 'nomore',
        // 作品请求数据
        reqdata: {
          rows: 20,
          page: 1,
        },

        top: 0,
        scrollTop: 0,
        navHeight: 0,
      };
    },
    watch: {
      goodsDatas(e) {
        // 监听数据，呈现空白页
        let empty = e.length === 0;
        if (this.empty !== empty) {
          this.empty = empty;
        }
      },
    },
    onPageScroll(e) {
      //this.scrollTop = e.scrollTop;
      this.$refs.usetop.change(e.scrollTop);
    },
    onLoad() {
      // #ifdef MP-ALIPAY
      this.scrollHeight = this.$env.windowHeight - this.$env.sis.titleBarHeight + 'px';
      // #endif

      // 获取存储的模式
      this.mode = uni.getStorageSync('category.mode') || 2;

      this.loadData(() => {
        if (this.mode == 2) {
          // 加载作品数据
          this.loadGoodsDatas();
        }
      });
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.loadData(() => {
        uni.stopPullDownRefresh();
      });
    },
    methods: {
      async loadData(callback) {
        this.$db[_goodscategory]
          .where(`'state'=='启用'`)
          .tolist({
            rows: 500,
            page: 1,
          })
          .then(res => {
            if (res.code === 200) {
              this.fdatas = [];
              this.sdatas = [];

              res.datas.forEach(item => {
                if (!item.pid) {
                  // pid为父级id, 不存在 pid || pid=0 为一级分类
                  this.fdatas.push(item);
                } else {
                  // 二级分类
                  this.sdatas.push(item);
                }
              });

              if (this.fdatas.length > 0) {
                this.cid = this.fdatas[0]._id;
              }

              if (typeof callback === 'function') {
                // 数据加载完成回调函数
                callback();
              }
            }
          });
      },
      // 加载作品数据
      loadGoodsDatas() {
        if (this.mode != 2) {
          return;
        }
        // 根据当前 cid 加载作品数据列表
        this.reqdata.cid = this.cid;
        this.$db[_goods]
          .where(`'${this.reqdata.cid}' in cids`)
          .tolist(this.reqdata)
          .then(res => {
            if (res.code === 200) {
              this.goodsDatas = res.datas;
              if (this.goodsDatas.length >= this.reqdata.rows) {
                if (this.reqdata.page == 1) this.hasmore = !0;
              }
              this.empty = this.goodsDatas.length === 0;
            }
          });
      },
      totop(e) {
        this.top = e.scrollTop;
        this.$nextTick(function () {
          this.top = 0;
        });
      },
      // 一级分类
      fSelect(item) {
        this.cid = item._id;
        this.loadGoodsDatas();
      },
      // 切换模式 1分类模式 2作品模式
      changeMode() {
        this.mode = this.mode == 1 ? 2 : 1;
        uni.setStorage({
          key: 'category.mode',
          data: this.mode,
        });

        this.loadGoodsDatas();
      },
      // 跳转作品详情
      toGood(item) {
        this.$api.toGood({
          id: item._id,
        });
      },
      // 跳转作品列表
      toGoodList(item) {
        this.$api.toGoodList({
          cid: item._id,
        });
      },
    },
    mounted() {
      // #ifdef H5 || MP-360
      this.navHeight = 50;
      // #endif
    },
  };
</script>

<style lang="scss">
  page {
    height: 100%;
    background-color: $page-color-base;
  }

  .category {
    overflow: hidden;

    .left {
      width: 200rpx;
      background-color: $page-color-base;

      .item {
        position: relative;
        height: 100rpx;
        color: $font-color-base;

        &.active {
          color: $uni-color-primary;
          background: #fff;

          &::before {
            position: absolute;
            top: 50%;
            left: 0;
            width: 8rpx;
            height: 36rpx;
            background-color: $uni-color-primary;
            content: '';
            opacity: 0.8;
            transform: translateY(-50%);
          }
        }
      }
    }

    .right {
      display: block;
      overflow: hidden;
      flex: 1;

      .item {
        flex-shrink: 0;
        width: 33.33%;
        font-size: $font-sm + 2upx;
        color: #666;

        image {
          width: 130rpx;
          height: 130rpx;
        }
      }
    }
  }

  .goods {
    display: flex;

    .goods-left {
      image {
        width: 120rpx;
        height: 120rpx;
      }
    }

    .price-box {
      bottom: 0;
    }
  }
</style>
