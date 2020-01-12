<template>
	<!--确认订单-->
	<view class="container">
		<view class="tui-box">
			<tui-list-cell :arrow="true" :last="true" :radius="true" @tap="chooseAddr">
				<view class="tui-address">
					<view v-if="show">
						<view class="tui-userinfo">
							<text class="tui-name">{{(username!='')?username:defaultName}}  {{(mobile!='')?mobile:defaultMobile}}</text> 
						</view>
						<view class="tui-addr">
							<text>{{(address!='')?address:defaultAddress}}</text>
						</view>
					</view>
					<view class="tui-none-addr" v-else>
						<text>选择收货地址</text>
					</view>
				</view>
				<view class="tui-bg-img"></view>
			</tui-list-cell>
			<view class="tui-top tui-goods-info">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						商品信息
					</view>
				</tui-list-cell>
				<block>
					<tui-list-cell :hover="false" padding="0">
						<view class="tui-goods-item">
							<image :src="imageUrl + picture" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{giftname}}</view>
								<view class="tui-goods-attr">{{content}}</view>
							</view>
							<view class="tui-price-right">
								<view>￥{{price}}</view>
								<!-- <view>x2</view> -->
							</view>
						</view>
					</tui-list-cell>
				</block>
				<tui-list-cell :hover="false">
					<view class="tui-padding tui-flex">
						<view>商品总额</view>
						<view>￥{{price}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :last="true">
					<view class="tui-padding tui-flex tui-total-flex">
						<view class="tui-flex-end tui-color-red">
							<view class="tui-black">合计： </view>
							<view class="tui-size-26">￥</view>
							<view class="tui-price-large">{{price}}</view>
						</view>
					</view>
				</tui-list-cell>
			</view>
		</view>
		<view class="tui-safe-area"></view>
		<view class="tui-tabbar">
			<view class="tui-flex-end tui-color-red tui-pr-20">
				<view class="tui-black">实付虚拟币: </view>
				<view class="tui-size-26">￥</view>
				<view class="tui-price-large">{{price}}</view>
			</view>
			<view class="tui-pay">
				<view class="tui-btnpay" @click="btnPay">确认支付</view>
			</view>
		</view>

	</view>
</template>

<script>
	import tuiButton from "@/components/gift/button"
	import tuiListCell from "@/components/gift/list-cell"
	import tuiBottomPopup from "@/components/gift/bottom-popup"
	import {Look_Address} from "@/api/receiptAddress"
	import {Create_Pay} from "@/api/pay"
	import {Create_Order} from "@/api/giftcenter"
	export default {
		components: {
			tuiButton,
			tuiListCell,
			tuiBottomPopup
		},
		data() {
			return {
				hasCoupon: true,
				insufficient: false,
				username:'',
				mobile:'',
				address:'',
				defaultName:'',
				defaultMobile:'',
				defaultAddress:'',
				id:'',
				show:false,
				userInfo:[],
				price:'',
				giftname:'',
				content:'',
				picture:'',
				imageUrl:'',
				addressId:'',
				adrId:'',
				way:2,
				number:1,
				giftList:''
			}
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			}
		},
		methods: {
			chooseAddr() {
				uni.navigateTo({
					url: "../giftcenter/address"
				})
			},
			btnPay() {
				let data = {
					instance:4,
					entity:5,
					type:1,
					way:2,
					money:10,
					inner_order:12111212,
					outer_order:12121221
				}
				Create_Pay(data).then(({data}) =>{
					if(data.status == 0){
						console.log(data)
						uni.showToast({
							title: '支付成功',
							duration: 2000
						});
						uni.navigateTo({
							url: "../giftcenter/paySuccess"
						})
					}
				})
			},
			lookAddress(){
				Look_Address().then(({ data }) =>{
					if(data.status == 0){
						[...data.msg].map((item,index)=>{
							if(item.default == 1){
								this.show = true,
								this.defaultName = item.user.name,
								this.defaultMobile = item.phone,
								this.defaultAddress = item.address,
								this.addressId = item.id
							}	
						})
					}  
				})
			},
			CreateOrder(){
				let data = {
					specifications_id:this.id,
					number:this.number,
					money:this.price,
					way:this.way,
					address_id:this.addressId,
					order_number:12345678
				}
				Create_Order(data).then(({ data }) =>{
					console.log(data.msg)
					if(data.status == 0){
						console.log("订单创建成功")
					} else {
						console.log(data.msg)
					}
				})
			},
			giftInfo(giftList){
				console.log(giftList);
				this.id = giftList.id;
				this.price = giftList.price;
				this.content = giftList.content;
				this.picture = giftList.picture;
				this.giftname = giftList.name;
				this.imageUrl = this.$store.state.BaseUrl;
				//同步存储已选礼品信息
				try {
				    uni.setStorageSync('storage_key',giftList);
				} catch (e) {
				}
			},
			user(options){
				this.adrId = options.id;
				this.username = options.username;
				this.address = options.address;
				this.mobile = options.mobile;
			}
		},
		onLoad: function (options) { //option为object类型，会序列化上个页面传递的参数
			console.log(options);//打印出上个页面传递的id。
			this.giftInfo(options);
			this.lookAddress();
			this.user(options);
		},
		onShow(){
			this.gift();
		}
	}
</script>

<style>
	.container {
		padding-bottom: 98rpx;
	}

	.tui-box {
		padding: 20rpx 0 118rpx;
		box-sizing: border-box;
	}

	.tui-address {
		min-height: 80rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
		position: relative;
	}

	.tui-userinfo {
		font-size: 30rpx;
		font-weight: 500;
		line-height: 30rpx;
		padding-bottom: 12rpx;
	}

	.tui-name {
		padding-right: 40rpx;
	}

	.tui-addr {
		font-size: 24rpx;
		word-break: break-all;
		padding-right: 25rpx;
	}

	.tui-addr-tag {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #EB0909;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
		border-radius: 6rpx;
	}

	.tui-bg-img {
		position: absolute;
		width: 100%;
		height: 8rpx;
		left: 0;
		bottom: 0;
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAAECAMAAADszM6/AAAAOVBMVEUAAAAVqfH/fp//vWH/vWEVqfH/fp8VqfH/fp//vWEVqfH/fp8VqfH/fp//vWH/vWEVqfH/fp//vWHpE7b6AAAAEHRSTlMA6urqqlVVFRUVq6upqVZUDT4vVAAAAEZJREFUKM/t0CcOACAQRFF6r3v/w6IQJGwyDsPT882IQzQE0E3chToByjG5LwMgLZN3TQATmdypCciBya0cgOT3/h//9PgF49kd+6lTSIIAAAAASUVORK5CYII=") repeat;
	}

	.tui-top {
		margin-top: 20rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.tui-padding {
		box-sizing: border-box;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}

	.tui-flex {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
	}
	.tui-total-flex{
		justify-content: flex-end;
	}

	.tui-color-red,
	.tui-invoice-text {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-black {
		color: #222;
		line-height: 30rpx;
	}

	.tui-size-26 {
		font-size: 26rpx;
		line-height: 26rpx;
	}

	.tui-price-large {
		font-size: 34rpx;
		line-height: 32rpx;
		font-weight: 600;
	}

	.tui-flex-end {
		display: flex;
		align-items: flex-end;
		padding-right: 0;
	}

	.tui-tabbar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 26rpx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 999;
	}
	
	.tui-pr-20 {
		padding-right: 20rpx;
	}

	.tui-none-addr {
		height: 80rpx;
		padding-left: 5rpx;
		display: flex;
		align-items: center;
	}

	.tui-pay {
		padding-right: 25rpx;
	}
   
    .tui-btnpay {
    	width: 180upx;
    	bottom: 10upx;
    	z-index: 9;
		padding-top:20upx;
    	box-sizing: border-box;
    	text-align: center;
    	border-radius: 30upx;
		height:80upx;
    	color:#FFFFFF;
		font-size:30upx;
    	background-color:#DF5000;
    }
	
	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
