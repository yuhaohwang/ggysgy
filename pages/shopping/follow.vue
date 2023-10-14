<template>
  <view class="padding-sm">
    <view class="padding bg-main border-radius mb-sm" v-for="(item, idx) in [1, 1, 1, 1, 1, 1]" :key="idx">
      <view class="dflex-b">
        <view class="dflex">
          <image
            :src="$getOssFileByPath('/static/logo/logo.png')"
            class="border-radius-lg mr-sm headimg"
            style="width: 70rpx; height: 70rpx"
            mode="aspectFill"
          ></image>
          <view class="fwb">沙发上的猫</view>
        </view>
        <view class="border-radius-lg fs-xs" style="padding: 12rpx 34rpx; border: 1rpx solid #333">已关注</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        static: this.$staticPaths,
      };
    },
  };
</script>

<style lang="less">
  page {
    background-color: #f5f5f5;
  }
</style>
