<template>
  <view class="">
    <view class="x-b-c padding-xs">
      <image
        src="/static/images/user/default.png"
        class="border-radius-lg headimg"
        style="width: 66rpx; height: 66rpx;"
        mode=""
        @click="user"
      ></image>

      <view class="flex1 margin-left-sm">
        <view class="bg-main border-radius-lg dflex" style="height: 76rpx; line-height: 76rpx;">
          <input type="text" placeholder="输入关键词" class="w-full padding-lr" />
          <view class="iconfont iconsousuo-01 bg-base border-radius-lg h-full padding-lr-xl" @click="search"></view>
        </view>
      </view>
    </view>

    <top-tab :tabList="tabList" @tabClick="tabClick"></top-tab>

    <view class="x-c-s x-2 padding-xs border-radius">
      <view class="y-s-c">
        <block v-for="(item, index) in [1, 1, 1, 1, 1, 1]" :key="index">
          <view class="padding-xs w-full" @click="dongt(item.id)">
            <view class="bg-main border-radius">
              <image
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f034dbfa-a6f0-4bce-912d-5425bd5fbadf/3db0e3e9-4af6-41e8-af00-92996a87ee3a.jpg"
                style="width: 100%; max-height: 350rpx;"
                mode="widthFix"
              ></image>

              <view class="padding-lr-sm margin-top-sm clamp-2">漆画</view>

              <view class="x-b-c padding-lr-sm margin-tb-sm">
                <view class="x-c-c">
                  <image src="/static/images/user/default.png" class="border-radius-c headimg" style="width: 50rpx; height: 50rpx;"></image>
                  <view class="ft-dark margin-left-xs fs-xxs">Usecloud</view>
                </view>
                <view class="x-c-c">
                  <view class="iconfont iconaixin"></view>
                  <view class="clamp ft-dark margin-left-xs fs-xxs">355</view>
                </view>
              </view>
            </view>
          </view>
        </block>
      </view>

      <view class="y-s-c">
        <block v-for="(item, index) in [1, 1, 1, 1, 1, 1]" :key="index">
          <view class="padding-xs w-full" @click="dongt(item.id)">
            <view class="bg-main border-radius">
              <image
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f034dbfa-a6f0-4bce-912d-5425bd5fbadf/d1888b99-0dbd-47dc-937f-c0717f366f62.jpg"
                style="width: 100%; max-height: 350rpx;"
                mode="widthFix"
              ></image>

              <view class="padding-lr-sm margin-top-sm clamp-2">油画</view>

              <view class="x-b-c padding-lr-sm margin-tb-sm">
                <view class="x-c-c">
                  <image src="/static/images/user/default.png" class="border-radius-c headimg" style="width: 50rpx; height: 50rpx;"></image>
                  <view class="ft-dark margin-left-xs fs-xxs">Usecloud</view>
                </view>
                <view class="x-c-c">
                  <view class="iconfont iconaixin"></view>
                  <view class="clamp ft-dark margin-left-xs fs-xxs">355</view>
                </view>
              </view>
            </view>
          </view>
        </block>
      </view>
    </view>

    <!-- 置顶 -->
    <use-totop ref="usetop" :style="{ marginBottom: navHeight + 'px' }"></use-totop>
  </view>
</template>

<script>
const _goodscategory = 'usemall-goods-category'
export default {
  data() {
    return {
      // 当前选中分类ID
      cid: 0,
      // 一级数据
      fdatas: [],
      // 二级数据
      sdatas: [],

      tabList: [
        {
          name: '全部',
        },
        {
          name: '油画',
        },
        {
          name: '水彩',
        },
        {
          name: '国画',
        },
        {
          name: '素描',
        },
        {
          name: '雕塑',
        },
        {
          name: '摄影',
        },
        {
          name: '数绘',
        },
      ],

      title_id: 0,

      scrollTop: 0,
      navHeight: 0,
    }
  },
  onLoad() {
    this.loadData()
  },
  mounted() {
    // #ifdef H5 || MP-360
    this.navHeight = 50
    // #endif
  },
  onPageScroll(e) {
    // this.scrollTop = e.scrollTop
    this.$refs.usetop.change(e.scrollTop)
  },
  methods: {
    async loadData() {
      this.$db[_goodscategory].tolist().then(res => {
        if (res.code === 200) {
          this.fdatas = []
          this.sdatas = []

          res.datas.forEach(item => {
            if (!item.pid && item.state == '启用') {
              // pid为父级id, 不存在 pid || pid=0 为一级分类
              this.fdatas.push(item)
            } else {
              // 二级分类
              this.sdatas.push(item)
            }
          })

          if (this.fdatas.length > 0) {
            this.cid = this.fdatas[0]._id
          }
        }
      })
    },

    tabClick(e) {
      console.log(e)
    },

    // 跳转个人
    user() {
      uni.navigateTo({
        url: `/pages/shopping/user`,
      })
    },
    // 搜索
    search() {
      this.$api.msg('搜索')
    },
    pitch(index) {
      this.title_id = index
    },
    // 跳转详情页
    dongt(options) {
      uni.navigateTo({
        url: `/pages/shopping/detail?id=${options}`,
      })
    },
  },
}
</script>

<style lang="less">
page {
  background-color: #f5f5f5;
}

.active {
  color: #feaa30;
  font-weight: bold;
  font-size: 34rpx;
}

.goodsContent {
  width: 100%;
  display: flex;
  justify-content: center;

  .ft-dark {
    color: #585858;
  }
}

.goodsLeftList,
.goodsRightList {
  width: 50%;
  overflow: hidden;
}

.goodsLeftList {
  margin-right: 10rpx;
}

.goodsRightList {
  margin-left: 10rpx;
}
</style>
