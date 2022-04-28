<template>
  <view class="bg-dark" :class="[empty ? '' : 'padding-tb']">
    <!-- 空白页 -->
    <use-empty v-if="empty" e-style="round" tip="无物流数据"></use-empty>

    <view v-if="expressData && expressData.data" class="padding-lr">
      <view class="border-radius padding margin-bottom-sm bg-main">
        <view class="fs-lg fwb">{{ expressData.company }}</view>
        <view>运单号：{{ expressData.nu }}<text class="copy" @click="copy">复制</text></view>
      </view>
    </view>
    <view v-if="expressData && expressData.data" class="padding-lr">
      <view class="product border-radius padding margin-bottom-sm bg-main" style="padding-bottom: 15rpx;">
        <view
          :class="{ active: index == 0, fwb: index == 0 }"
          class="dflex item pos-r"
          v-for="(item, index) in expressData.data"
          :key="index"
        >
          <view :class="{ active: index == 0 }" class="circle"></view>
          <view :class="{ 'ft-dark': index > 0 }" class="margin-left-lg pos-r w-full margin-bottom">
            <view>{{ item.context }}</view>
            <view class="margin-top-xs fs-xs">{{ item.time }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 置顶 -->
    <use-totop ref="usetop"></use-totop>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        empty: false,
        order_id: '',
        expressData: {},
      };
    },
    watch: {
      expressData(e) {
        let empty = !(e && e.data);
        if (this.empty !== empty) {
          this.empty = empty;
        }
      },
    },
    onPageScroll(e) {
      //this.scrollTop = e.scrollTop;
      this.$refs.usetop.change(e.scrollTop);
    },
    onLoad(options) {
      this.order_id = options.order_id;

      if (!this.order_id) {
        this.$api.msg('订单号不存在');
      }

      this.loadData();
    },
    onShow() {},
    methods: {
      loadData() {
        this.$func.usemall.call('order/express', { order_id: this.order_id }).then((res) => {
          if (res.code == 200) {
            this.expressData = res.datas;
          }
        });
      },
      // 点击复制
      copy() {
        uni.setClipboardData({
          data: this.expressData.nu,
          success: function (res) {
            uni.getClipboardData({
              success: function (res) {
                uni.showToast({
                  title: '复制成功',
                });
              },
            });
          },
        });
      },
    },
  };
</script>

<style>
  .copy {
    padding: 10rpx 40rpx;
    margin-left: 30rpx;
    font-size: 24rpx;
    background-color: #f1f1f1;
    border-radius: 40rpx;
  }

  .item {
    align-items: baseline;
  }

  .item:not(:last-child)::before {
    position: absolute;
    top: 14rpx;
    bottom: -14rpx;
    left: 10rpx;
    border-left: 1px solid #d3d3d3;
    border-left-color: rgb(211 211 211);
    border-left-style: solid;
    border-left-width: 1px;
    content: " ";
  }

  .item.active::before {
    border-left: 1px solid #feaa30;
  }

  .circle {
    position: absolute;
    top: 14rpx;
    width: 20rpx;
    height: 20rpx;
    background: #d3d3d3;
    border-radius: 50%;
  }

  .circle.active {
    background: #feaa30 !important;
    transform: scale(1.1);
  }

  .circle.active::after {
    position: absolute;
    width: 20rpx;
    height: 20rpx;
    background: rgba(255, 106, 108, 0.5) !important;
    border-radius: 50%;
    content: " ";
    -webkit-transform: scale(1.6);
    transform: scale(1.6);
  }
</style>
