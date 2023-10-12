<template>
  <uni-popup ref="popup" type="bottom">
    <view class="box">
      <text class="headBox">绑定资料</text>
      <text class="tip">将一键获取你的手机号码绑定你的个人资料</text>
      <view class="btnBox">
        <text @click="closeMe" class="close">关闭</text>
        <button class="agree uni-btn" type="primary" open-type="getPhoneNumber" @getphonenumber="bindMobileByMpWeixin">获取</button>
      </view>
    </view>
  </uni-popup>
</template>

<script>
  const db = uniCloud.database();
  const usersTable = db.collection('uni-id-users');
  const uniIdCo = uniCloud.importObject('uni-id-co');
  export default {
    emits: ['success'],
    computed: {},
    data() {
      return {};
    },
    methods: {
      async beforeGetphonenumber() {
        return await new Promise((resolve, reject) => {
          uni.showLoading({ mask: true });
          wx.checkSession({
            success() {
              console.log('session_key 未过期');
              resolve();
              uni.hideLoading();
            },
            fail() {
              console.log('session_key 已经失效，正在执行更新');
              wx.login({
                success({ code }) {
                  uniCloud
                    .importObject('uni-id-co', {
                      customUI: true,
                    })
                    .loginByWeixin({ code })
                    .then(e => {
                      console.log(e);
                      resolve();
                    })
                    .catch(e => {
                      console.log(e);
                      reject();
                    })
                    .finally(e => {
                      console.log(e);
                      uni.hideLoading();
                    });
                },
                fail: err => {
                  console.error(err);
                  reject();
                },
              });
            },
          });
        });
      },
      async bindMobileByMpWeixin(e) {
        console.log(e);
        if (e.detail.errMsg == 'getPhoneNumber:ok') {
          console.log(e.detail);
          //检查登录信息是否过期，否则通过重新登录刷新session_key
          await this.beforeGetphonenumber();
          uniIdCo
            .bindMobileByMpWeixin(e.detail)
            .then(e => {
              console.log(e);
              this.$emit('success');
            })
            .finally(e => {
              this.closeMe();
            });
        } else {
          this.closeMe();
        }
      },
      async open() {
        this.$refs.popup.open();
      },
      closeMe(e) {
        this.$refs.popup.close();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/common/login-page.scss";

  view {
    display: flex;
  }

  .box {
    width: 750rpx;
    height: 200px;
    background-color: #fff;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    flex-direction: column;
  }

  .headBox {
    height: 80rpx;
    padding: 20rpx;
    margin-left: 15rpx;
    font-size: 16px;
    line-height: 80rpx;
    color: #333;
    text-align: left;
  }

  .tip {
    margin: 10rpx 30rpx;
    font-size: 18px;
    color: #666;
    text-align: left;
    justify-content: center;
  }

  .btnBox {
    margin-top: 45rpx;
    justify-content: center;
    flex-direction: row;
  }

  .close, .agree {
    width: 200rpx;
    height: 80upx;
    margin: 0 20rpx;
    font-size: 14px;
    line-height: 80upx;
    text-align: center;
    border-radius: 5px;
  }

  .close {
    color: #999;
    background-color: #fff;
    border-color: #eee;
    border-style: solid;
    border-width: 1px;
  }

  .close:active {
    color: #989898;
    background-color: #e2e2e2;
  }

  .agree {
    color: #fff;
  }

  /* #ifdef MP */
  .agree::after {
    border: none;
  }

  /* #endif */
  .agree:active {
    background-color: #f5f5f6;
  }
</style>
