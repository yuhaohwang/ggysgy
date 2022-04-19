<template>
  <view class="good">
    <view class="cla1"></view>
    <image class="cla2"
      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7e00db99-ad65-4b9f-a74b-61bccb92b124/5433329e-95c5-4973-aa87-86c4d1815771.jpg"
      mode="widthFix"></image>
    <text class="cla3">Usecloud</text>
    <text class="cla4">为您挑选了一个好物</text>
    <image class="cla5"
      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7e00db99-ad65-4b9f-a74b-61bccb92b124/11bd19fa-6a70-49fd-9e71-72950828f6a8.jpg"
      mode="widthFix"></image>
    <text class="cla6">￥</text>
    <text class="cla7">1339.90</text>
    <text class="cla8">小米10 Xiaomi/小米手机小米10手机骁龙865 1亿像素双模5G官方正品 骁龙865旗舰处理器 1亿像素8K电影相机</text>
    <image class="cla9"
      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7e00db99-ad65-4b9f-a74b-61bccb92b124/11bd19fa-6a70-49fd-9e71-72950828f6a8.jpg"
      mode="widthFix"></image>
    <view class="banner">
      <view class="cla11"></view>
      <text class="cla12">艺设公益 · 传播艺术的美</text>
      <view class="cla13"></view>
    </view>
  </view>

</template>

<script>
</script>

<style lang="scss">
  .good {
    width: 750rpx;
    height: 1114rpx;
    background: #feaa30;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;

    .cla1 {
      position: fixed;
      left: 40rpx;
      top: 144rpx;
      background: #fff;
      border-radius: 30rpx;
      width: 670rpx;
      height: 900rpx;
      box-shadow: 0 20rpx 48rpx rgba(0, 0, 0, .05);
    }

    .cla2 {
      position: fixed;
      left: 50rpx;
      top: 40rpx;
      width: 84rpx;
      height: 84rpx;
      border-radius: 50%;
      color: #999;
      box-shadow: 0px 0px 7px #f0f0f0;
    }

    // 2. 会员名称
    .cla3 {
      position: fixed;
      color: #fff;
      left: 154rpx;
      top: 40rpx;
      font-size: 32rpx;
      font-weight: bold;
    }

    .cla4 {
      position: fixed;
      color: #fff;
      left: 154rpx;
      top: 90rpx;
      font-size: 24rpx;
    }

    // 4. 产品图
    .cla5 {
      position: fixed;
      left: 72rpx;
      top: 176rpx;
      width: 606rpx;
      height: 606rpx;
      border-radius: 12rpx;
    }

    .cla6 {
      position: fixed;
      color: #feaa30;
      left: 70rpx;
      top: 840rpx;
      font-size: 26rpx;
    }

    // 6. 产品价格
    .cla7 {
      position: fixed;
      color: #feaa30;
      left: 94rpx;
      top: 812rpx;
      font-size: 56rpx;
      font-weight: bold;
    }

    // 7. 产品介绍
    .cla8 {
      position: fixed;
      width: 450rpx;
      height: 100rpx;
      color: #333;
      left: 76rpx;
      top: 908rpx;
      font-size: 30rpx;
      line-height: 50rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: wrap;
    }

    // 8. 产品二维码
    .cla9 {
      position: fixed;
      left: 545rpx;
      top: 875rpx;
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
        border: 1px solid #fff;
        width: 70rpx;
      }

      .cla12 {
        color: #fff;
        font-size: 24rpx;
        padding: 0 10rpx;
      }

      .cla13 {
        border: 1px solid #fff;
        width: 70rpx;
      }
    }




  }
</style>
