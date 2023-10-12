<template>
  <view
    class="fixed-top animated"
    :class="visible ? 'fade-in' : 'dn'"
    :style="{ bottom: bottom + 'rpx', right: right + 'rpx' }"
    @tap.stop="totop"
  >
    <text class="iconfont iconzhiding"></text>
  </view>
</template>

<script>
  export default {
    props: {
      top: {
        type: Number,
        default: 100,
      },

      right: {
        type: String,
        default: '30',
      },
      bottom: {
        type: String,
        default: '30',
      },

      duration: {
        type: Number,
        default: 120,
      },
      scrollTop: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        visible: false,
      };
    },
    watch: {
      scrollTop(nv, ov) {
        if (nv >= this.top) {
          this.visible = true;
        } else {
          this.visible = false;
        }
      },
    },
    methods: {
      totop: function () {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: this.duration,
        });

        this.$emit('toTop');
      },
      change(scrollTop) {
        if (scrollTop >= this.top) {
          this.visible = true;
        } else {
          this.visible = false;
        }
      },
    },
  };
</script>

<style lang="scss"></style>
