<template>
  <view>
    <u-tabs :list="list4" lineWidth="20" lineHeight="7" :scrollable="false" :lineColor="`url(${lineBg}) 100% 100%`"
      :activeStyle="{
        color: '#303133',
        fontWeight: 'bold',
        transform: 'scale(1.05)',
        fontSize: '28rpx',
    }" :inactiveStyle="{
        color: '#606266',
        transform: 'scale(1)',
        fontSize: '28rpx',
    }" itemStyle="height: 70rpx; white-space: nowrap; padding: auto;">
    </u-tabs>

    <view class="padding border-line">

      <view class="x-b-c">

        <view class="x-c-c">
          <u--image src="../../static/images/user/default.png" width='50rpx' height='50rpx' mode="scaleToFill"
            shape="circle">
          </u--image>
          <view class="padding-left-xs">标题</view>
        </view>

        <view>交易成功</view>
      </view>

      <view class="x-c-c">

        <u--image src="../../static/images/user/default.png" width='150rpx' height='200rpx' mode="scaleToFill"
          radius="10">
        </u--image>

        <view class="y-c-s w-full">

          <view class="padding-xs">
            <view class="title">商品描述</view>
            <view class="title">商品描述</view>
            <view class="title">商品描述</view>
            <view class="title">商品描述</view>
          </view>

          <view class="x-e-c item-e">
            <view class="">实付款:</view>
            <text class="text-end" style="width: 80px">￥1000.00</text>
          </view>

        </view>

      </view>

      <view class="x-b-c">
        <view>更多</view>
        <view class="x-c-c" style="white-space: nowrap;">
          <u-button type="default" :plain="true" :hairline="true" shape='circle'>联系卖家</u-button>
          <u-button type="default" :plain="true" :hairline="true" shape='circle'>去评价</u-button>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list4: [{
            name: '全部'
          },
          {
            name: '待付款'
          },
          {
            name: '待发货'
          },
          {
            name: '待收货'
          },
          {
            name: '待评价'
          },
          {
            name: '退款中'
          }
        ],
        lineBg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII="
      }
    }
  }
</script>

<style lang="scss">
  // .title {
  //   text-align: left;
  // }
</style>
