<template>
  <uni-popup ref="popup" type="bottom">
    <view class="box">
      <text class="headBox">绑定资料</text>
      <text class="tip">获取你的微信头像和昵称，完善你的个人资料</text>
      <view class="btnBox">
        <text @click="closeMe" class="close">关闭</text>
        <button class="agree uni-btn" type="primary" @click="getUserProfile">确定</button>
      </view>
    </view>
  </uni-popup>
</template>

<script>
  const db = uniCloud.database();
  const usersTable = db.collection('uni-id-users');
  let userId = '';
  export default {
    emits: ['next'],
    data() {
      return {};
    },
    methods: {
      async open(uid) {
        userId = uid;
        this.$refs.popup.open();
      },
      async getUserProfile() {
        uni.showLoading();
        let res = await new Promise(callBack => {
          uni.getUserProfile({
            desc: '用于设置账户昵称和头像',
            complete: e => {
              console.log('getUserProfile:', e);
              callBack(e);
            },
          });
        });
        // console.log("userInfo", res.userInfo);
        if (res.errMsg != 'getUserProfile:ok') {
          return this.closeMe();
        }
        let { avatarUrl, nickName } = res.userInfo,
          cloudPath = userId + '/' + Date.now() + 'avatarUrl.jpg';

        let tempFilePath = await new Promise(callBack => {
          uni.downloadFile({
            url: avatarUrl,
            success: res => {
              if (res.statusCode === 200) {
                // console.log('下载成功');
                callBack(res.tempFilePath);
              }
              callBack();
            },
            fail: err => {
              console.error(err);
            },
            complete: e => {
              // console.log("downloadFile",e);
            },
          });
        });
        // console.log(tempFilePath);
        const result = await uniCloud.uploadFile({
          filePath: tempFilePath,
          cloudPath,
          fileType: 'image',
        });
        // console.log("上传成功",{result});
        let userInfo = {
          nickname: nickName,
          avatar_file: {
            name: cloudPath,
            extname: 'jpg',
            url: result.fileID,
          },
        };
        this.doUpdate(userInfo, () => {
          this.$refs.popup.close();
        });
      },
      closeMe(e) {
        uni.showLoading();
        this.doUpdate({ nickname: '匿名微信用户' }, () => {
          uni.hideLoading();
          this.$refs.popup.close();
        });
      },
      doUpdate(data, callback) {
        // console.log('dododo',data);
        // 使用 clientDB 提交数据
        usersTable
          .where('_id==$env.uid')
          .update(data)
          .then(res => {
            callback(res);
          })
          .catch(err => {
            uni.showModal({
              content: err.message || '请求服务失败',
              showCancel: false,
            });
            callback(err);
          })
          .finally(() => {
            this.$emit('next');
            uni.hideLoading();
          });
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
