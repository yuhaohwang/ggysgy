<template>
  <view class="use-page">
    <!-- 搜索内容区 -->
    <view class="search-area pos-r w-full plr dflex-b">
      <view class="h-full flex1 dflex-c">
        <view class="icon-search pos-a">
          <text class="iconfont iconsousuo-01"></text>
        </view>
        <input type="text" class="pos-a pl" maxlength="20" placeholder="请输入关键字" @confirm="search" v-model="keyword" />
      </view>

      <view class="bg-base border-radius-big ptb-xs plr ml" @click="search">搜索</view>
    </view>
    <view class="gap"></view>

    <!-- 搜索历史区 -->
    <view class="plr w-full pt-lg" v-if="historyDatas && historyDatas.length > 0">
      <view class="dflex-b">
        <view class="dflex">
          <text>搜索历史</text>
        </view>
        <view class="iconfont iconfont iconlajitong-01 dflex-c ft-dark p-sm" @click="clear"></view>
      </view>
      <view class="dflex dflex-wrap-w">
        <view
          class="item mr-sm mb-sm dflex bg-dark border-radius-lg ptb-xs plr"
          v-for="(item, index) in historyDatas"
          :key="index"
          @click="search('history', item)"
        >
          <text>{{ item.keyword }}</text>
        </view>
      </view>
    </view>
    <!-- 热门搜索区 -->
    <view class="plr w-full pt-lg" v-if="hotDatas && hotDatas.length > 0">
      <view class="pb-sm dflex-b">
        <view class="dflex">
          <text>热门搜索</text>
        </view>
      </view>
      <view class="dflex dflex-wrap-w">
        <view
          class="item mr-sm mb-sm dflex bg-dark border-radius-lg ptb-xs plr"
          v-for="(item, index) in hotDatas"
          :key="index"
          @click="search('hot', item)"
        >
          <text>{{ item.keyword }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  const _history = 'ggysgy-search-history';
  const _hot = 'ggysgy-search-hot';
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState(['islogin']),
    },
    data() {
      return {
        // 搜索关键字
        keyword: '',

        // 历史搜索
        historyDatas: [],
        // 热门搜索
        hotDatas: [],
      };
    },
    onShow() {
      // 初始化
      this.keyword = '';

      // 加载数据
      this.loadData();
    },
    methods: {
      loadData() {
        if (this.islogin) {
          this.$db[_history]
            .where('create_uid == $env.uid')
            .tolist({ orderby: 'last_modify_time desc' })
            .then(res => {
              if (res.code === 200) {
                this.historyDatas = res.datas;
              }
            });
        }

        this.$db[_hot].tolist({ orderby: 'search_cnt desc' }).then(res => {
          if (res.code === 200) {
            this.hotDatas = res.datas;
          }
        });
      },

      // 搜索
      search(type, res) {
        switch (type) {
          case 'history':
            this.$api.toGoodList({
              keyword: res.keyword,
            });
            break;
          case 'hot':
            this.$api.toGoodList({
              sid: res._id,
            });
            break;
          default:
            this.$api.toGoodList({
              keyword: this.keyword,
            });
            break;
        }
      },
      // 清空搜索历史
      clear() {
        let _this = this;

        uni.showModal({
          title: '提示',
          content: '清空搜索历史',
          success: function (res) {
            if (res.confirm) {
              _this.$db[_history]
                .where('create_uid == $env.uid')
                .remove()
                .then(res => {
                  if (res.code === 200) {
                    _this.historyDatas = [];
                    return;
                  }
                  _this.$api.msg(res.msg);
                });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          },
        });
      },
    },
  };
</script>

<style lang="scss">
  .search-area {
    height: 120rpx;

    input {
      width: 560rpx;
      height: 64rpx;
      padding-left: 60rpx;
      line-height: 64rpx;
      background-color: #f5f5f5;
    }

    .icon-search {
      top: 50%;
      left: 40rpx;
      z-index: 1;
      transform: translate(0, -50%);

      text {
        color: #c0c0c0;
      }
    }
  }
</style>
