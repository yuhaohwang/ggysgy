<template>
  <view class="container">
    <view class="dflex-c pos-r margin-bottom margin-top">
      <view class="portrait-box">
        <image class="border-radius-c" :src="member.avatar_file ? member.avatar_file.url : '/static/images/user/default.png'"></image>
      </view>
      <view class="margin-left-sm">
        <view>
          <text class="username">{{ member.nickname ? member.nickname : '艺心益盟' }}</text>
        </view>
        <!--        <view v-if="member.member_city">
          <text>{{ member.member_city }}</text>
        </view> -->
      </view>
    </view>

    <use-list-title title="昵称" iconfont=" " :tip="member.nickname" @goto="setNickname('')"></use-list-title>
    <uni-popup ref="dialog" type="dialog">
      <uni-popup-dialog
        mode="input"
        :value="member.nickname"
        @confirm="setNickname"
        title="设置昵称"
        placeholder="请输入要设置的昵称"
      ></uni-popup-dialog>
    </uni-popup>

    <use-list-title
      title="性别"
      iconfont=" "
      :tip="(member.member_gender == 0 ? '未知' : member.member_gender == 1 ? '男' : '女') || '未知'"
      @goto=""
    ></use-list-title>
  </view>
</template>

<script>
const db = uniCloud.database()
const usersTable = db.collection('uni-id-users')
const uniIdCo = uniCloud.importObject('uni-id-co')
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['islogin', 'member']),
  },
  data() {
    return {}
  },
  onShow() {
    if (!this.islogin) {
      this.$api.msg('账号未登录')
      return
    }
  },
  onLoad() {},
  methods: {
    ...mapMutations(['putMember']),
    setNickname(nickname) {
      console.log(nickname)
      if (nickname) {
        uni.showLoading({
          title: '请求中',
          mask: true,
        })
        usersTable
          .where('_id==$env.uid')
          .update({
            nickname,
          })
          .then(e => {
            uni.hideLoading()
            if (e.result.updated) {
              this.$api.msg('更新成功')
              let temp = this.member
              temp.nickname = nickname
              this.putMember(temp)
            } else {
              this.$api.msg('没有改变')
            }
          })
        this.$refs.dialog.close()
      } else {
        this.$refs.dialog.open()
      }
    },
  },
}
</script>

<style lang="scss">
page {
  background: $page-color-base;
}

image {
  width: 130rpx;
  height: 130rpx;
}

.use-item {
  position: relative;
  height: 100rpx;
  line-height: 100rpx;
  background: #fff;
}
</style>
