<template>
  <view>
    <view class="x-s-c" style="height: 300rpx;">
      <view class=""><u--image :src="img" width="200rpx" height="300rpx" mode="scaleToFill" radius="5" :fade="false"></u--image></view>

      <view class="flex1 padding-lr-xs h-full y-b-s">
        <view class="w-full">
          <u--text mode="text" :text="title" bold></u--text>
          <u--text mode="text" :text="sdata" :size="12" color="#3C434D"></u--text>
        </view>

        <view class="w-full flex1 margin-tb-xs">
          <u--text mode="text" text="介绍:" :size="12" color="#3C434D"></u--text>
          <u--text mode="text" :text="description" :size="12" color="#3C434D"></u--text>
          <u--text mode="text" :text="remark" :size="12" color="#3C434D"></u--text>
        </view>

        <view class="w-full">
          <u--text mode="text" :text="'￥' + price" :size="14" bold color="#FE8C00"></u--text>
          <view class="x-b-c">
            <view class="">
              <u--text
                mode="text"
                :text="'收藏' + collectCnt + ' · 点赞' + likeCnt + ' · 打赏￥' + rewardTotal"
                :size="12"
                color="#BDC4CE"
              ></u--text>
            </view>
            <view class=""><u--text mode="text" :text="createDate" :size="12" color="#8D9299"></u--text></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'user-goods',
    props: {
      img: {
        require: true,
        default: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f034dbfa-a6f0-4bce-912d-5425bd5fbadf/d1888b99-0dbd-47dc-937f-c0717f366f62.jpg',
      },
      title: {
        require: true,
        default: '标题',
      },
      sdata: {
        require: false,
        default: '分类',
      },
      description: {
        require: true,
        default: '请输入描述',
      },
      remark: {
        require: false,
        default: '备注',
      },
      price: {
        require: true,
        default: 0,
      },
      collectCnt: {
        require: false,
        default: 0,
      },
      likeCnt: {
        require: false,
        default: 0,
      },
      rewardTotal: {
        require: false,
        default: 0,
      },
      createDate: {
        require: true,
        default: '2022.01.01',
      },
    },
    data() {
      return {};
    },
  };
</script>

<style lang="scss"></style>
