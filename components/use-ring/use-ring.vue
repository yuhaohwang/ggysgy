<template>
  <view class="use-ring pos-r">
    <view class="circle-ring pos-r">
      <view class="circle-left" :style="circleLeftCss" @transitionend="leftSuccess"></view>
      <view class="circle-right" :style="circleRightCss" @transitionend="rightSuccess"></view>
      <view class="circle-bottom-left"></view>
      <view class="circle-bottom-right"></view>
    </view>
    <view class="pos-a pos-tl-c ft-white">
      <slot />
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      value: {
        type: [Number, String],
        default: 0,
      },
      max: {
        type: [Number, String],
        default: 100,
      },
      activeColor: {
        type: String,
        default: '#ffbc49',
      },
      baseColor: {
        type: String,
        default: '#fff',
      },
    },
    data() {
      return {
        circleLeftCss: '',
        circleRightCss: '',
        type: 'right',
      };
    },
    methods: {
      draw(val) {
        if (val !== 0) {
          val = val || this.value;
        }

        const percent = val / this.max;

        if (percent <= 0.5) {
          this.circleRightCss = `transform: rotate(${percent * 360}deg)`;
          this.type = 'right';
        } else {
          this.circleRightCss = `transform: rotate(180deg); transition: opacity 0s step-end 1s, transform 1s linear; opacity: 0`;
          this.circleLeftCss = `transition: transform ${(percent - 0.5) / 0.5}s linear 1s; transform: rotate(${percent * 360 - 180}deg)`;
          this.type = 'left';
        }
      },
      leftSuccess() {
        if (this.type == 'left') {
          this.$emit('success');
        }
      },
      rightSuccess() {
        if (this.type == 'right') {
          this.$emit('success');
        }
      },
    },
  };
</script>

<style lang="scss">
  .use-ring {
    .circle-ring {
      width: 200rpx;
      height: 200rpx;
      -webkit-mask: radial-gradient(transparent 86rpx, #fff 88rpx);
      overflow: hidden;
      border-radius: 50%;

      view {
        position: absolute;
        width: 50%;
        height: 100%;
      }
    }

    .circle-left {
      left: 0;
      z-index: 0;
      background: #fff;
      transform-origin: 100% 50%;
    }

    .circle-right {
      right: 0;
      z-index: 2;
      background: #fff;
      transition: transform 1s linear;
      transform-origin: 0% 50%;
    }

    .circle-bottom-left {
      left: 0;
      z-index: -1;
      background: #ffbc49;
    }

    .circle-bottom-right {
      right: 0;
      z-index: 1;
      background: #ffbc49;
    }
  }
</style>
