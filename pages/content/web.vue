<template>
  <view><web-view :webview-styles="webviewStyles" :src="weburl"></web-view></view>
</template>
<script>
  export default {
    data() {
      return {
        webviewStyles: {
          progress: {
            color: '#feaa30',
          },
        },
        // 路径地址
        weburl: '',
      };
    },
    onLoad(res) {
      this.weburl = res.url;

      uni.setNavigationBarTitle({
        title: '艺心益盟 ' + (res.title || ''),
      });
    },
  };
</script>

<style lang="scss"></style>
