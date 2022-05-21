<template>
  <view class="w-full">
    <!-- 01. 头部组件 -->
    <view class="x-c-c bg-main padding-lr-xs">
      <view class="search flex1"><use-header :search-tip="searchTip" :search-auto="searchAuto" @search="search"></use-header></view>
      <view class="padding-xs" @click="topage(categoryAll)">分类</view>
    </view>

    <!-- 02. 报道 -->
    <view class="report-img" v-for="(item, index) in reportDatas" :key="index" @click="topage(item)">
      <view class="container"><image class="image" :src="item.img" mode="aspectFill"></image></view>
      <view class="padding-xs title">{{ item.title }}</view>
      <view class="padding-xs tip">查看完整报道</view>
    </view>

    <!-- 上拉加载更多 -->
    <use-loadmore :type="loadmoreType"></use-loadmore>

    <!-- 置顶 -->
    <use-totop ref="usetop"></use-totop>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 头部参数
        searchAuto: !0,
        searchTip: '请输入搜索关键字',

        // 分类入口
        categoryAll: {
          type: '页面',
          url: `/pages/category/category`,
        },

        reportDatas: [
          {
            _id: '608104b52e88ef00018a8773',
            create_time: 1619068085893,
            create_uid: '607e63e021576100016eded3',
            title: '向党报告',
            img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f034dbfa-a6f0-4bce-912d-5425bd5fbadf/f9a12cea-6903-4075-8614-f61a61de9ab6.png',
            type: '页面',
            url: '/pages/goods/goods?id=1035',
          },
          {
            _id: '608104b52e88ef00018a8773',
            create_time: 1619068085893,
            create_uid: '607e63e021576100016eded3',
            title: '向党报告',
            img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f034dbfa-a6f0-4bce-912d-5425bd5fbadf/ef4c03d2-b3d8-49c4-a3d3-8c3761b88c7a.png',
            type: '页面',
            url: '/pages/goods/goods?id=1035',
          },
        ],
        loadmoreType: 'more',
        // 请求数据
        reqdata: {
          page: 1,
          rows: 8,
          sidx: 'sort',
          sord: 'asc',
        },
        scrollTop: 0,
      };
    },

    onPageScroll(e) {
      // 兼容iOS端下拉时顶部漂移
      if (e.scrollTop >= 0) {
        this.headerPosition = 'fixed';
      } else {
        this.headerPosition = 'absolute';
      }
      // this.scrollTop = e.scrollTop
      this.$refs.usetop.change(e.scrollTop);
    },
    //下拉刷新
    onPullDownRefresh() {
      this.loadData('refresh');
    },
    //加载更多
    onReachBottom() {
      this.loadData();
    },
    onReady: function (res) {},
    onLoad(options) {},
    methods: {
      // 加载报道，下拉刷新|上拉加载
      async loadData(type = 'add', loading) {
        if (this.loadmoreType === 'loading') {
          // 防止重复加载
          return;
        }

        if (loading == 1 || type == 'refresh') {
          // 从首页开始加载
          this.reqdata.page = 1;
        }

        // 没有更多直接返回
        if (type === 'add') {
          if (this.loadmoreType === 'nomore') {
            return;
          }
          // 加载中
          this.loadmoreType = 'loading';
        } else {
          // 更多
          this.loadmoreType = 'more';
        }
        this.$func.usemall.call('goods/list', this.reqdata).then(res => {
          if (res.code === 200) {
            if (res.datas && res.datas.goods.length > 0) {
              if (loading == 1 || type == 'refresh') {
                this.goodsDatas = [];
              }
              let _datas = [];
              res.datas.goods.forEach(row => {
                if (row.state === '销售中') {
                  _datas.push(row);
                }
              });
              // res.datas.goods.forEach((row) => {
              // 	if(res.res.datas.goods.state === '销售中')
              // });
              this.goodsDatas = [...this.goodsDatas, ..._datas];

              if (res.datas.goods.length >= this.reqdata.rows) {
                this.reqdata.page++;
                this.loadmoreType = 'more';
              } else {
                this.loadmoreType = 'nomore';
              }
            } else {
              this.loadmoreType = 'nomore';
            }
          }

          if (this.goodsDatas.length === 0) {
            this.empty = true;
          }

          if (loading == 1) {
            uni.hideLoading();
          } else if (type == 'refresh') {
            uni.stopPullDownRefresh();
          }
        });
      },
      // 搜索回调函数
      search() {
        console.log('home search');
      },
      // 跳转页面
      topage(item) {
        console.log('分类点击', item.url);
        if (item && item.type == '网页') {
          uni.navigateTo({
            url: `/pages/content/web?url=${item.url}`,
          });
        } else if (item && item.type == '页面') {
          uni.navigateTo({
            url: `${item.url}`,
          });
        } else if (item && item.type == '标签') {
          uni.switchTab({
            url: `${item.url}`,
          });
        } else {
          if (item.id)
            this.$api.togoods({
              id: item._id,
            });
        }
      },
    },
  };
</script>

<style lang="scss">
  .report-img {
    .container {
      width: 750rpx;
      height: 420rpx;

      .image {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      padding-left: 30rpx;
      color: #fff;
      background-color: #fc7575;
    }

    .tip {
      text-align: center;
    }
  }
</style>
