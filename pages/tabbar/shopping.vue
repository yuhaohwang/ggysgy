<template>
  <view class="y-s-c h-full">
    <u-toast ref="uToast"></u-toast>

    <view class="x-b-c w-full bg-main padding-lr-sm">
      <image
        src="/static/images/user/default.png"
        class="border-radius-lg headimg"
        style="width: 66rpx; height: 66rpx"
        mode=""
        @click="user"
      ></image>
      <view class="margin-left-xs flex1"><use-header :search-tip="searchTip" :search-auto="searchAuto" @search="search"></use-header></view>
      <view class="margin-left-xs" @click="topage(categoryAll)">分类</view>
    </view>

    <!--    <view class="flex1 margin-left-sm">
      <view class="bg-dark border-radius-lg dflex" style="height: 76rpx; line-height: 76rpx">
        <input type="text" placeholder="输入关键词" class="w-full padding-lr" />
        <view class="iconfont iconsousuo-01 bg-base border-radius-lg h-full padding-lr-xl" @click="search"></view>
      </view>
    </view> -->

    <top-tab class="w-full" :tabList="sdatas" :scrollable="true" ref="uTabs" :current="tabCurrent" @tab-change="tabChange"></top-tab>

    <view class="flex1 w-full">
      <swiper style="height: 100%" :duration="0" :current="current" @animationfinish="animationfinish">
        <swiper-item v-for="(sdata, index) in sdatas" :key="index">
          <scroll-view
            class="wh-full"
            :scroll-top="sdata.scrollTop"
            scroll-y
            @scroll="toTopShow"
            @scrolltolower="onreachBottom"
            :enable-flex="true"
          >
            <use-empty v-if="sdata.empty" e-style="round" tip="无商品数据"></use-empty>

            <view v-show="!sdata.empty" class="x-c-s x-2 padding-xs border-radius">
              <view class="y-s-c waterfall_left">
                <block v-for="(l_item, l_index) in sdata.goodsLeftList" :key="l_index">
                  <view v-if="l_item" class="padding-xs w-full" @click="togoods(l_item)">
                    <view class="bg-main border-radius">
                      <image
                        :src="l_item.img"
                        style="width: 100%; max-height: 350rpx"
                        mode="widthFix"
                        :lazy-load="true"
                        @load="considerPush"
                      ></image>

                      <view class="padding-lr-sm margin-top-sm clamp-2">{{ l_item.name }}</view>

                      <view class="x-b-c padding-lr-sm margin-tb-sm">
                        <view class="x-c-c">
                          <image
                            src="/static/images/user/default.png"
                            class="border-radius-c headimg"
                            style="width: 50rpx; height: 50rpx"
                          ></image>
                          <view class="ft-dark margin-left-xs fs-xxs">广东工业大学</view>
                        </view>
                        <view class="x-c-c">
                          <!--                          <view class="iconfont iconaixin"></view>
                          <view class="clamp ft-dark margin-left-xs fs-xxs">355</view> -->
                        </view>
                      </view>
                    </view>
                  </view>
                </block>
              </view>

              <view class="y-s-c waterfall_right">
                <block v-for="(r_item, r_index) in sdata.goodsRightList" :key="r_index">
                  <view v-if="r_item" class="padding-xs w-full" @click="togoods(r_item)">
                    <view class="bg-main border-radius">
                      <image
                        :src="r_item.img"
                        style="width: 100%; max-height: 350rpx"
                        mode="widthFix"
                        :lazy-load="true"
                        @load="considerPush"
                      ></image>

                      <view class="padding-lr-sm margin-top-sm clamp-2">{{ r_item.name }}</view>

                      <view class="x-b-c padding-lr-sm margin-tb-sm">
                        <view class="x-c-c">
                          <image
                            src="/static/images/user/default.png"
                            class="border-radius-c headimg"
                            style="width: 50rpx; height: 50rpx"
                          ></image>
                          <view class="ft-dark margin-left-xs fs-xxs">广东工业大学</view>
                        </view>
                        <view class="x-c-c">
                          <!--                          <view class="iconfont iconaixin"></view>
                          <view class="clamp ft-dark margin-left-xs fs-xxs">355</view> -->
                        </view>
                      </view>
                    </view>
                  </view>
                </block>
              </view>
            </view>
            <!-- 上拉加载更多 -->
            <use-loadmore :type="sdata.loadmoreType" v-if="!sdata.empty"></use-loadmore>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 置顶 -->
    <use-totop ref="usetop" :style="{ marginBottom: navHeight + 'px' }" @toTop="toTop" :scrollTop="scrollTop"></use-totop>
  </view>
</template>

<script>
const debounce = (fn, delay) => {
  var timer // 维护一个 timer
  return function() {
    var _this = this // 取debounce执行作用域的this
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      fn.apply(_this, args) // 用apply指向调用debounce的对象，相当于_this.fn(args);
    }, delay)
  }
}

const throttle = (func, delay) => {
  let timer = null
  let starttime = Date.now()
  return function() {
    let curTime = Date.now() // 当前时间
    let remaining = delay - (curTime - starttime) // 从上一次到现在，还剩下多少多余时间
    let context = this
    let args = arguments
    clearTimeout(timer)
    if (remaining <= 0) {
      func.apply(context, args)
      starttime = Date.now()
    } else {
      timer = setTimeout(func, remaining)
    }
  }
}

const _goodscategory = 'usemall-goods-category'
const _goods = 'usemall-goods'
export default {
  data() {
    return {
      // 头部参数
      searchAuto: !0,
      searchTip: '请输入搜索关键字',

      scrollTop: 0,
      navHeight: 0,

      // 分类入口
      categoryAll: {
        type: '页面',
        url: `/pages/category/category`,
      },

      current: 0,
      tabCurrent: 0,

      // 当前选中分类ID
      cid: 0,
      // 二级数据
      sdatas: [],
    }
  },
  onLoad() {
    this.loadData()
  },
  mounted() {
    // #ifdef H5 || MP-360
    this.navHeight = 50
    // #endif
  },
  //下拉刷新
  onPullDownRefresh() {
    const cidx = this.current
    this.sdatas[cidx].goodsDatas = []
    this.sdatas[cidx].goodsLeftList = []
    this.sdatas[cidx].goodsRightList = []
    this.sdatas[cidx].loadmoreType = 'more'
    this.$nextTick(function() {
      this.loadGoodsDatas('refresh')
    })
  },

  methods: {
    async loadData() {
      this.$db[_goodscategory]
        .where(`'state'=='启用'`)
        .tolist()
        .then(res => {
          if (res.code === 200) {
            const temp = [
              {
                _id: 0,
                name: '全部',
              },
            ]

            res.datas.forEach(item => {
              if (item.pid) {
                // 二级分类
                temp.push(item)
              }
            })

            if (temp.length > 0) {
              temp.forEach(item => {
                // 空白页
                item.empty = false
                // 是否首次获取分类数据
                item.firstGet = true
                // 商品列表
                item.goodsDatas = []
                // 左侧商品列表
                item.goodsLeftList = []
                // 右侧商品列表
                item.goodsRightList = []
                // 组件数据备份
                item.newList = []
                // 加载更多状态
                item.loadmoreType = 'more'
                // 商品请求数据
                item.reqdata = {
                  rows: 8,
                  page: 1,
                }
                item.scrollTop = 0
                item.scrollTopTemp = 0
              })

              this.sdatas = temp

              this.$nextTick(function() {
                this.loadGoodsDatas()
              })
            }
          }
        })
    },

    // 加载商品，下拉刷新|上拉加载
    async loadGoodsDatas(type = 'add') {
      const cidx = this.current

      // 防止重复加载
      if (this.sdatas[cidx].loadmoreType === 'loading') {
        return
      }

      // 没有更多直接返回
      if (type === 'add' && this.sdatas[cidx].loadmoreType === 'nomore') {
        return
      } else if (type === 'add') {
        this.sdatas[cidx].loadmoreType = 'loading'
      }

      if (type === 'refresh') {
        this.sdatas[cidx].goodsDatas = []
        // 从首页开始加载
        this.sdatas[cidx].reqdata.page = 1
      }

      // 根据当前 cid 加载商品数据列表
      this.sdatas[cidx].reqdata.cid = this.cid

      // this.$db['usemall-goods, usemall-goods']
      //   .collection()
      //   .where('create_uid == $env.uid')
      //   .field('visit_cnt, last_modify_time, goods._id as goods_id, goods.img as goods_img, goods.state as goods_state')
      //   .orderBy('last_modify_time desc')
      //   .get()
      //   .then(res => {
      //     if (res && res.result && res.result.code === 0) {
      //       let _historyDatas = []
      //       res.result.data.forEach(x => {
      //         x._id = x.goods_id[0]
      //         x.img = x.goods_img[0]
      //         x.state = x.goods_state[0]
      //         _historyDatas.push(x)
      //       })
      //       this.historyDatas = _historyDatas
      //     }
      //   })

      let res = await this.$db[_goods]
        .where(this.cid == 0 ? `state == '销售中'` : `'${this.cid}' in cids && state == '销售中'`)
        .tolist({ ...this.sdatas[cidx].reqdata, orderby: 'create_time desc' })

      if (res.datas) {
        this.sdatas[cidx].goodsDatas = [...this.sdatas[cidx].goodsDatas, ...res.datas]
        if (res.datas.length >= this.sdatas[cidx].reqdata.rows) {
          this.sdatas[cidx].reqdata.page++
          this.sdatas[cidx].loadmoreType = 'more'
        } else {
          this.sdatas[cidx].loadmoreType = 'nomore'
        }
      }

      this.sdatas[cidx].empty = this.sdatas[cidx].goodsDatas.length === 0 ? true : false
      this.sdatas[cidx].firstGet = false

      this.$nextTick(function() {
        this.touchOff()
      })

      if (type === 'refresh') {
        uni.stopPullDownRefresh()
      }

      uni.hideLoading()
    },

    // 触发重新排列
    touchOff() {
      // console.log('touchOff')
      const cidx = this.current
      var goods = new Set([...this.sdatas[cidx].goodsLeftList, ...this.sdatas[cidx].goodsRightList])
      let temp = this.sdatas[cidx].goodsDatas.filter(x => !goods.has(x))
      this.sdatas[cidx].newList = temp

      if (this.sdatas[cidx].goodsLeftList.length == 0) {
        this.$set(this.sdatas[cidx], 'goodsLeftList', [])
        this.$set(this.sdatas[cidx], 'goodsRightList', [])
        this.$nextTick(function() {
          this.sdatas[cidx].goodsLeftList.push(this.sdatas[cidx].newList.shift()) //触发排列
        })
      } else {
        this.considerPush()
      }
    },

    // 计算排列
    considerPush() {
      const cidx = this.current
      if (this.sdatas[cidx].newList.length == 0) return //没有数据了
      var query = uni.createSelectorQuery().in(this)
      query.selectAll('.waterfall_left').boundingClientRect()
      query.selectAll('.waterfall_right').boundingClientRect()
      query.exec(res => {
        let leftH = res[0].length ? res[0][cidx].height : 0 //防止查询不到做个处理
        let rightH = res[1].length ? res[1][cidx].height : 0
        this.$nextTick(function() {
          if (this.sdatas[cidx].newList) {
            leftH <= rightH + 200
              ? this.sdatas[cidx].goodsLeftList.push(this.sdatas[cidx].newList.shift())
              : this.sdatas[cidx].goodsRightList.push(this.sdatas[cidx].newList.shift())
          }
        })
      })
    },

    //加载更多
    onreachBottom() {
      const cidx = this.current
      this.$nextTick(function() {
        this.loadGoodsDatas()
      })
    },

    toTopShow: debounce(function(e) {
      if (typeof e != 'undefined') {
        const top = e.detail.scrollTop
        const cidx = this.current
        this.sdatas[cidx].scrollTopTemp = top
        this.scrollTop = top
      }
    }, 100),

    toTop() {
      const cidx = this.current
      // 回到顶部之前先更新scrollTop位置
      this.sdatas[cidx].scrollTop = this.sdatas[cidx].scrollTopTemp
      this.$nextTick(function() {
        this.sdatas[cidx].scrollTop = 0
        this.scrollTop = 0
      })
    },

    // tabs通知swiper切换
    tabChange(e) {
      const cidx = e.index

      if (this.current != cidx && this.sdatas[cidx].firstGet) {
        uni.showLoading({
          title: '正在加载',
          mask: true,
        })
        this.$nextTick(function() {
          this.loadGoodsDatas('refresh')
        })
      }

      this.cid = e._id
      this.current = cidx
    },

    // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish(e) {
      let current = e.detail.current
      this.tabCurrent = current

      // 切换tab之前先更新scrollTop位置
      this.sdatas[this.current].scrollTop = this.sdatas[this.current].scrollTopTemp
      let top = this.sdatas[current].scrollTop
      this.scrollTop = top
    },

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
    // 跳转详情页
    dongt(options) {
      uni.navigateTo({
        url: `/pages/shopping/detail?id=${options}`,
      })
    },
    // 跳转商品详情
    togoods(item) {
      console.log(item._id)
      this.$api.togoods({
        id: item._id,
      })
    },
    // 跳转商品列表
    togoodslist(item) {
      this.$api.togoodslist({
        cid: item._id,
      })
    },
    // 跳转页面
    topage(item) {
      console.log('分类点击', item.url)
      if (item && item.type == '网页') {
        uni.navigateTo({
          url: `/pages/content/web?url=${item.url}`,
        })
      } else if (item && item.type == '页面') {
        uni.navigateTo({
          url: `${item.url}`,
        })
      } else if (item && item.type == '标签') {
        uni.switchTab({
          url: `${item.url}`,
        })
      } else {
        if (item.id)
          this.$api.togoods({
            id: item._id,
          })
      }
    },
    // 搜索回调函数
    search() {
      console.log('home search')
    },
  },
}
</script>

<style lang="less">
page {
  height: 100%;
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
