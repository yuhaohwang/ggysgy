<template>
  <view class="y-s-c h-full">
    <top-tab class="w-full" :tabList="tabList" :current="tabCurrent" @tab-change="tabChange"></top-tab>
    <view class="flex1 w-full bg-main">
      <swiper style="height: 100%;" :duration="0" :current="current" @animationfinish="animationfinish">
        <swiper-item v-for="(type, index) in tabList" :key="index">
          <scroll-view class="wh-full" scroll-y @scrolltolower="onreachBottom" :enable-flex="true">
            <!-- <use-empty v-if="sdata.empty" e-style="round" tip="无商品数据"></use-empty> -->
            <!--            <block v-for="(item, index) in [1, 2, 3, 4]" :key="index"> -->
            <view class="padding-xs">
              <view @click="toGood({ _id: '1651133440341913010' })"><user-goods></user-goods></view>
              <view class="x-b-c">
                <view class="padding-xs"><u--text mode="text" text="更多" :size="12" color="#8D9299"></u--text></view>
                <view class="x-c-c" style="white-space: nowrap;">
                  <view class="padding-xs"><u-button size="mini" :hairline="true" shape="circle">下架</u-button></view>
                  <view class="padding-xs"><u-button size="mini" :hairline="true" shape="circle">编辑</u-button></view>
                </view>
              </view>
            </view>
            <!-- </block> -->
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        tabList: [
          {
            name: '全部',
          },
          {
            name: '待审核',
          },
          {
            name: '已上架',
          },
          {
            name: '已下架',
          },
          {
            name: '草稿',
          },
        ],

        current: 0,
        tabCurrent: 0,
      };
    },
    methods: {
      // 商品详情
      toGood(options) {
        console.log(options._id);
        this.$api.toGood({
          id: options._id,
        });
      },
      // tabs通知swiper切换
      tabChange(e) {
        const cidx = e.index;
        this.current = cidx;
      },
      // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
      // swiper滑动结束，分别设置tabs和swiper的状态
      animationfinish(e) {
        let current = e.detail.current;
        this.current = current;
        this.tabCurrent = current;
      },
    },
  };
</script>

<style lang="scss">
  page {
    height: 100%;
    background-color: #f5f5f5;
  }
</style>
