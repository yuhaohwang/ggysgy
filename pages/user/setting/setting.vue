<template>
  <view class="container">
    <use-list-title title="个人资料" iconfont=" " @goto="toUrl('/pages/user/setting/personal')"></use-list-title>
    <use-list-title title="账号设置" iconfont=" " @goto="toUrl('/pages/user/setting/account')"></use-list-title>
    <use-list-title title="关于益盟" iconfont=" " @goto="toabout"></use-list-title>

    <!-- #ifdef MP-WEIXIN -->
    <view class="use-item">
      <button class="wh-full padding-lr no-border tal" open-type="feedback" @click="tofeedback">意见反馈</button>
    </view>
    <!-- #endif -->

    <use-list-title title="艺心益盟" iconfont=" " :tip="version"></use-list-title>
    <use-list-title title="注销账号" iconfont=" "></use-list-title>
    <view class="use-item margin-tb-sm log-out-btn tac" @click="tologout"><text>退出登录</text></view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
const _about = 'usemall-app-about'
export default {
  data() {
    return {
      version: '1.0.0',
      aboutData: {},
    }
  },
  onLoad(options) {
    this.$db[_about].tofirst().then(res => {
      if (res.code === 200) {
        this.aboutData = res.datas
        // console.log('this.aboutData', this.aboutData);
        return
      }
    })
  },
  onShow() {
    this.version = '版本 ' + this.$config.version
  },
  computed: {
    ...mapState(['member']),
  },
  methods: {
    ...mapMutations(['logout']),
    toUrl() {
      let arr = [].concat.apply([], arguments)
      this.$api.toUrl(...arr)
    },
    // 关于用云
    toabout() {
      if (this.aboutData.type == '网页') {
        uni.navigateTo({
          url: `/pages/content/web?url=${this.aboutData.url}`,
        })
      } else if (this.aboutData.type == '内容') {
        uni.setStorage({
          key: '__rich_text',
          data: this.aboutData.content,
          success() {
            uni.navigateTo({
              url: '/pages/content/rich-text',
            })
          },
        })
      }
    },
    tofeedback() {
      this.$api.msg('打开右上角-反馈功能')
    },
    // 退出登录
    tologout() {
      uni.showModal({
        content: '退出登录',
        success: e => {
          if (e.confirm) {
            this.$api.msg('退出成功')
            this.logout()

            this.$api.timerout(() => {
              this.$api.toHome()
            }, 200)
          }
        },
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
    font-size: 28rpx;
    line-height: 100rpx;
    background: #fff;
  }
}
</style>
