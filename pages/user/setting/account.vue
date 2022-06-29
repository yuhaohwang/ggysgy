<template>
  <view class="container"><use-list-title title="手机号" iconfont=" " tip="13192727680" @goto="to"></use-list-title></view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
const _about = 'usemall-app-about'
export default {
  data() {
    return {}
  },
  onLoad(options) {},
  onShow() {},
  methods: {
    // 个人资料
    to() {
      uni.navigateTo({
        url: '/pages/user/setting/personal',
      })
    },
  },
}
</script>

<style lang="scss">
page {
  background: $page-color-base;
}

.use-item {
  height: 100rpx;
  line-height: 100rpx;
  background: #fff;

  switch {
    transform: translateX(16rpx) scale(0.84);
  }

  button {
    font-size: 15px;
    line-height: 100rpx;
    background: #fff;
  }
}
</style>
