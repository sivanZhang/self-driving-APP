<template>
	<!--新建收货地址-->
	<view class="tui-addr-box">
		<form :report-submit="true">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input type="text" v-model="name" placeholder-class="tui-phcolor" class="tui-input" name="name" placeholder="请输入收货人姓名" maxlength="15"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input  type="number" v-model="mobile" placeholder-class="tui-phcolor" class="tui-input" name="mobile" placeholder="请输入收货人手机号码" maxlength="11"
					 pattern="[0-9]*" oninput="value=value.replace(/[^\d.]/g,'')"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货地址</view>
					<input  type="text" v-model="address" placeholder-class="tui-phcolor" class="tui-input" name="address" placeholder="请输入详细的收货地址" maxlength="50" />
				</view>
			</tui-list-cell>
			<!-- 保存地址 -->
			<view class="tui-addr-save">
				<view type="danger" height="88rpx" @tap="createAddress">保存收货地址</view>
			</view>
		</form>
	</view>
</template>

<script>
	import tuiListCell from "@/components/gift/list-cell"
	import tuiListView from "@/components/gift/list-view"
	import { Create_Address} from "@/api/receiptAddress"
	export default {
		components: {
			tuiListView,
			tuiListCell
		},
		data() {
			return {
				name:'',
				mobile:'',
				address:''
			}
		},
		methods: {
			createAddress(){
				let data = {
					address:this.address,
					phone:this.mobile,
					receiver:this.name
				}
				Create_Address(data).then(({ data }) =>{
					if(data.status == 0){
						uni.showToast({
							title: '地址添加成功',
							duration: 2000
						});
						uni.navigateTo({
							url: '../giftcenter/address'
						})
						
					}  
				})
			}
		}
	}
</script>

<style>
	.tui-addr-box {
		padding: 20rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 180rpx;
		font-size: 28rpx;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
	}

	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}
	.tui-cell-title{
		font-size: 28rpx;
	}
	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.9);
	}
	.tui-label-active{
		background: #E41F19;
		border-color:#E41F19;
		color: #fff;
	}
	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}

	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		padding: 24upx;
		margin-top: 150upx;
		width: 90%;
		bottom: 10upx;
		z-index: 9;
		box-sizing: border-box;
		text-align: center;
		border-radius: 20upx;
		color:#FFFFFF;
		font-weight: bold;
		margin-left:33upx;
		background-color:#DF5000;
	}
</style>
