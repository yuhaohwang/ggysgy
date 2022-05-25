<template>
  <view class="y-s-c h-full">
    <u-toast ref="uToast"></u-toast>

    <view class="x-b-c w-full padding-xs">
      <image
        src="/static/images/user/default.png"
        class="border-radius-lg headimg"
        style="width: 66rpx; height: 66rpx;"
        mode=""
        @click="user"
      ></image>

      <view class="flex1 margin-left-sm">
        <view class="bg-main border-radius-lg dflex" style="height: 76rpx; line-height: 76rpx;">
          <input type="text" placeholder="输入关键词" class="w-full padding-lr" />
          <view class="iconfont iconsousuo-01 bg-base border-radius-lg h-full padding-lr-xl" @click="search"></view>
        </view>
      </view>
    </view>

    <top-tab class="w-full" :tabList="sdatas" :scrollable="true" ref="uTabs" :current="current" @tab-change="tabChange"></top-tab>

    <view class="flex1 w-full">
      <swiper style="height: 100%;" :current="current" @animationfinish="animationfinish">
        <swiper-item v-for="(sdata, index) in sdatas" :key="index">
          <scroll-view class="wh-full" scroll-y @scrolltolower="onreachBottom">
            <use-empty v-if="sdata.empty" e-style="round" tip="无商品数据"></use-empty>

            <view v-show="!sdata.empty" class="x-c-s x-2 padding-xs border-radius">
              <view class="y-s-c waterfall_left">
                <block v-for="(l_item, l_index) in sdata.goodsLeftList" :key="l_index">
                  <view class="padding-xs w-full" @click="togoods(l_item)">
                    <view class="bg-main border-radius">
                      <image :src="l_item.img" style="width: 100%; max-height: 350rpx;" mode="widthFix" @load="considerPush"></image>

                      <view class="padding-lr-sm margin-top-sm clamp-2">{{ l_item.name }}</view>

                      <view class="x-b-c padding-lr-sm margin-tb-sm">
                        <view class="x-c-c">
                          <image
                            src="/static/images/user/default.png"
                            class="border-radius-c headimg"
                            style="width: 50rpx; height: 50rpx;"
                          ></image>
                          <view class="ft-dark margin-left-xs fs-xxs">Usecloud</view>
                        </view>
                        <view class="x-c-c">
                          <view class="iconfont iconaixin"></view>
                          <view class="clamp ft-dark margin-left-xs fs-xxs">355</view>
                        </view>
                      </view>
                    </view>
                  </view>
                </block>
              </view>

              <view class="y-s-c waterfall_right">
                <block v-for="(r_item, r_index) in sdata.goodsRightList" :key="r_index">
                  <view class="padding-xs w-full" @click="togoods(r_item)">
                    <view class="bg-main border-radius">
                      <image :src="r_item.img" style="width: 100%; max-height: 350rpx;" mode="widthFix" @load="considerPush"></image>

                      <view class="padding-lr-sm margin-top-sm clamp-2">{{ r_item.name }}</view>

                      <view class="x-b-c padding-lr-sm margin-tb-sm">
                        <view class="x-c-c">
                          <image
                            src="/static/images/user/default.png"
                            class="border-radius-c headimg"
                            style="width: 50rpx; height: 50rpx;"
                          ></image>
                          <view class="ft-dark margin-left-xs fs-xxs">Usecloud</view>
                        </view>
                        <view class="x-c-c">
                          <view class="iconfont iconaixin"></view>
                          <view class="clamp ft-dark margin-left-xs fs-xxs">355</view>
                        </view>
                      </view>
                    </view>
                  </view>
                </block>
              </view>
            </view>

            <!-- 置顶 -->
            <!-- <use-totop ref="usetop" :style="{ marginBottom: navHeight + 'px' }"></use-totop> -->
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
const _goodscategory = 'usemall-goods-category'
const _goods = 'usemall-goods'
export default {
  data() {
    return {
      current: 0,

      // 当前选中分类ID
      cid: 0,
      // 二级数据
      sdatas: [],

      title_id: 0,

      scrollTop: 0,
      navHeight: 0,

      // 商品列表
      prevGoodsDatas: [],
      // 左侧商品列表
      prevGoodsLeftList: [],
      // 右侧商品列表
      prevGoodsRightList: [],
      // 组件数据备份
      prevNewList: [],

      // 商品列表
      nowGoodsDatas: [],
      // 左侧商品列表
      nowGoodsLeftList: [],
      // 右侧商品列表
      nowGoodsRightList: [],
      // 组件数据备份
      nowNewList: [],

      // 商品列表
      nextGoodsDatas: [],
      // 左侧商品列表
      nextGoodsLeftList: [],
      // 右侧商品列表
      nextGoodsRightList: [],
      // 组件数据备份
      nextNewList: [],
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
  onPageScroll(e) {
    // 兼容iOS端下拉时顶部漂移
    if (e.scrollTop >= 0) {
      this.headerPosition = 'fixed'
    } else {
      this.headerPosition = 'absolute'
    }
    // this.scrollTop = e.scrollTop
    this.$refs.usetop.change(e.scrollTop)
  },
  //下拉刷新
  onPullDownRefresh() {
    const cidx = this.current
    this.sdatas[cidx].goodsDatas = []
    this.sdatas[cidx].loadmoreType = 'more'
    this.$nextTick(function() {
      this.loadGoodsDatas('refresh')
    })
  },

  methods: {
    async loadData() {
      this.$db[_goodscategory].tolist().then(res => {
        if (res.code === 200) {
          const temp = [
            {
              _id: 0,
              name: '全部',
            },
          ]

          res.datas.forEach(item => {
            if (item.pid && item.state == '启用') {
              // 二级分类
              temp.push(item)
            }
          })

          if (temp.length > 0) {
            temp.forEach(item => {
              // 空白页
              item.empty = true
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
                rows: 20,
                page: 1,
              }
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
    async loadGoodsDatas(type = 'add', loading) {
      const cidx = this.current

      if (this.sdatas[cidx].loadmoreType === 'loading') {
        // 防止重复加载
        return
      }

      if (loading == 1 || type == 'refresh') {
        // 从首页开始加载
        this.sdatas[cidx].reqdata.page = 1
      }

      // 没有更多直接返回
      if (type === 'add') {
        console.log(this.sdatas[cidx].loadmoreType)
        if (this.sdatas[cidx].loadmoreType === 'nomore') {
          return
        }
        // 加载中
        this.sdatas[cidx].loadmoreType = 'loading'
      } else {
        // 更多
        this.sdatas[cidx].loadmoreType = 'more'
      }

      this.$refs.uToast.show({
        type: 'loading',
      })

      // 根据当前 cid 加载商品数据列表
      this.sdatas[cidx].reqdata.cid = this.cid
      this.$db[_goods]
        .where(this.cid == 0 ? `state == '销售中'` : `'${this.cid}' in cids`)
        .tolist(this.sdatas[cidx].reqdata)
        .then(res => {
          if (res.code === 200) {
            if (res.datas && res.datas.length > 0) {
              if (loading == 1 || type == 'refresh') {
                this.sdatas[cidx].goodsDatas = []
              }
              let _datas = []
              res.datas.forEach(row => {
                if (row.state === '销售中') {
                  _datas.push(row)
                }
              })
              this.sdatas[cidx].goodsDatas = [...this.sdatas[cidx].goodsDatas, ..._datas]

              if (res.datas.length >= this.sdatas[cidx].reqdata.rows) {
                this.sdatas[cidx].reqdata.page++
                this.sdatas[cidx].loadmoreType = 'more'
              } else {
                this.sdatas[cidx].loadmoreType = 'nomore'
              }
            } else {
              this.sdatas[cidx].loadmoreType = 'nomore'
            }
          }

          this.sdatas[cidx].empty = this.sdatas[cidx].goodsDatas.length === 0 ? true : false

          this.$nextTick(function() {
            this.touchOff()
          })

          if (loading == 1) {
            uni.hideLoading()
          } else if (type == 'refresh') {
            uni.stopPullDownRefresh()
          }

          this.$refs.uToast.show({
            type: 'loading',
            duration: 0,
          })
        })
    },

    // 触发重新排列
    touchOff() {
      console.log('touchOff')
      const cidx = this.current
      this.sdatas[cidx].newList = [...this.sdatas[cidx].goodsDatas]
      this.sdatas[cidx].goodsLeftList = []
      this.sdatas[cidx].goodsRightList = []

      this.$nextTick(function() {
        if (this.sdatas[cidx].newList.length != 0) {
          this.sdatas[cidx].goodsLeftList.push(this.sdatas[cidx].newList.shift()) //触发排列
        }
      })
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
        if (leftH <= rightH) {
          // 相等 || 左边小
          this.sdatas[cidx].goodsLeftList.push(this.sdatas[cidx].newList.shift())
        } else {
          // 右边小
          this.sdatas[cidx].goodsRightList.push(this.sdatas[cidx].newList.shift())
        }
      })
    },

    //加载更多
    onreachBottom() {
      this.loadGoodsDatas()
    },

    // tabs通知swiper切换
    tabChange(e) {
      const cidx = e.index
      this.cid = e._id
      this.current = cidx
      this.sdatas[cidx].goodsDatas = []
      this.sdatas[cidx].loadmoreType = 'more'
      this.$nextTick(function() {
        this.loadGoodsDatas('refresh')
      })
    },

    // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish(e) {
      let current = e.detail.current
      this.current = current
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
    pitch(index) {
      this.title_id = index
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
