<template>
  <div class="item dflex dflex-flow-c" @click="toOrder('/pages/user/order/order', statusKey)">
    <div class="iconfont">
      {{ icon }}
      <div class="badge badge-small" v-if="stats && stats.order_state && stats.order_state[statusKey] > 0">
        {{ stats.order_state[statusKey] }}
      </div>
    </div>
    <text>{{ text }}</text>
  </div>
</template>

<script>
  export default {
    props: {
      icon: String,
      text: String,
      statusKey: String,
      stats: Object,
    },
  };
</script>
