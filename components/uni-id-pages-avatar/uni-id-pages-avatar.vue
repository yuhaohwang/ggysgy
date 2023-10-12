<template>
  <view @click="uploadAvatarImg">
    <cloud-image
      v-if="member.avatar_file"
      :src="member.avatar_file ? member.avatar_file.url : '/static/user/default.png'"
      :width="width"
      :height="height"
    ></cloud-image>
    <uni-icons
      v-else
      :style="{ width, height, lineHeight: height }"
      class="chooseAvatar"
      type="plusempty"
      size="30"
      color="#dddddd"
    ></uni-icons>
  </view>
</template>

<script>
  const db = uniCloud.database();
  const usersTable = db.collection('uni-id-users');
  import { mapState, mapMutations } from 'vuex';
  /**
   * uni-id-pages-avatar
   * @description 用户头像组件
   * @property {String} width	图片的宽，默认为：50px
   * @property {String} height	图片的高，默认为：50px
   */
  export default {
    computed: {
      ...mapState(['member']),
    },
    data() {
      return {
        isPC: false,
      };
    },
    props: {
      //头像图片宽
      width: {
        type: String,
        default() {
          return '50px';
        },
      },
      //头像图片高
      height: {
        type: String,
        default() {
          return '50px';
        },
      },
    },
    async mounted() {
      // #ifdef H5
      this.isPC = !['ios', 'android'].includes(uni.getSystemInfoSync().platform);
      console.log(' this.isPC', this.isPC, uni.getSystemInfoSync().platform);
      // #endif
    },
    methods: {
      ...mapMutations(['putMember']),
      setAvatarFile(avatar_file) {
        uni.showLoading({
          title: '设置中',
          mask: true,
        });
        // 使用 clientDB 提交数据
        usersTable
          .where('_id==$env.uid')
          .update({
            avatar_file,
          })
          .then(res => {
            if (avatar_file) {
              uni.showToast({
                icon: 'none',
                title: '更新成功',
              });
            } else {
              uni.showToast({
                icon: 'none',
                title: '删除成功',
              });
            }

            let temp = this.member;
            temp.avatar_file = avatar_file;
            this.putMember(temp);
          })
          .catch(err => {
            uni.showModal({
              content: err.message || '请求失败',
              showCancel: false,
            });
          })
          .finally(() => {
            uni.hideLoading();
          });
      },
      uploadAvatarImg(res) {
        const crop = {
          quality: 100,
          width: 600,
          height: 600,
          resize: true,
        };
        uni.chooseImage({
          count: 1,
          crop,
          success: async res => {
            let tempFile = res.tempFiles[0],
              avatar_file = {
                // #ifdef H5
                extname: tempFile.name.split('.')[tempFile.name.split('.').length - 1],
                // #endif
                // #ifndef H5
                extname: tempFile.path.split('.')[tempFile.path.split('.').length - 1],
                // #endif
              },
              filePath = res.tempFilePaths[0];
            // #ifndef APP-PLUS
            //非app端用前端组件剪裁头像，app端用内置的原生裁剪
            if (!this.isPC) {
              filePath = await new Promise(callback => {
                uni.navigateTo({
                  url: '/uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage?path=' + filePath + `&options=${JSON.stringify(crop)}`,
                  animationType: 'fade-in',
                  events: {
                    success: url => {
                      callback(url);
                    },
                  },
                  complete(e) {
                    console.log(e);
                  },
                });
              });
            }
            // #endif
            let cloudPath = this.member._id + '' + Date.now();
            avatar_file.name = cloudPath;
            uni.showLoading({
              title: '更新中',
              mask: true,
            });
            let { fileID } = await uniCloud.uploadFile({
              filePath,
              cloudPath,
              fileType: 'image',
            });
            avatar_file.url = fileID;
            uni.hideLoading();
            this.setAvatarFile(avatar_file);
          },
        });
      },
    },
  };
</script>

<style>
  .chooseAvatar {
    /* #ifndef APP-NVUE */
    display: inline-block;
    text-align: center;

    /* #endif */
    border: dotted 1px #ddd;
    border-radius: 10px;
  }
</style>
