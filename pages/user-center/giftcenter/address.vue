<template>
	<!--查看收货地址-->
	<view class="tui-safe-area">
		<view class="tui-address">
			<block v-for="(item,index) in addressList" :key="index">
				<tui-list-cell class="tui-address-container" padding="0">
					<uni-swipe-action>
						<uni-swipe-action-item :options="options" @click="onClick($event,item.id)" @change="change" :show="show">
						<view class="tui-address-flex" @tap = "confirm(item.id,item.receiver,item.phone,item.address)">
							<view>
								<view class="tui-address-main">
									<view class="tui-address-name tui-ellipsis">{{item.receiver}}</view>
									<view class="tui-address-tel">{{item.phone}}</view>
								</view>
								<view class="tui-address-detail">
									<view class="tui-address-label" v-if="item.default == 1">默认地址</view>
									<text>{{item.address}}</text>
								</view>
							</view>
						</view>
						<!-- <view class="tui-address-item" @tap = "editAddress(item.id)">|编辑</view> -->
						</uni-swipe-action-item>
					</uni-swipe-action>
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
	import uniSwipeAction from '@/components/swipe/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/swipe/uni-swipe-action-item.vue'
	import tuiListCell from "@/components/gift/list-cell"
	import { Look_Address,Delete_Address,} from "@/api/receiptAddress"
	export default {
		components: {
			tuiListCell,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				addressList: [],
				show:false,
				options:[
					{
						text: '删除',
						style: {
							backgroundColor: '#DF5000'
						}
					}, {
						text: '编辑',
						style: {
							backgroundColor:'#007aff'
						}
					},{
						text: '取消',
						style: {
							backgroundColor: '#bfbfbf'	
						}
					}
				  ]
			}
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
						this.addressList = [...data.msg]
					}
				})
			},
			editAddress(id){
				uni.navigateTo({
					url: "../giftcenter/editAddress?id="+id
				})
			},
			deleteAddress(id){
				var that = this;
				uni.showModal({
					content: '确定删除此地址吗？',
					confirmColor: "#FF0000",
					success: function(res) {
						if (res.confirm) {
							Delete_Address({
								method: "delete",
								ids:id
							}).then(({
								data
							}) => {
								if (data.status == 0) {
									uni.showToast({
										title: '删除成功',
										duration: 2000
									});
									that.lookAddress();
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			onClick(e,id){
				switch (e.index) {
					case 0:
						this.deleteAddress(id);
					break;
					case 1:
						this.editAddress(id);
					break;
					case 2:
						this.show = false;
					break;
				}
			},
			change(open){
			    console.log('当前开启状态：'+ open)
			},
			confirm(id,receiver,phone,address){
				uni.navigateTo({
					url: "../giftcenter/submit?id="+id+"&username="+receiver+"&mobile="+phone+"&address="+address
				})
			},
		},
		onLoad: function() {
		    this.lookAddress();
		},
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
		width:100%;
		white-space: pre-line;
		right:0;
	}
    .tui-address-item{
		right:0;
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
