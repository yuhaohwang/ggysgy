<template>
  <view class="use-loadmore ptb-sm dflex-c">
    <view v-if="type !== 'nomore'" class="iconfont iconxiangqing animated rotate mr-sm ft-base"></view>
    <text class="ft-dark">{{ tip || defaults[type] }}</text>
  </view>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'more',
      },
      tip: {
        type: String,
        default: '',
      },
      defaults: {
        type: Object,
        default() {
          return {
            more: '上拉显示更多',
            loading: '艺心益盟 · 传播艺术之美',
            nomore: '已经到底了',
          };
        },
      },
    },
    data() {
      return {};
    },
    computed: {},
    methods: {},
  };
</script>

<style lang="scss">
  .use-loadmore {
  }
</style>
