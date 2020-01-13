<template>
	<!-- 礼品详情页 -->
	<view class="container">
		<!--轮播图-->
		<view class="tui-banner-swiper" v-for="(item,index) in GiftList" :key="index">
			<swiper :autoplay="true" :interval="5000" :duration="150" :circular="true" :style="{height:scrollH + 'px'}" @change="bannerChange">
				<block v-for="(item,index) in turns" :key="index">
					<swiper-item :data-index="index" @tap.stop="previewImage">
						<image :src="imageUrl + item" class="tui-slide-image" :style="{height:scrollH+'px'}" />
					</swiper-item>
				</block>
			</swiper>
			<tui-tag type="translucent" shape="circleLeft" size="small">{{turnsIndex+1}}/{{turns.length}}</tui-tag>
		<!--轮播图-->
		<!--礼品信息-->
			<view class="tui-pro-detail">
				<view class="tui-product-title tui-border-radius">
					<view class="tui-pro-pricebox tui-padding">
						<view class="tui-pro-price" >
							￥<text class="tui-price">{{!click?defaultPrice:price}}</text>
							<!-- <tui-tag class="tui-btn" size="small" :plain="true" type="high-green" shape="circle">新品</tui-tag> -->
						</view>
					</view>
					<view class="tui-pro-titbox">
						<view class="tui-pro-title">虚拟币价格：{{!click?defaultCoin:coin}}</view>
						<view class="tui-pro-title">所属分类：{{item.category}}</view>
						<view class="tui-pro-title">剩余库存：{{!click?defaultNum:num}}</view>
					</view>
				</view>
				<view class="tui-basic-info tui-mtop tui-radius-all">
					<view class="tui-list-cell">
						<view class="tui-bold tui-cell-title">已选</view>
						<view class="tui-selected-box">{{!click?defaultName:name}}【{{!click?defaultContent:content}}】</view>
						<tui-icon name="more-fill" :size="20" class="tui-right" color="#666" @tap="showPopup"></tui-icon>
					</view>
					<view class="tui-list-cell tui-last">
						<view class="tui-bold tui-cell-title">说明</view>
						<view class="tui-selected-box" v-html="item.content"></view>
					</view>
				</view>
			</view>
        </view>
		<!--礼品信息-->
		<!--底部操作栏-->
		<view class="tui-operation">
			<view class="tui-operation-left tui-col-5 tui-btnbox-6">
				<tui-button type="warning" shape="circle" size="mini" @click="showPopup">查看更多规格</tui-button>
			</view>
			<view class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4" >
				<view class="tui-flex-1">
					<tui-button type="danger" shape="circle" size="mini" @click="submit(giftId)">兑换礼品</tui-button>
				</view>
				<view class="tui-flex-1">
					<tui-button type="warning" shape="circle" size="mini" @click="submit">购买礼品</tui-button>
				</view>
			</view>
		</view>
		 <!--底部操作栏-->
		<!--底部选择层-->
		<tui-bottom-popup :show="popupShow" @close="hidePopup">
			<view class="tui-popup-box">
				<view class="tui-product-box tui-padding">
					<image :src="imageUrl + picture" class="tui-popup-img"></image>
					<view class="tui-popup-price" v-for="(item,index) in Specifications" :key="index">
						<view v-if = "index == dynamic">
							<view class="tui-amount tui-bold">￥{{item.price}}</view>
							<view class="tui-number">虚拟币价格:{{item.coin}}</view>
							<view class="tui-number">编号:{{item.id}}</view>
							<view class="tui-number">库存:{{item.num}}</view>
						</view>
					</view>
				</view>
				<scroll-view scroll-y class="tui-popup-scroll">
					<view class="tui-scrollview-box">
						<view class="tui-text">
							<view class="tui-bold tui-attr-title">类型</view>
						</view>
						<view class="tui-attr-box" v-for="(item,index) in Specifications" :key="index">
							<view class="tui-attr-item" :class="{colorChange:index==dynamic}" @click="getType(index,item)">
								<view>
									{{item.name}}
								</view>
								<view class="tui-padding">
									<view class="tui-sub-title tui-size">{{item.content}}</view>
								</view>
							</view>
						</view>
						<!-- <view class="tui-number-box tui-bold tui-attr-title">
							<view class="tui-attr-title">数量</view>
							<tui-numberbox :max="10" :min="1" :value="value" @change="change"></tui-numberbox>
						</view> -->
					</view>
				</scroll-view>
				<view class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">
					<view class="tui-flex-1">
						<tui-button type="red" shape="circle" size="mini" @click="hidePopup">加入购物车</tui-button>
					</view>
					<view class="tui-flex-1">
						<tui-button type="red" shape="circle" size="mini" @click="hidePopup">确定</tui-button>
					</view>
				</view>
				<view class="tui-icon tui-icon-close-fill tui-icon-close" style="color: #999;font-size:20px" @tap="hidePopup"></view>
			</view>
		</tui-bottom-popup>
		<!--底部选择层-->

	</view>
</template>

<script>
	import tuiIcon from "@/components/gift/icon"
	import tuiTag from "@/components/gift/tag"
	import tuiBadge from "@/components/gift/badge"
	import tuiNomore from "@/components/gift/nomore"
	import tuiButton from "@/components/gift/button"
	import tuiTopDropdown from "@/components/gift/top-dropdown"
	import tuiBottomPopup from "@/components/gift/bottom-popup"
	import tuiNumberbox from "@/components/gift/numberbox"
	import { look_GiftDetail,look_GiftSpecifications } from '@/api/giftcenter';
	export default {
		components: {
			tuiIcon,
			tuiTag,
			tuiBadge,
			tuiNomore,
			tuiButton,
			tuiTopDropdown,
			tuiBottomPopup,
			tuiNumberbox
		},
		data() {
			return {
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				turnsIndex: 0,
				popupShow: false,
				value: 1,
				collected: false,
				click:false,
				id:'',
			    giftId:[],
				dynamic:0,
				GiftList:[],
				Specifications:[],
				picture:[],
				price:'',
				coin:'',
				num :'',
				name :'',
				content:'',
				turns:[],
				Image:[],
				imageUrl:'',
				defaultPrice:'',
				defaultNum:'',
				defaultCoin:'',
				defaultName:'',
				defaultContent:'',
			}
		},
		onLoad: function(options) {
			let obj = {};
			this.id = options.id ;
			setTimeout(() => {
				uni.getSystemInfo({
					success: (res) => {
						this.width = obj.left || res.windowWidth;
						this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
						this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
						this.scrollH = res.windowWidth
						
					}
				})
			}, 50)
			this.getGiftList();
			this.getGiftSpecifications();
		},
		methods: {
			//获取礼品列表
			getGiftList(){
			    look_GiftDetail({product_id:this.id}).then(({ data }) =>{
				    if(data.status == 0){
						this.GiftList = [...data.msg];
						this.GiftList.map((item,index) =>{
							this.picture = item.picture;
							this.turns = item.turns;
							this.turns.map((imageItem,index)=>{
								let image = this.$store.state.BaseUrl + imageItem;
								this.Image.push(image)
							})	
						});
						this.imageUrl = this.$store.state.BaseUrl
				    }  
			    })
			},
			//获取礼品规格
			getGiftSpecifications(){
				look_GiftSpecifications({product_id:this.id}).then(({ data }) =>{				 
					if(data.status == 0){
						console.log(data)
						this.Specifications = [...data.msg];
						this.giftId = this.Specifications[0].id;
						this.defaultPrice = this.Specifications[0].price;
						this.defaultNum = this.Specifications[0].num;
						this.defaultCoin = this.Specifications[0].coin;
						this.defaultName = this.Specifications[0].name;
						this.defaultContent = this.Specifications[0].content;
					}
				})
			},
			//类型：点击添加字体颜色，其他的删除class名称
			getType: function (index,item) {
				// console.log(index);
				// console.log(item);
				this.click = true;
				this.dynamic = index;
				this.giftId = item.id;
				this.price = item.price;
				this.coin = item.coin;
				this.num = item.num;
				this.name = item.name;
				this.content = item.content;
			},
			//轮播图切换
			bannerChange: function(e) {
				this.turnsIndex = e.detail.current
			},
			//点击查看轮播图图片
			previewImage: function(e) {
				let index = e.currentTarget.dataset.index;
				uni.previewImage({
					current: this.Image[index],
					urls: this.Image,
				})
			},
			//显示底部弹出框
			showPopup: function() {
				this.popupShow = true;
			},
			//隐藏底部弹出框
			hidePopup: function() {
				this.popupShow = false;
			},
			change: function(e) {
				this.value = e.value
			},
			submit(id){
				this.popupShow = false
				if(this.click == true){
					uni.navigateTo({
						url: "../giftcenter/submit?id="+id+"&price="+this.price+"&name="+this.name+
							"&content="+this.content+"&picture="+this.picture
					})
				} else {
					uni.navigateTo({
						url: "../giftcenter/submit?id="+id+"&price="+this.defaultPrice+"&name="+this.defaultName+
						    "&content="+this.defaultContent+"&picture="+this.picture
					})
				}
			},
		},
	}
</script>

<style>
	/* icon 也可以使用组件*/
	@import "../../../hybrid/icon.css";

	page {
		background: #f7f7f7;
	}

	.container {
		padding-bottom: 110rpx;
	}
    .colorChange {
		background: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
		border-radius: 40rpx;
		border: 1rpx solid #e41f19;
	}
	.tui-icon {
		border-radius: 16px;
	}


	.tui-icon-back {
		height: 32px !important;
		width: 32px !important;
		display: block !important;
	}

	.tui-header-icon .tui-icon-more-fill {
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;
		display: block !important;
	}

	.tui-banner-swiper {
		position: relative;
	}

	.tui-banner-swiper .tui-tag-class {
		position: absolute;
		color: #fff;
		top: 10rpx;
		right: 0;
		
	}

	.tui-slide-image {
		width: 100%;
		display: block;
	}

	/*内容 部分*/

	.tui-padding {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-size {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-border-radius {
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		overflow: hidden;
	}

	.tui-radius-all {
		border-radius: 24rpx;
		overflow: hidden;
	}

	.tui-mtop {
		margin-top: 26rpx;
	}

	.tui-pro-detail {
		box-sizing: border-box;
		color: #333;
	}

	.tui-product-title {
		background: #fff;
		padding: 30rpx 0;
	}

	.tui-pro-pricebox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ff201f;
		font-size: 36rpx;
		font-weight: bold;
		line-height: 44rpx;
	}

	.tui-pro-price {
		display: flex;
		align-items: center;
	}

	.tui-pro-price .tui-tag-class {
		transform: scale(0.7);
		/* transform-origin: center center; */
		line-height: 24rpx;
		font-weight: normal;
		margin-left: 10upx;
		margin-top: 500upx;
	}

	.tui-price {
		font-size: 58rpx;
	}

	.tui-pro-titbox {
		font-size: 32rpx;
		font-weight: 500;
		position: relative;
		padding: 0 150rpx 0 30rpx;
		box-sizing: border-box;
	}

	.tui-pro-title {
		padding-top: 20rpx;
		display:flex;
	}

	.tui-sub-title {
		padding: 20rpx 0;
	}

	.tui-list-cell {
		position: relative;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 36rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-right {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-list-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 126rpx;
	}

	.tui-last::after {
		border-bottom: 0 !important;
	}

	.tui-cell-title {
		width: 100rpx;
		padding-right: 30rpx;
		flex-shrink: 0;
	}

	.tui-basic-info {
		background: #fff;
	}

	/*底部操作栏*/

	.tui-col-7 {
		width: 58.33333333%;
	}

	.tui-col-5 {
		width: 41.66666667%;
	}

	.tui-operation {
		width: 100%;
		height: 100rpx;
		/* box-sizing: border-box; */
		background: rgba(255, 255, 255, 0.98);
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
		bottom: 0;
		left: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-operation-left {
		display: flex;
		align-items: center;
		margin-top:13upx;
		margin-left:20upx;
	}

	.tui-operation-right {
		height: 100rpx;
		/* box-sizing: border-box; */
		padding-top: 0;
	}

	.tui-right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-btnbox-4 .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28rpx !important;
	}

	.tui-operation .tui-badge-class {
		position: absolute;
		top: -6rpx;
		/* #ifdef H5 */
		transform: translateX(50%)
			/* #endif  */
	}

	.tui-flex-1 {
		flex: 1;
	}

	/*底部操作栏*/

	/*底部选择弹层*/

	.tui-popup-box {
		position: relative;
		padding: 30rpx 0 100rpx 0;
	}

	.tui-popup-btn {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.tui-popup-btn .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28rpx !important;
	}

	.tui-icon-close {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}

	.tui-product-box {
		display: flex;
		align-items: flex-end;
		font-size: 24rpx;
		padding-bottom: 30rpx;
	}

	.tui-popup-img {
		height: 200rpx;
		width: 300rpx;
		border-radius: 24rpx;
		display: block;
	}

	.tui-popup-price {
		padding-left: 20rpx;
		padding-bottom: 8rpx;
	}

	.tui-amount {
		color: #ff201f;
		font-size: 36rpx;
	}

	.tui-number {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 12rpx;
		color: #999;
	}

	.tui-popup-scroll {
		height: 600rpx;
		font-size: 26rpx;
	}

	.tui-scrollview-box {
		padding: 0 30rpx 60rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-attr-title {
		padding: 10rpx 0;
		color: #333;
	}

	.tui-attr-box {
		font-size: 0;
		padding: 20rpx 0;
	}

	.tui-attr-item {
		max-width: 100%;
		min-width: 200rpx;
		height: 64rpx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;
		padding: 0 26rpx;
		box-sizing: border-box;
		border-radius: 32rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		font-size: 26rpx;
	}

	.tui-number-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0 30rpx 0;
		box-sizing: border-box;
	}

	/*底部选择弹层*/
</style>
