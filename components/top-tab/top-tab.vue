<template>
  <u-tabs
    :list="tabList"
    lineWidth="20"
    lineHeight="7"
    :scrollable="false"
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
    @click="tabClick"
  ></u-tabs>
</template>

<script>
export default {
  name: 'top-tab',
  props: {
    tabList: {
      require: true,
    },
  },
  data() {
    return {
      lineBg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=',
    }
  },
  methods: {
    tabClick(e) {
      this.$emit('tabClick', e)
    },
  },
}
</script>

<style></style>
