<template>
  <view class="good">
    <view class="cla1"></view>
    <image
      class="cla2"
      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7e00db99-ad65-4b9f-a74b-61bccb92b124/5433329e-95c5-4973-aa87-86c4d1815771.jpg"
      mode="widthFix"
    ></image>
    <text class="cla3">Usecloud</text>
    <text class="cla4">为您挑选了一个好物</text>
    <image
      class="cla5"
      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7e00db99-ad65-4b9f-a74b-61bccb92b124/11bd19fa-6a70-49fd-9e71-72950828f6a8.jpg"
      mode="widthFix"
    ></image>
    <text class="cla6">￥</text>
    <text class="cla7">1339.90</text>
    <text class="cla8"
      >小米10 Xiaomi/小米手机小米10手机骁龙865 1亿像素双模5G官方正品 骁龙865旗舰处理器 1亿像素8K电影相机</text
    >
    <image
      class="cla9"
      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7e00db99-ad65-4b9f-a74b-61bccb92b124/11bd19fa-6a70-49fd-9e71-72950828f6a8.jpg"
      mode="widthFix"
    ></image>
    <view class="banner">
      <view class="cla11"></view>
      <text class="cla12">以艺自强 · 传播艺术的美</text>
      <view class="cla13"></view>
    </view>
  </view>
</template>

<script></script>

<style lang="scss">
  .good {
    display: flex;
    width: 750rpx;
    height: 1114rpx;
    background: #feaa30;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;

    .cla1 {
      position: fixed;
      top: 144rpx;
      left: 40rpx;
      width: 670rpx;
      height: 900rpx;
      background: #fff;
      border-radius: 30rpx;
      box-shadow: 0 20rpx 48rpx rgba(0, 0, 0, 0.05);
    }

    .cla2 {
      position: fixed;
      top: 40rpx;
      left: 50rpx;
      width: 84rpx;
      height: 84rpx;
      color: #999;
      border-radius: 50%;
      box-shadow: 0 0 7px #f0f0f0;
    }

    // 2. 会员名称
    .cla3 {
      position: fixed;
      top: 40rpx;
      left: 154rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #fff;
    }

    .cla4 {
      position: fixed;
      top: 90rpx;
      left: 154rpx;
      font-size: 24rpx;
      color: #fff;
    }

    // 4. 产品图
    .cla5 {
      position: fixed;
      top: 176rpx;
      left: 72rpx;
      width: 606rpx;
      height: 606rpx;
      border-radius: 12rpx;
    }

    .cla6 {
      position: fixed;
      top: 840rpx;
      left: 70rpx;
      font-size: 26rpx;
      color: #feaa30;
    }

    // 6. 产品价格
    .cla7 {
      position: fixed;
      top: 812rpx;
      left: 94rpx;
      font-size: 56rpx;
      font-weight: bold;
      color: #feaa30;
    }

    // 7. 产品介绍
    .cla8 {
      position: fixed;
      top: 908rpx;
      left: 76rpx;
      width: 450rpx;
      height: 100rpx;
      overflow: hidden;
      font-size: 30rpx;
      line-height: 50rpx;
      color: #333;
      text-overflow: ellipsis;
      white-space: wrap;
    }

    // 8. 产品二维码
    .cla9 {
      position: fixed;
      top: 875rpx;
      left: 545rpx;
      width: 135rpx;
      height: 135rpx;
      background: #fff;
    }

    .banner {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      align-content: center;
      flex-wrap: nowrap;
      height: 20rpx;
      margin-bottom: 25rpx;

      .cla11 {
        width: 70rpx;
        border: 1px solid #fff;
      }

      .cla12 {
        padding: 0 10rpx;
        font-size: 24rpx;
        color: #fff;
      }

      .cla13 {
        width: 70rpx;
        border: 1px solid #fff;
      }
    }
  }
</style>
