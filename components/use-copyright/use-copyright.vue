<template>
  <view>
    <!-- #ifndef MP-TOUTIAO -->
    <!-- 版权 -->
    <view class="x-c-c padding use-copyright" @click="to">
      <view class="iconfont iconxiangqing animated rotate margin-right-sm ft-base"></view>
      <view class="ft-dark">艺心益盟</view>
      <text class="margin-lr-xs">·</text>
      <text>公益</text>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
  export default {
    props: {},
    data() {
      return {}
    },
    methods: {
      to() {
        this.$emit('to', {
          type: 'to',
        })
      },
    },
  }
</script>

<style lang="scss">
  .use-copyright {
    text {
      color: #c0c0c0;
    }
  }
</style>
