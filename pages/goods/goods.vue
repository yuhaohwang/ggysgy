<template>
  <view class="fixed">
    <view class="y-s-c" style="width: 100vw; height: 100vh;">
      <view class="flex1 y-s-c p gradient-bg" style="overflow: hidden; border-radius: 40px 40px 0 0;">
        <view class="fixed x-c-c" style="left: 50rpx;">
          <image
            :src="$getOssFileByPath('/static/logo/logo.png')"
            class="border-radius-c headimg"
            style="width: 50rpx; height: 50rpx;"
          ></image>
          <view class="ml-xs">关注</view>
        </view>
        <view class="fixed" style="right: 50rpx;" @click="shareOpen">
          <view class="iconfont iconfenxiang pr-xs"></view>
        </view>

        <view class="x-c-c fs-lg font-board fwb">月光下的湖面</view>
        <view class="x-c-c fs">陈宇轩</view>
        <scroll-view class="flex1 y-c-c mt" scroll-y :scroll-top="top" style="min-height: 0rpx;" @scroll="setTotopStatus">
          <view class="w-full">
            <swiper class="w-full" style="height: 600rpx;" indicator-dots circular="true" duration="400">
              <swiper-item v-for="(item, index) in swiperDatas" :key="index">
                <view class="wh-full x-c-c">
                  <image
                    :src="item.url"
                    class="swiper-img border-radius"
                    style="height: 100%;"
                    lazy-load="true"
                    mode="heightFix"
                    @load="setContainerHeight"
                  ></image>
                </view>
              </swiper-item>
            </swiper>
          </view>

          <view class="x-c-c fs-lg">作品简介</view>
          <view class="x-c-c mt-xs plr-lg text-center">
            月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光
            月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光
            月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光
            月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光
            月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光
            月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光月亮渐渐升起，绝美的圆光
          </view>
        </scroll-view>
        <view>
          <view class="x-c-c fs mt">打赏名单</view>
          <view class="x-c-c">
            <view class="p-xs">
              <image
                :src="$getOssFileByPath('/static/logo/logo.png')"
                class="border-radius-c headimg"
                style="width: 50rpx; height: 50rpx;"
              ></image>
            </view>
            <view class="p-xs">
              <image
                :src="$getOssFileByPath('/static/logo/logo.png')"
                class="border-radius-c headimg"
                style="width: 50rpx; height: 50rpx;"
              ></image>
            </view>
            <view class="p-xs">
              <image
                :src="$getOssFileByPath('/static/logo/logo.png')"
                class="border-radius-c headimg"
                style="width: 50rpx; height: 50rpx;"
              ></image>
            </view>
            <view class="p-xs">
              <image
                :src="$getOssFileByPath('/static/logo/logo.png')"
                class="border-radius-c headimg"
                style="width: 50rpx; height: 50rpx;"
              ></image>
            </view>
            <view class="p-xs">
              <image
                :src="$getOssFileByPath('/static/tabbar/user.png')"
                class="border-radius-c headimg"
                style="width: 50rpx; height: 50rpx;"
              ></image>
            </view>
          </view>
        </view>
      </view>

      <!-- 07. 操作区 -->
      <view class="oper-area w-full x-b-c plr-lg">
        <view class="btn-area dflex dflex-flow-c" @click="toHome">
          <text class="iconfont iconshouye-1"></text>
          <text>打赏</text>
        </view>

        <view class="btn-area dflex dflex-flow-c" @click="tobuy(goods)">
          <text class="iconfont iconshouye-1"></text>
          <text>下单</text>
        </view>

        <view class="btn-area dflex dflex-flow-c" :class="{ active: favorite }" @click="tofavorite">
          <text class="iconfont" :class="favorite ? 'iconshoucang-' : 'iconshoucang-01'"></text>
          <text>点赞</text>
        </view>

        <view class="btn-area dflex dflex-flow-c" @click="tofavorite">
          <text class="iconfont iconshouye-1"></text>
          <text>收藏</text>
        </view>
      </view>
    </view>

    <!-- 分享 -->
    <use-popup mode="bottom" bgclass=" " v-model="shareShow">
      <view class="share-area m border-radius bg-main">
        <view class="tac w-full p-sm">分享</view>
        <view class="plr mb-xl dflex-b pos-r">
          <!-- #ifdef MP-WEIXIN -->
          <button class="dflex-c dflex-flow-c no-border btn" style="color: #07c160;" open-type="share">
            <view class="iconfont iconweixin plr-sm border-radius-c fs-xxxl"></view>
            <view class="dflex-c fs-sm ft-dark">微信好友</view>
          </button>
          <view class="vertical-line"></view>
          <!-- #endif -->
          <button class="dflex-c dflex-flow-c no-border btn ft-base" @click="createPoster">
            <view class="iconfont iconhaibao1 plr-sm border-radius-c fs-xxxl"></view>
            <view class="dflex-c fs-sm ft-dark">生成海报</view>
          </button>
        </view>
      </view>
    </use-popup>

    <!-- 海报二维码 -->
    <view class="qrcode tac ptb pos-f pos-tl-c">
      <use-qrcode
        :onval="true"
        :val="posterQRcode"
        :show="false"
        loading-text="生成海报中"
        qrsize="200"
        @result="posterQRcodeResult"
      ></use-qrcode>
    </view>

    <!-- 海报 -->
    <block v-if="posterShow">
      <l-painter
        custom-style="position: fixed; left: -100vw;"
        :board="posterData"
        isCanvasToTempFilePath
        @success="posterSuccess"
        @fail="fail = $event"
        @progress="log = $event"
      />
    </block>

    <use-popup mode="bottom" bgclass=" " v-model="posterShow">
      <view class="p border-radius m">
        <view v-if="!posterUrl" class="tac bg-main p border-radius pos-a pos-l-c" style="bottom: 45vh;">海报生成中，请稍等</view>

        <view class="w-full" style="height: 70vh;">
          <image :src="posterUrl" class="wh-full" mode="aspectFit"></image>
        </view>

        <view class="p w-full mt">
          <view class="dflex-b border-radius-big">
            <!-- #ifdef MP -->
            <view class="tac ptb-sm flex1 bg-base" @click="posterSave">保存到相册</view>
            <!-- #endif -->
            <!-- #ifdef H5 || MP-360 -->
            <view class="tac ptb-sm flex1 bg-base">长按图片保存到相册</view>
            <!-- #endif -->
          </view>
        </view>
      </view>
    </use-popup>

    <!-- 置顶 -->
    <use-totop ref="usetop" bottom="120" @toTop="toTop"></use-totop>
  </view>
</template>

<script>
  import uposter from '@/common/poster.js';

  import { mapState } from 'vuex';
  import { nextTick } from 'vue';

  export default {
    computed: {
      ...mapState(['islogin', 'member']),
    },
    data() {
      return {
        fail: '',
        log: '',
        // 作品ID
        id: 0,
        // 分享ID
        mid: 0,
        // 作品数据
        goods: {},
        // 轮播图
        swiperDatas: [],
        // SKU
        sku: {},
        skuDatas: [],
        // 分享
        shareShow: false,
        // 海报
        posterQRcode: '',
        posterUrl: '',
        posterShow: false,
        posterData: {},
        //优惠券
        couponShow: false,
        couponDatas: [],
        // 服务标签
        tagShow: false,
        tagDatas: [],
        // 作品评价
        evaluateDatas: [],
        evaluateTitle: '评价',
        // 作品详情
        html_nodes: '',
        // 收藏
        favorite: false,

        imageHeight: 0,

        top: 0,
      };
    },
    watch: {
      sku(e) {
        this.goods.price = e.price;
        this.goods.market_price = e.market_price;
        this.goods.stock_num = e.num;
      },
    },
    onShareAppMessage: function (ops) {
      let _this = this;
      let mid = 0;
      if (_this.member && _this.member._id) {
        mid = _this.member._id;
      }

      return {
        title: _this.goods.share_title,
        path: `/pages/goods/goods?id=${this.id}&mid=${mid}`, //这里设定都是以"/page"开头,并拼接好传递的参数
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
    onLoad(options) {
      console.log('onload opts', options);
      if (options) {
        this.mid = options.mid || '';
        if (options.id) {
          this.id = options.id;
        } else if (options.q) {
          let query = decodeURIComponent(options.q) || decodeURIComponent(uni.getStorageInfoSync('__scene_query_q'));
          this.resolveQueryq(query);
        }
      }

      if (!this.id) {
        this.$api.msg('作品ID无效');
        return;
      }
    },
    onShow(options) {
      if (!this.id) {
        const query = decodeURIComponent(uni.getStorageInfoSync('__scene_query_q'));
        this.resolveQueryq(query);
      }

      this.loadData();
    },
    methods: {
      setTotopStatus(e) {
        const top = e.detail.scrollTop;
        this.top = top;
        this.$refs.usetop.change(top);
      },

      toTop(e) {
        this.$nextTick(function () {
          this.top = 0;
        });
      },

      setContainerHeight(e) {
        console.log(e);
        this.imageHeight = e.detail.height;

        var query = uni.createSelectorQuery().in(this);
        query.select('.swiper-img').boundingClientRect();
        query.exec(res => {
          console.log(res);
        });
      },

      async loadData() {
        await this.$func.ggysgy
          .call('goods/detail', {
            goods_id: this.id,
            share_mid: this.mid,
          })
          .then(res => {
            if (res.code === 200) {
              // 作品评价
              this.evaluateDatas = res.datas.evaluate;
              if (res.datas.evaluate_cnt) this.evaluateTitle = `评价(${res.datas.evaluate_cnt})`;

              if (typeof res.datas.goods.imgs === 'string') {
                this.swiperDatas = res.datas.goods.imgs.split(',').filter(x => x);
              } else {
                this.swiperDatas = res.datas.goods.imgs;
              }
              this.goods = res.datas.goods;
              // 作品详情
              let __goods_detail = res.datas.goods_detail;
              // #ifndef MP-ALIPAY
              this.html_nodes = __goods_detail.desc_mobile;
              // #endif

              // #ifdef MP-ALIPAY
              this.html_nodes = [];
              aliParse(__goods_detail.desc_mobile.replace(/"><*/gi, '"/><'), (err, nodes) => {
                if (!err) {
                  this.html_nodes = nodes;
                }
              });
              // #endif

              // 作品SKU
              let __goods_skus = res.datas.goods_skus;
              if (__goods_skus.length > 0) {
                let __skuDatas = [];
                __goods_skus.forEach((sku, index) => {
                  // 	{ id: 1, name: '45寸（大规格）', price: 788, market_price: 999, num: 0, selected: !0 },
                  __skuDatas.push({
                    id: sku._id,
                    sku: sku.goods_sku,
                    name: sku.spec,
                    price: sku.price,
                    market_price: sku.market_price || this.goods.market_price,
                    num: sku.stock_num,
                    selected: index == 0,
                  });
                });
                this.skuDatas = __skuDatas;
              }

              // SKU
              if (this.skuDatas.length > 0) {
                this.sku = this.skuDatas[0];
              }

              // 服务标签
              if (typeof this.goods.tags === 'string') {
                this.goods.tags = this.goods.tags.split(',').filter(x => x);
              }

              let __tagDatas = [];

              this.goods.tags.forEach((data, index) => {
                __tagDatas.push({
                  name: data,
                  selected: index == 0,
                });
              });

              this.tagDatas = __tagDatas;

              // 收藏状态
              this.favorite = this.goods.collected === 1;
              return;
            }
            this.$api.msg(res.msg);
          });
      },
      // 处理 query q 数据
      resolveQueryq(query) {
        const arr = query.split('/').slice(-1)[0].split('_');
        if (arr.length == 2) this.mid = arr[1];
        this.id = arr[0];
      },
      // 图片预览
      preview(imgs, cur) {
        if (!imgs) return;

        uni.previewImage({
          urls: imgs,
          current: cur,
          longPressActions: {
            itemList: ['发送给朋友', '保存图片', '收藏'],
            success: function (data) {
              console.log(res);
            },
            fail: function (err) {
              console.log(err);
            },
          },
        });
      },

      // 打开分享
      shareOpen() {
        if (!this.loginCheck()) return;

        this.shareShow = true;
      },
      // 创建海报
      createPoster() {
        if (this.posterUrl) {
          this.posterShow = true;
          console.log(JSON.stringify(this.posterUrl));
          return;
        }
        uni.showLoading({
          title: '生成海报中',
        });

        // #ifdef MP
        // 此处的二维码内容，需自己在小程序端配置普通二维码规则
        this.posterQRcode = `https://ggysgy.use-cloud.com/wxmp-product/${this.goods._id}_${this.member._id}`;
        // #endif

        // #ifdef H5
        // 如果为 h5，二维码内容需配置为线上版本产品详情路径
        this.posterQRcode = `https://ggysgy-h5.use-cloud.com/#/pages/goods/goods?id=${this.goods._id}&mid=${this.member._id}`;
        // #endif
      },
      // 海报二维码生成成功
      posterQRcodeResult(res) {
        // 获取产品海报数据
        this.posterData = uposter.getGoodsData(this.member, this.goods, res);
        // 渲染
        this.posterShow = true;
      },
      // 海报生成完成
      posterSuccess(res) {
        this.posterUrl = res;
        console.log(res);
        uni.hideLoading();
      },
      // 保存海报
      posterSave() {
        if (this.posterUrl) {
          uni.showLoading({
            title: '保存中',
          });

          uni.saveImageToPhotosAlbum({
            filePath: this.posterUrl,
            success: function () {
              uni.hideLoading();

              uni.showToast({
                title: '海报保存成功',
                icon: 'success',
                duration: 2000,
              });
            },
            fali: function (e) {
              uni.hideLoading();
              console.log(e);

              uni.showToast({
                title: '海报保存失败',
                icon: 'fail',
                duration: 2000,
              });
            },
          });
        }
      },

      // 作品SKU
      selectSKU(res) {
        this.skuDatas.forEach(item => {
          if (res.sku == item.sku) {
            this.$set(item, 'selected', true);
          } else {
            this.$set(item, 'selected', false);
          }
        });

        this.sku = res;
      },

      // 评论
      toevaluate() {
        uni.navigateTo({
          url: `/pages/goods/goods-evaluate?id=${this.id}`,
        });
      },
      // 首页
      toHome() {
        this.$api.toHome();
      },
      // 收藏
      tofavorite() {
        if (!this.loginCheck()) return;

        this.favorite = !this.favorite;
        let _data = {
          goods_id: this.id,
          state: !this.favorite ? '已取消' : '已收藏',
        };
        this.$func.ggysgy.call('member/collect', _data).then(res => {
          if (res.datas) {
            !this.favorite ? this.$api.msg('取消成功') : this.$api.msg('收藏成功');
            return;
          }

          this.$api.msg(res.msg);
        });
      },
      // 加入购物车
      tocart(params) {
        if (!this.loginCheck()) return;

        this.$func.ggysgy
          .call('goods/addcart', {
            goods_id: params._id,
            goods_num: 1,
            goods_sku: this.sku.id,
          })
          .then(res => {
            if (res.code === 200) {
              this.$api.msg(res.datas.msg);
              return;
            }

            this.$api.msg(res.msg);
          });
      },
      // 立即购买
      tobuy(item) {
        let _this = this;
        if (!this.loginCheck()) return;

        uni.navigateTo({
          url: `/pages/order/create?goods_id=${this.id}&sku_id=${this.sku.id || ''}`,
        });
      },
      // 检测是否已登录
      loginCheck() {
        if (!this.islogin) {
          let _this = this;
          uni.showModal({
            title: '授权登录',
            success: function (res) {
              if (res.confirm) {
                _this.$api.toLogin();
              }
            },
          });
          return false;
        }

        return true;
      },
    },
  };
</script>

<style lang="scss">
  .gradient-bg {
    background: linear-gradient(250deg, #ffcbc8, #f5f5db);
  }

  swiper ::v-deep .uni-swiper-dots {
    margin-bottom: 10px;
  }

  /* 07. 操作区 */
  .oper-area {
    bottom: 0;
    left: 0;
    z-index: 95;
    height: 100rpx;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20rpx 0 #f0f0f0;

    .btn-area {
      width: 96rpx;
      font-size: $font-sm;
      color: $font-color-base;

      .iconfont {
        font-size: 40rpx;
        line-height: 48rpx;
      }
    }
  }
</style>
