<template>
  <view class="">
    <top-tab :tabList="tabList" @tabClick="tabClick"></top-tab>

    <view class="padding-xs" @click="togoods({ _id: '1651133440341913010' })">
      <view class="x-s-c">
        <view class="">
          <u--image
            src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f034dbfa-a6f0-4bce-912d-5425bd5fbadf/d1888b99-0dbd-47dc-937f-c0717f366f62.jpg"
            width="200rpx"
            height="300rpx"
            mode="scaleToFill"
            radius="5"
            :fade="false"
          ></u--image>
        </view>

        <view class="flex1 padding-xs">
          <u--text mode="text" text="毕设：海" bold></u--text>
          <u--text mode="text" text="油画创作" :size="12" color="#3C434D"></u--text>

          <view class="margin-tb-xs">
            <u--text mode="text" text="介绍" :size="12" color="#3C434D"></u--text>
            <u--text mode="text" text="一副板绘插画" :size="12" color="#3C434D"></u--text>
            <u--text mode="text" text="学生毕设" :size="12" color="#3C434D"></u--text>
          </view>

          <u--text mode="text" text="￥215" :size="14" bold color="#FE8C00"></u--text>
          <view class="x-b-c">
            <view class=""><u--text mode="text" text="收藏100 · 点赞2000 · 打赏￥155" :size="12" color="#BDC4CE"></u--text></view>
            <view class=""><u--text mode="text" text="2021.12.13" :size="12" color="#8D9299"></u--text></view>
          </view>
        </view>
      </view>
      <view class="x-b-c">
        <view class="padding-xs"><u--text mode="text" text="更多" :size="12" color="#8D9299"></u--text></view>
        <view class="x-c-c" style="white-space: nowrap">
          <view class="padding-xs"><u-button size="mini" :hairline="true" shape="circle">下架</u-button></view>
          <view class="padding-xs"><u-button size="mini" :hairline="true" shape="circle">编辑</u-button></view>
        </view>
      </view>
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
      }
    },
    methods: {
      tabClick(e) {
        console.log(e)
      },
      // 商品详情
      togoods(options) {
        console.log(options._id)
        this.$api.togoods({
          id: options._id,
        })
      },
    },
  }
</script>

<style lang="scss">
  // .title {
  //   text-align: left;
  // }
</style>
