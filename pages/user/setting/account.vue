<template>
  <view class="container">
    <use-list-title
      title="手机号"
      iconfont=" "
      :tip="member.mobile ? member.mobile : ''"
      @goto="toUrl('/pages/uni-id-pages/userinfo/bind-mobile/bind-mobile')"
    ></use-list-title>
    <use-list-title title="修改密码" iconfont=" " @goto="toUrl('/pages/uni-id-pages/userinfo/change_pwd/change_pwd')"></use-list-title>
  </view>
</template>

<script>
const db = uniCloud.database()
const usersTable = db.collection('uni-id-users')
const uniIdCo = uniCloud.importObject('uni-id-co')
import { mapState, mapMutations } from 'vuex'
const _about = 'ggysgy-app-about'
export default {
  computed: {
    ...mapState(['member']),
  },
  data() {
    return {}
  },
  onLoad(options) {},
  onUnload() {},
  onShow() {},
  methods: {
    toUrl() {
      let arr = [].concat.apply([], arguments)
      this.$api.toUrl(...arr)
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
