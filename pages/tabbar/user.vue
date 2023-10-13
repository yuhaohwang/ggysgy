<template>
  <view class="">
    <view class="header-area padding-lr-sm" :class="is_mp && !is_alipay ? 'padding-top-big' : 'padding-top'">
      <view class="dflex-b">
        <view class="member-area padding-top-sm margin-bottom dflex pos-r" @click="to('/pages/user/setting/personal')">
          <view>
            <image
              class="headimg border-radius-c"
              :src="member.avatar_file ? member.avatar_file.url : $getOssFileByPath('/static/logo/logo.png')"
            ></image>
          </view>
          <view class="margin-left-sm">
            <view class="info-box">
              <text class="fs-lg">{{ member.nickname ? member.nickname : '艺心益盟' }}</text>
            </view>
          </view>
          <view v-if="islogin && is_mp" class="padding" @click.stop="updateMember">
            <view :class="{ rotate: isreq }" class="animated iconfont">&#xe6ff;</view>
          </view>
        </view>
      </view>

      <!-- 03. 分类区1 -->
      <view class="x-c-c x-5 padding-xs bg-main border-radius" v-if="categoryDatas && categoryDatas.length > 0">
        <view class="y-c-c padding-xs category-item" v-for="(item, index) in categoryDatas" :key="index" @click="to(item.url)">
          <image :lazy-load="true" :src="item.img" mode="widthFix"></image>
          <view>{{ item.name }}</view>
        </view>
      </view>
    </view>

    <!-- 我的订单 -->
    <view class="container-area padding-lr-sm padding-bottom-sm">
      <view class="border-radius margin-top-sm bg-main">
        <use-list-title
          title="我的订单"
          iconfont="icondingdan"
          color="#feaa30"
          fwt="600"
          tip="查看全部订单"
          @goto="toOrder('/pages/user/order/order', '全部')"
        ></use-list-title>

        <view class="order-area padding-bottom-sm padding-lr dflex-c">
          <view class="item dflex dflex-flow-c" @click="toOrder('/pages/user/order/order', '待付款')">
            <view class="iconfont">
              &#xe6da;
              <view class="badge badge-small" v-if="stats && stats.order_state && stats.order_state['待付款'] > 0">
                {{ stats.order_state['待付款'] }}
              </view>
            </view>
            <text>待付款</text>
          </view>
          <view class="item dflex dflex-flow-c" @click="toOrder('/pages/user/order/order', '待发货')">
            <view class="iconfont">
              &#xe6d9;
              <view class="badge badge-small" v-if="stats && stats.order_state && stats.order_state['待发货'] > 0">
                {{ stats.order_state['待发货'] }}
              </view>
            </view>
            <text>待发货</text>
          </view>
          <view class="item dflex dflex-flow-c" @click="toOrder('/pages/user/order/order', '待收货')">
            <view class="iconfont">
              &#xe6d7;
              <view class="badge badge-small" v-if="stats && stats.order_state && stats.order_state['待收货'] > 0">
                {{ stats.order_state['待收货'] }}
              </view>
            </view>
            <text>待收货</text>
          </view>
          <view class="item dflex dflex-flow-c" @click="toOrder('/pages/user/order/order', '待评价')">
            <view class="iconfont">
              &#xe6db;
              <view class="badge badge-small" v-if="stats && stats.order_state && stats.order_state['待评价'] > 0">
                {{ stats.order_state['待评价'] }}
              </view>
            </view>
            <text>待评价</text>
          </view>
          <view class="item dflex dflex-flow-c" @click="toOrder('/pages/user/order/order', '售后中')">
            <view class="iconfont">
              &#xe715;
              <view class="badge badge-small" v-if="stats && stats.order_state && stats.order_state['售后中'] > 0">
                {{ stats.order_state['售后中'] }}
              </view>
            </view>
            <text>售后/退款</text>
          </view>
        </view>
      </view>

      <view class="border-radius margin-top-sm bg-main">
        <!-- 我的足迹 -->
        <use-list-title
          title="我的足迹"
          iconfont="iconzuji"
          color="#ffab6c"
          fwt="600"
          :tip="stats.browsing"
          @goto="to('/pages/user/browsing/browsing')"
        ></use-list-title>
        <scroll-view scroll-x class="browsing-area padding-lr">
          <view class="dflex">
            <view v-for="(item, index) in historyDatas" :key="index">
              <image class="border-radius-sm margin-right-sm" @click="toGood(item)" :src="item.img" mode="aspectFill"></image>
            </view>
          </view>
        </scroll-view>

        <use-list-title
          title="我的收藏"
          iconfont="iconshoucang-"
          color="#feaa30"
          fwt="600"
          :tip="stats.collect"
          @goto="to('/pages/user/collect/collect')"
        ></use-list-title>
        <use-list-title
          title="收货人"
          iconfont="icondizhi-"
          color="#5a9ded"
          fwt="600"
          @goto="to('/pages/user/address/address')"
        ></use-list-title>
        <use-list-title
          title="设置"
          iconfont="iconshezhi-"
          color="#58bc8a"
          fwt="600"
          @goto="to('/pages/user/setting/setting')"
        ></use-list-title>
      </view>

      <view v-if="islogin" class="border-radius margin-top-sm padding-sm dflex-c bg-main log-out-btn" @click="openActionSheet">
        <text class="cell-tit">退出登录</text>
      </view>
      <view v-else class="border-radius margin-top-sm padding-sm dflex-c bg-main log-out-btn" @click="to('/pages/login/login')">
        <text class="cell-tit">去登录</text>
      </view>

      <!-- 操作菜单 -->
      <use-action-sheet
        v-model="actionSheetShow"
        :list="actionSheetList"
        :tips="actionSheetTips"
        @click="actionSheetClick"
        @close="actionSheetClose"
      ></use-action-sheet>
    </view>

    <!-- 以艺自强版权 -->
    <use-copyright></use-copyright>
  </view>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import { Static } from 'vue';
  const _history = 'ggysgy-goods-history';
  export default {
    computed: {
      ...mapState(['islogin', 'member']),
    },
    data() {
      return {
        // 金刚区分类
        categoryDatas: [
          {
            _id: '6083a669ff01b00001bb591e',
            cid: 0,
            create_time: 1619240553775,
            create_uid: '607e63e021576100016eded3',
            img: this.$getOssFileByPath('/static/user-category/wfbd.png'),
            is_delete: 0,
            name: '我发布的',
            remark: '',
            sort: 1,
            state: '启用',
            type: '页面',
            url: '/pages/user/goods/wfbd/wfbd',
            version: 1,
          },
          {
            _id: '6083a6f6ff01b00001bb5a26',
            cid: '',
            create_time: 1619240694262,
            create_uid: '607e63e021576100016eded3',
            img: this.$getOssFileByPath('/static/user-category/wmcd.png'),
            is_delete: 0,
            name: '我卖出的',
            remark: '',
            sort: 2,
            state: '启用',
            type: '页面',
            url: '/pages/user/goods/wmcd/wmcd',
            version: 1,
          },
          {
            _id: '6083a8fcff01b00001bb5e22',
            cid: null,
            create_time: 1619241212782,
            create_uid: '607e63e021576100016eded3',
            img: this.$getOssFileByPath('/static/user-category/wmdd.png'),
            is_delete: 0,
            name: '我买到的',
            remark: '',
            sort: 3,
            state: '启用',
            type: '页面',
            url: '/pages/user/goods/wmdd/wmdd',
            version: 1,
          },
        ],
        isreq: false,
        // 浏览历史
        historyDatas: {},
        // 统计数据
        stats: {},

        actionSheetShow: false,
        actionSheetList: [],
        actionSheetTips: {
          text: '',
          color: '#9a9a9a',
          size: 24,
        },

        is_mp: false,
        is_alipay: false,
      };
    },
    onLoad() {
      this.$nextTick(() => {
        this.is_mp = this.$env.is_mp;
        this.is_alipay = this.$env.platform == 'alipay';
      });

      console.log(this.static);
    },
    onShow() {
      let _this = this;
      if (!this.islogin) {
        this.$api.msg('账号未登录');
        return;
      }
      this.loadData();
    },
    onPullDownRefresh() {
      if (this.islogin) {
        this.$api.getUserInfo();
      }
    },
    methods: {
      ...mapMutations(['logout', 'putMember']),
      // 加载数据
      loadData() {
        this.$func.ggysgy.call('member/data').then(res => {
          if (res.code == 200) {
            this.putMember(res.datas.member);
            console.log('member/data', res);

            this.stats = res.datas.stats;
            this.stats.order_state = {};
            this.stats.order.forEach(_order => {
              this.stats.order_state[_order._id] = _order.num;
            });
          }
        });

        // 浏览历史
        this.$db['ggysgy-goods-history, ggysgy-goods']
          .collection()
          .where('create_uid == $env.uid')
          .field('visit_cnt, last_modify_time, goods._id as goods_id, goods.img as goods_img, goods.state as goods_state')
          .orderBy('last_modify_time desc')
          .get()
          .then(res => {
            if (res && res.result && res.result.code === 0) {
              let _historyDatas = [];
              res.result.data.forEach(x => {
                x._id = x.goods_id[0];
                x.img = x.goods_img[0];
                x.state = x.goods_state[0];
                _historyDatas.push(x);
              });
              this.historyDatas = _historyDatas;
            }
          });
      },

      // 打开操作菜单
      openActionSheet() {
        this.actionSheetShow = true;

        this.$api.timerout(() => {
          this.actionSheetList = [
            {
              text: '退出登录',
              color: '#333',
            },
            {
              text: '切换账号',
              color: '#333',
            },
          ];
        }, 0);
      },
      // 关闭操作菜单
      actionSheetClose() {
        console.log(this.actionSheetShow);
      },
      // 点击操作菜单
      actionSheetClick(index) {
        switch (index) {
          case 0:
            this.$api.msg('退出成功');
            this.logout();
            this.$api.timerout(() => {
              this.$api.toHome();
            }, 200);
            break;
          case 1:
            this.$api.toLogin();
            break;
        }
      },

      updateMember() {
        if (this.isreq) return;
        this.isreq = true;
        let _this = this;

        uni.getUserProfile({
          desc: '更新会员信息',
          lang: 'zh_CN',
          success(res) {
            _this.$func.ggysgy
              .call('member/update', {
                nickname: res.userInfo.nickName,
                gender: res.userInfo.gender,
                avatar: res.userInfo.avatarUrl,
                comment: [res.userInfo.country, res.userInfo.province, res.userInfo.city].filter(x => x).join('-'),
              })
              .then(res => {
                _this.isreq = false;

                if (res.code == 200) {
                  _this.loadData();
                  return;
                }

                _this.$api.msg(res.msg);
              });
          },
          fail(err) {
            console.log(err);
            _this.isreq = false;
          },
        });
      },

      // 统一跳转接口，拦截未登录路由
      to(url) {
        if (!this.islogin) {
          this.$api.toLogin();
          return;
        }

        uni.navigateTo({
          url,
        });
      },
      // 跳转到 订单
      toOrder(url, state) {
        if (!this.islogin) {
          this.$api.toLogin();
          return;
        }

        uni.setStorage({
          key: '__order_state',
          data: state,
          success(res) {
            console.log(res);
          },
          complete() {
            uni.navigateTo({
              url,
            });
          },
        });
      },

      // 跳转作品详情
      toGood(item) {
        this.$api.toGood({
          id: item._id,
        });
      },
    },
  };
</script>
<style lang="scss">
  page {
    min-height: 100%;
    background: $page-color-base;
  }

  .member-area {
    image {
      width: 130rpx;
      height: 130rpx;
      border: 5rpx solid #fff;
    }
  }

  /* 分类区1 */
  .category-item {
    margin: auto;

    // padding: 6rpx;
    font-size: $font-sm + 2upx;
    color: $font-color-dark;

    image {
      width: 60%;
    }
  }

  .vip-card-area {
    color: #f7d680;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
  }

  .stats-area {
    .item {
      padding: 30rpx 0;
    }

    .num {
      margin-bottom: 6rpx;
      font-size: $font-lg;
      color: $font-color-dark;
    }
  }

  .order-area {
    .item {
    }

    .iconfont {
      position: relative;
      font-size: $font-lg + 8upx;

      .badge {
        right: initial;
      }
    }
  }

  .stats-area .item,
  .order-area .item {
    position: relative;
    font-size: $font-sm;
    color: $font-color-base;
    flex: 1;
  }

  .browsing-area {
    image {
      width: 160rpx;
      height: 160rpx;
    }
  }

  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }

  .log-out-btn {
    color: $font-color-base;
  }
</style>
