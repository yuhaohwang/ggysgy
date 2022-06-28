<template>
  <view class="container">
    <use-list-title class="margin-tb-sm" title="个人资料" iconfont=" " @goto="toProfile"></use-list-title>
    <use-list-title class="margin-tb-sm" title="账号设置" iconfont=" " @goto="toAccount"></use-list-title>
    <use-list-title class="margin-tb-sm" v-if="aboutData && aboutData._id" title="关于益盟" iconfont=" " @goto="toabout"></use-list-title>

    <!-- #ifdef MP-ALIPAY -->
    <view class="use-item padding-left">
      <button class="no-border wh-full tal" open-type="feedback" @click="tofeedback">意见反馈</button>
    </view>
    <!-- #endif -->

    <!-- #ifndef MP-ALIPAY -->
    <view class="use-item"><button class="no-border wh-full tal" open-type="feedback" @click="tofeedback">意见反馈</button></view>
    <!-- #endif -->

    <use-list-title class="margin-tb-sm" title="艺心益盟" iconfont=" " :tip="version"></use-list-title>
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
    // 个人资料
    toProfile() {
      uni.navigateTo({
        url: '/pages/user/setting/personal',
      })
    },
    // 跳转账号
    toAccount(url) {
      uni.navigateTo({
        url: '/pages/user/setting/account',
      })
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
    // 切换账号
    tologin() {
      this.$api.tologin()
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
              this.$api.tohome()
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
    font-size: 15px;
    line-height: 100rpx;
    background: #fff;
  }
}
</style>
