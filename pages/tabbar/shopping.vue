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

    <u-tabs
      :list="list4"
      lineWidth="20"
      lineHeight="7"
      :scrollable="true"
      :lineColor="`url(${lineBg}) 100% 100%`"
      :activeStyle="{
        color: '#303133',
        fontWeight: 'bold',
        transform: 'scale(1.05)',
        fontSize: '28rpx',
      }"
      :inactiveStyle="{
        color: '#606266',
        transform: 'scale(1)',
        fontSize: '28rpx',
      }"
      itemStyle="height: 70rpx; white-space: nowrap; padding: auto;"
    ></u-tabs>

    <view class="x-c-s x-2 padding-xs border-radius">
      <view class="y-s-c">
        <view class="padding-xs w-full">
          <view class="bg-main border-radius">
            <image
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f034dbfa-a6f0-4bce-912d-5425bd5fbadf/d1888b99-0dbd-47dc-937f-c0717f366f62.jpg"
              style="width: 100%; max-height: 150rpx;"
              mode="aspectFit"
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

        <block v-for="(item, index) in [1, 1, 1, 1, 1, 1]" :key="index">
          <view class="padding-xs" @click="dongt(item.id)">
            <view class="bg-main border-radius">
              <image
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f034dbfa-a6f0-4bce-912d-5425bd5fbadf/d1888b99-0dbd-47dc-937f-c0717f366f62.jpg"
                style="width: 100%; max-height: 350rpx;"
                mode="aspectFit"
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

      <view class="y-s-c">
        <block v-for="(item, index) in [1, 1, 1, 1, 1, 1]" :key="index">
          <view class="padding-xs w-full" @click="dongt(item.id)">
            <view class="bg-main border-radius">
              <image
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f034dbfa-a6f0-4bce-912d-5425bd5fbadf/d1888b99-0dbd-47dc-937f-c0717f366f62.jpg"
                style="width: 100%; max-height: 350rpx;"
                mode="aspectFit"
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
export default {
  data() {
    return {
      list4: [
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
      lineBg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=',

      title_id: 0,

      scrollTop: 0,
      navHeight: 0,
    }
  },
  onPageScroll(e) {
    // this.scrollTop = e.scrollTop
    this.$refs.usetop.change(e.scrollTop)
  },
  methods: {
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
  mounted() {
    // #ifdef H5 || MP-360
    this.navHeight = 50
    // #endif
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
