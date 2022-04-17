<template>
	<view class="box-sizing-b w-full">
		<!-- 01. 头部组件 -->
		<use-header :search-tip="searchTip" :search-auto="searchAuto" @search="search"></use-header>

		<!-- 02. 轮播区 -->
		<view class="swiper-area pos-r" v-if="swiperDatas && swiperDatas.length > 0">
			<!-- 轮播组件 -->
			<swiper class="swiper w-full" autoplay indicator-dots indicator-color="#f7f7f7" indicator-active-color="#FEAA30">
				<swiper-item class="swiper-item padding-sm wh-full box-sizing-b" v-for="(item, index) in swiperDatas" :key="index">
					<view class="wh-full" @click.stop="topage(item)"><image class="border-radius wh-full" mode="aspectFill" :lazy-load="true" :src="item.img" /></view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 03. 分类区1 -->
		<view class="category1-area dflex-c dflex-wrap-w" v-if="category1Datas && category1Datas.length > 0">
			<view class="category1-item dflex dflex-flow-c margin-bottom-sm" v-for="(item, index) in category1Datas" :key="index" @click="topage(item)">
				<image class="margin-bottom-xs" :lazy-load="true" :src="item.img"></image>
				<text class="tac clamp">{{ item.name }}</text>
			</view>
		</view>
		<view class="gap"></view>

		<!-- 03. 分类区2 -->
		<view class="category2-area dflex-c dflex-wrap-w" v-if="category2Datas && category2Datas.length > 0">
			<view class="category2-item dflex dflex-flow-c" v-for="(item, index) in category2Datas" :key="index" @click="topage(item)">
				<image :lazy-load="true" :src="item.img"></image>
			</view>
		</view>
		<view class="gap"></view>

		<!-- 04. 限时精选 -->
		<use-list-title title="限时拍卖" size="32" fwt="600" color="#333" iconfont="icondaishouhuo-" @goto="limit"></use-list-title>
		<view class="limit-area">
			<scroll-view class="padding-lr" scroll-x>
				<view class="dflex padding-bottom">
					<view class="item margin-right-sm" v-for="(item, index) in goodsLimitDatas" :key="index" @click="togoods(item)">
						<image class="border-radius-xs" mode="aspectFill" :lazy-load="true" :src="item.img"></image>
						<text class="title clamp padding-bottom-xs">{{ item.name }}</text>
						<text class="price">{{ item.price / 100 }}</text>
						<text class="m-price">{{ item.market_price / 100 }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="gap"></view>

		<!-- 05. 热门推荐 -->
		<use-hot-goods :datas="goodsHotDatas" autoload="none" title="热门作品"></use-hot-goods>

		<!-- 置顶 -->
		<use-totop ref="usetop" :style="{ marginBottom: navHeight + 'px' }"></use-totop>

		<!-- #ifdef MP-WEIXIN -->
		<official-account @bindload="wxOAccountLoad" @binderror="wxOAccountErr"></official-account>
		<!-- #endif -->
	</view>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState(['member'])
	},
	data() {
		return {
			env: {},

			// 头部参数
			searchAuto: !0,
			searchTip: '请输入搜索关键字',

			// 轮播区
			swiperDatas: [
				{
					_id: '6081038ce01ac80001db768d',
					create_time: 1619067788539,
					create_uid: '607e63e021576100016eded3',
					img: '../../static/images/swiper/IMG_2316.png',
					is_delete: 0,
					remark: '',
					sort: 1,
					state: '启用',
					type: '页面',
					url: '/pages/home',
					version: 1
				},
				{
					_id: '608104842e88ef00018a86e1',
					create_time: 1619068036767,
					create_uid: '607e63e021576100016eded3',
					img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7e00db99-ad65-4b9f-a74b-61bccb92b124/d462f254-a1a6-4225-992c-f0658f6d4e0d.jpg',
					is_delete: 0,
					remark: '官网',
					sort: 2,
					state: '启用',
					type: '网页',
					url: 'https://www.use-cloud.com',
					version: 1
				},
				{
					_id: '608104b52e88ef00018a8773',
					create_time: 1619068085893,
					create_uid: '607e63e021576100016eded3',
					img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7e00db99-ad65-4b9f-a74b-61bccb92b124/58b8a907-597d-4088-b030-3643b32d3537.jpg',
					is_delete: 0,
					remark: '',
					sort: 3,
					state: '启用',
					type: '页面',
					url: '/pages/goods/goods?id=1035',
					version: 1
				}
			],
			// 金刚区分类
			category1Datas: [
				{
					_id: '6083a669ff01b00001bb591e',
					cid: 0,
					create_time: 1619240553775,
					create_uid: '607e63e021576100016eded3',
					img: '../../static/images/home-category1/zpfl.png',
					is_delete: 0,
					name: '作品分类',
					remark: '',
					sort: 1,
					state: '启用',
					type: '标签',
					url: '/pages/tabbar/category',
					version: 1
				},
				{
					_id: '6083a6f6ff01b00001bb5a26',
					cid: '',
					create_time: 1619240694262,
					create_uid: '607e63e021576100016eded3',
					img: '../../static/images/home-category1/gyk.png',
					is_delete: 0,
					name: '公益课',
					remark: '',
					sort: 2,
					state: '启用',
					type: '页面',
					url: '/pages/video/video',
					version: 1
				},
				{
					_id: '6083a8fcff01b00001bb5e22',
					cid: null,
					create_time: 1619241212782,
					create_uid: '607e63e021576100016eded3',
					img: '../../static/images/home-category1/zpfl.png',
					is_delete: 0,
					name: '向党汇报',
					remark: '',
					sort: 3,
					state: '启用',
					type: '页面',
					url: '/pages/report/report',
					version: 1
				}
			],
			category2Datas: [
				{
					_id: '6083a669ff01b00001bb591e',
					cid: 0,
					create_time: 1619240553775,
					create_uid: '607e63e021576100016eded3',
					img: '../../static/images/home-category2/xyzp.png',
					is_delete: 0,
					name: '向党汇报',
					remark: '',
					sort: 1,
					state: '启用',
					type: '页面',
					url: '/pages/report/report',
					version: 1
				},
				{
					_id: '6083a6f6ff01b00001bb5a26',
					cid: '',
					create_time: 1619240694262,
					create_uid: '607e63e021576100016eded3',
					img: '../../static/images/home-category2/cslhb.png',
					is_delete: 0,
					name: '慈善龙虎榜',
					remark: '',
					sort: 2,
					state: '启用',
					type: '页面',
					url: '/pages/goods/goods-list?cid=60812f4e19a4150001b073b3',
					version: 1
				},
				{
					_id: '6083a8fcff01b00001bb5e22',
					cid: null,
					create_time: 1619241212782,
					create_uid: '607e63e021576100016eded3',
					img: '../../static/images/home-category2/jszp.png',
					is_delete: 0,
					name: '教师作品',
					remark: '',
					sort: 3,
					state: '启用',
					type: '页面',
					url: '/pages/goods/goods-list?cid=60812def3ef4cf0001e352a4',
					version: 1
				},
				{
					_id: '6083a911c0e66500010d69d1',
					cid: '',
					create_time: 1619241233754,
					create_uid: '607e63e021576100016eded3',
					img: '../../static/images/home-category2/axrd.png',
					is_delete: 0,
					name: '爱心热点',
					remark: '',
					sort: 4,
					state: '启用',
					type: '页面',
					url: '/pages/goods/goods-list?cid=60acfd68f6a39800017af20e',
					version: 1
				},
				{
					_id: '6083a925ce8d7d0001035b25',
					cid: '',
					create_time: 1619241253001,
					create_uid: '607e63e021576100016eded3',
					img: '../../static/images/home-category2/mskt.png',
					is_delete: 0,
					name: '名师课堂',
					remark: '',
					sort: 5,
					state: '启用',
					type: '页面',
					url: '/pages/goods/goods-list?cid=60ace07724957900014e7f4e',
					version: 1
				},
				{
					_id: '6083a93852027d00014aa76b',
					cid: '',
					create_time: 1619241272668,
					create_uid: '607e63e021576100016eded3',
					img: '../../static/images/home-category2/rmzp.png',
					is_delete: 0,
					name: '热门作品',
					remark: '',
					sort: 6,
					state: '启用',
					type: '页面',
					url: '/pages/goods/goods-list?cid=60812f29f61a74000134eee2',
					version: 1
				}
			],
			// 限时精选
			goodsLimitDatas: [],
			// 热门推荐
			goodsHotDatas: [],

			scrollTop: 0,
			navHeight: 0
		};
	},
	// 监听页面加载
	onLoad() {
		this.$api.get_env(res => {
			this.env = res;
			this.is_mp = this.env.is_mp;
			this.platform = this.env.platform;
			this.platform_icon = this.env.platform_icon;
			this.platform_name = this.env.platform_name;
		});
	},
	onPageScroll(e) {
		// this.scrollTop = e.scrollTop
		this.$refs.usetop.change(e.scrollTop);
	},
	// 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
	onShow() {
		this.loadData();
	},
	// 监听用户下拉刷新
	onPullDownRefresh() {
		this.loadData(() => {
			uni.stopPullDownRefresh();
		});
	},
	// 用户点击右上角分享
	// https://uniapp.dcloud.io/api/plugins/share?id=showsharemenu
	onShareAppMessage: function(ops) {
		let _this = this,
			mid = 0;

		if (_this.member && _this.member._id) {
			mid = _this.member._id;
		}

		return {
			title: '用云电商',
			path: `/pages/tabbar/home?mid=${mid}`,
			// imageUrl: 'https://mall-os-api.use-cloud.com/files/upload/image/20200408/200408115587860242.jpg',
			success: function(res) {
				// 转发成功
				console.log('转发成功', res);
			},
			fail: function(res) {
				// 转发失败
				console.log('转发失败', res);
			}
		};
	},

	methods: {
		// 加载数据
		async loadData(callback) {
			await this.$func.usemall
				.call('app/mp/home', {
					rows: 8
				})
				.then(res => {
					if (res.code === 200) {
						// 轮播图
						// this.swiperDatas = res.datas.carousel || [];
						// console.log(JSON.stringify(this.swiperDatas));
						// 分类导航
						// this.category1Datas = res.datas.category || [];
						// console.log(JSON.stringify(this.category1Datas));
						// 限时精选
						this.goodsLimitDatas = res.datas.limited || [];
						// 热门推荐
						this.goodsHotDatas = res.datas.hot || [];

						if (typeof callback === 'function') {
							// 数据加载完成回调函数
							callback();
						}

						// #ifdef H5 || MP-360
						// if (this.goodsLimitDatas.length > 0) {
						// 	this.$api.dom('.uni-scroll-view-content').children[0].style.width = (uni
						// 		.upx2px(260) * this.goodsLimitDatas.length) + 'px';
						// 	new this.$iscroll('.uni-scroll-view-content', {
						// 		scrollX: true,
						// 		click: true
						// 	});
						// }
						// #endif
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
					url: `/pages/content/web?url=${item.url}`
				});
			} else if (item && item.type == '页面') {
				uni.navigateTo({
					url: `${item.url}`
				});
			} else if (item && item.type == '标签') {
				uni.switchTab({
					url: `${item.url}`
				});
			} else {
				if (item.id)
					this.$api.togoods({
						id: item._id
					});
			}
		},
		// 限时精选 -> 商品详情
		togoods(item) {
			// 跳转商品详情
			this.$api.togoods({
				id: item._id
			});
		},
		// 限时精选
		limit() {
			// 跳转商品列表 - 限时精选类目
			this.$api.togoodslist({
				limited: 1
			});
		}
	},
	mounted() {
		// #ifdef H5 || MP-360
		this.navHeight = 50;
		// #endif
	}
};
</script>

<style lang="scss">
/* 轮播图区 */
.swiper-area {
	// padding: ;
	background-color: #feaa30;
	.swiper {
		height: 240rpx;
	}
}

/* 分类区1 */
.category1-area {
	padding: 30rpx 0 0rpx 0;

	.category1-item {
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		width: 30%;
	}

	image {
		width: 96rpx;
		height: 96rpx;
	}
}

/* 分类区2 */
.category2-area {
	padding: 10rpx 10rpx 0;

	.category2-item {
		width: 33.3%;
	}

	image {
		padding-bottom: 10rpx;
		width: 230rpx;
		height: 130rpx;
	}
}

/* 限时精选区 */
.limit-area {
	min-height: 240rpx;

	.item {
		width: 240rpx;

		image {
			width: 240rpx;
			height: 240rpx;
		}
	}
}
</style>
