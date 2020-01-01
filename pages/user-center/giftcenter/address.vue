<template>
	<!--收货地址-->
	<view class="tui-safe-area">
		<view class="tui-address">
			<block v-for="(item,index) in addressList" :key="index">
				<tui-list-cell class="tui-address-container" padding="0">
					<view class="tui-address-flex" @tap = "confirm(item.id)">
						<view>
							<view class="tui-address-main">
								<view class="tui-address-name tui-ellipsis">{{name}}</view>
								<view class="tui-address-tel">{{item.phone}}</view>
							</view>
							<view class="tui-address-detail">
								<text>{{item.address}}</text>
							</view>
						</view>
					</view>
					<view class="tui-address-item" @tap = "editAddress(item.id)">|编辑</view>
				</tui-list-cell>
			</block>
		</view>
		<!-- 新增地址 -->
		<view class="tui-address-new">
			<view height="88rpx" @tap="createAddr">+ 新增收货地址</view>
		</view>
	</view>
</template>

<script>
	import tuiListCell from "@/components/gift/list-cell"
	import { Look_Address} from "@/api/receiptAddress"
	export default {
		components: {
			tuiListCell
		},
		data() {
			return {
				addressList: [],
				name:'',
				id:''
			}
		},
		onLoad: function() {
            this.lookAddress();
		},
		onShow: function() {},
		methods: {
			createAddr() {
				uni.navigateTo({
					url: "../giftcenter/createAddress"
				})
			},
			lookAddress(){
				Look_Address().then(({ data }) =>{
					if(data.status == 0){
						console.log(data)
						this.addressList = [...data.msg]
						this.addressList.map((item,index)=>{
							this.name = item.user.name;
							this.id = item.id;
						})
					}
				})
			},
			editAddress(id){
				uni.navigateTo({
					url: "../giftcenter/editAddress?id="+id
				})
			},
			confirm(id){
				uni.navigateTo({
					url: "../giftcenter/submit?id="+id
				})
			}
		}
	}
</script>

<style>
	.tui-address {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 160rpx;
	}
	.tui-address-container{
		display:flex;
		justify-content: space-between;
	}
	.tui-address-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width:86%;
		white-space: pre-line;
	}
    .tui-address-item{
		padding-left:20upx;
		font-size:28upx;
		color: #bfbfbf;
	}
	.tui-address-main {
		width: 100%;
		height: 70upx;
		display: flex;
		font-size: 30upx;
		line-height: 80upx;
		padding-left: 25upx;
	}

	.tui-address-name {
		height: 60rpx;
	}

	.tui-address-tel {
		padding-left: 15upx;
		padding-top:2upx;
		font-size:28upx;
		color: #bfbfbf;
	}

	.tui-address-detail {
		font-size: 30upx;
		word-break: break-all;
		padding-bottom: 25rpx;
		padding-left: 25rpx;
		padding-right: 20rpx;
	}

	.tui-address-label {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #e41f19;
		border-radius: 6rpx;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: center center;
		margin-right: 6rpx;
	}

	.tui-address-img {
		width: 36rpx;
		height: 36rpx;
	}

	.tui-address-new {
		width: 90%;
		position: fixed;
		bottom: 10upx;
		z-index: 9;
		box-sizing: border-box;
		text-align: center;
		padding: 24upx;
		border-radius: 20upx;
		color:#FFFFFF;
		font-weight: bold;
		margin-left:33upx;
		background-color:#DF5000;
	}

	.tui-safe-area {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
