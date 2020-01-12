<template>
	<!--我的礼品-->
	<view>
		<!--header-->
		<view class="tui-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="tui-header" :style="{paddingTop:top+'px', opacity:opcity}">
				我的
			</view>
		</view>
		<!--header-->
		<view class="tui-mybg-box">
			<image src="/static/image/mall/my/img_background.png" class="tui-my-bg" mode="widthFix"></image>
			<view class="tui-header-center">
				<image :src="imageUrl + picture" class="tui-avatar" @tap="href(3)"></image>
				<view class="tui-info">
					<view class="tui-nickname">{{username||UserInfo.phone}}<image src="/static/image/mall/my/icon_vip_3x.png" class="tui-img-vip"></image>
					</view>
					<view class="tui-explain">这家伙很懒…</view>
				</view>
			</view>
			<view class="tui-header-btm" @tap="href(5)">
				<view class="tui-btm-item" >
					<view class="tui-btm-num">25</view>
					<view class="tui-btm-text">收藏夹</view>
				</view>
				<view class="tui-btm-item">
					<view class="tui-btm-num">22</view>
					<view class="tui-btm-text">店铺关注</view>
				</view>
				<view class="tui-btm-item">
					<view class="tui-btm-num">3</view>
					<view class="tui-btm-text">喜欢的内容</view>
				</view>
				<view class="tui-btm-item">
					<view class="tui-btm-num">44</view>
					<view class="tui-btm-text">足迹</view>
				</view>
			</view>
		</view>
		<view class="tui-content-box">
			<view class="tui-box tui-order-box">
				<tui-list-cell :arrow="true" padding="0" :lineLeft="false" @click="href(4)">
					<view class="tui-cell-header">
						<view class="tui-cell-title">我的订单</view>
						<view class="tui-cell-sub">查看全部订单</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list">
					<view class="tui-order-item" @tap="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daifukuan_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red">1</view>
						</view>
						<view class="tui-order-text">待付款</view>
					</view>
					<view class="tui-order-item" @tap="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daifahuo_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red">1</view>
						</view>
						<view class="tui-order-text">待发货</view>
					</view>
					<view class="tui-order-item" @tap="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daishouhuo_3x.png" class="tui-order-icon"></image>
						</view>
						<view class="tui-order-text">待收货</view>
					</view>
					<view class="tui-order-item" @tap="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_pingjia_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red" v-if="false">12</view>
						</view>
						<view class="tui-order-text">评价</view>
					</view>
					<view class="tui-order-item" @tap="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_tuikuan_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red">2</view>
						</view>
						<view class="tui-order-text">退款/售后</view>
					</view>
				</view>
			</view>
			<!--加载loadding-->
			<tui-loadmore :visible="loadding" :index="3" type="red"></tui-loadmore>
		</view>
	</view>
</template>

<script>
	import tuiIcon from "@/components/gift/icon"
	import tuiButton from "@/components/gift/button"
	import tuiListCell from "@/components/gift/list-cell"
	import tuiDivider from "@/components/gift/divider"
	import tuiLoadmore from "@/components/gift/loadmore"
	import {search_users} from '@/api/usercenter'
	export default {
		components: {
			tuiIcon,
			tuiButton,
			tuiListCell,
			tuiDivider,
			tuiLoadmore
		},
		data() {
			return {
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0.5,
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				picture:'',
				username:'',
				imageUrl:''
			}
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			},
			isLogin() {
				return this.$store.state.estateToken || uni.getStorageSync('estateToken')
			}
		},
		methods: {
			href(page) {
				let url = "";
				switch (page) {
					case 1:
						break;
					case 2:
						url = "../set/set"
						break;
					case 3:
						url = "../userInfo/userInfo"
						break;
					case 4:
						url = "../my/myOrder"
						break;
					default:
						break;
				}
				if(url){
					uni.navigateTo({
						url: url
					})
				}
			},
			detail: function() {
				uni.navigateTo({
					url: '../../productDetail/productDetail'
				})
			},
			search() {
				if (this.isLogin) {
					this.user_id = this.$store.state.UserInfo.id;
					let data = this.user_id;
					search_users({
						userid: data
					}).then(({
						data
					}) => {
						if(data.status == 0){
							[...data.msg].map((item,index)=>{
								this.picture = item.thumbnail_portait;
								this.username = item.username;
							})
						}
					})
				}
			},
		},
		onLoad: function(options) {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth * 0.6
				}
			})
			this.imageUrl = this.$store.state.BaseUrl
			this.search();
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity)
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200)
		},
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.pageIndex == 4) {
				this.loadding = false;
				this.pullUpOn = false
			} else {
				let loadData = JSON.parse(JSON.stringify(this.productList));
				loadData = loadData.splice(0, 10)
				if (this.pageIndex == 1) {
					loadData = loadData.reverse();
				}
				this.productList = this.productList.concat(loadData);
				this.pageIndex = this.pageIndex + 1;
				this.loadding = false
			}
		}
	}
</script>

<style>
	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9998;
	}

	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* #ifndef MP */
	.tui-header-icon {
		position: fixed;
		top: 0;
		right: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 99999;
	}

	/* #endif */
	/* #ifdef MP */
	.tui-set-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	.tui-icon-box {
		position: relative;
	}

	.tui-icon-setup {
		margin-left: 8rpx;
	}

	.tui-badge {
		position: absolute;
		font-size: 24rpx;
		height: 32rpx;
		min-width: 20rpx;
		padding: 0 6rpx;
		border-radius: 40rpx;
		right: 10rpx;
		top: -5rpx;
		transform: scale(0.8) translateX(60%);
		transform-origin: center center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.tui-badge-red {
		background: #F74D54;
		color: #fff;
	}

	.tui-badge-white {
		background: #fff;
		color: #F74D54;
	}

	.tui-badge-dot {
		position: absolute;
		height: 12rpx;
		width: 12rpx;
		border-radius: 50%;
		right: -12rpx;
		top: 0;
		background: #F74D54;
	}

	.tui-mybg-box {
		width: 100%;
		height: 464rpx;
		position: relative;
	}

	.tui-my-bg {
		width: 100%;
		height: 464rpx;
		display: block;
	}

	.tui-header-center {
		position: absolute;
		width: 100%;
		height: 128rpx;
		left: 0;
		top: 120rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-avatar {
		flex-shrink: 0;
		width: 128rpx;
		height: 128rpx;
		display: block;
	}

	.tui-info {
		width: 60%;
		padding-left: 30rpx;

	}

	.tui-nickname {
		font-size: 30rpx;
		font-weight: 500;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-img-vip {
		width: 56rpx;
		height: 24rpx;
		margin-left: 18rpx;
	}

	.tui-explain {
		width: 80%;
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
		opacity: 0.75;
		padding-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-btn-edit {
		flex-shrink: 0;
		padding-right: 22rpx;
	}

	.tui-header-btm {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 280rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
	}

	.tui-btm-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tui-btm-num {
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
	}

	.tui-btm-text {
		font-size: 24rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}

	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		top: -72rpx;
		z-index: 10;
	}

	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-order-box {
		height: 208rpx;
	}

	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.tui-cell-sub {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
		padding-right: 28rpx;
	}

	.tui-order-list {
		width: 100%;
		height: 134rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

	}

	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: #666;
		padding-top: 4rpx;
	}

	.tui-tool-text {
		font-size: 24rpx;
	}

	.tui-order-icon {
		width: 56rpx;
		height: 56rpx;
		display: block;
	}

	.tui-assets-box {
		height: 178rpx;
		margin-top: 20rpx;
	}

	.tui-assets-list {
		height: 84rpx;
	}

	.tui-assets-num {
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
		position: relative;
	}

	.tui-assets-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #666;
		padding-top: 6rpx;
	}

	.tui-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 30rpx;
	}

	.tui-tool-item {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-tool-icon {
		width: 64rpx;
		height: 64rpx;
		display: block;
	}

	.tui-badge-icon {
		width: 66rpx;
		height: 30rpx;
		position: absolute;
		right: 0;
		transform: translateX(88%);
		top: -15rpx;
	}

	/*为你推荐*/
	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		padding-top: 18rpx;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
</style>

