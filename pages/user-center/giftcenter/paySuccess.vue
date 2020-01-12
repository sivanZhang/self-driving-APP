<template>
	<!--支付成功-->
	<view class="container">
		<view class="tui-bg"></view>
		<view class="tui-content">
			<view class="tui-form">
				<image src="/static/images/mall/img_recharge_success.png" class="tui-icon"></image>
				<view class="tui-title">订单已支付成功</view>
				<view class="tui-sub-title">非常感谢您兑换我们的礼品</view>
				<view class="tui-btn-box">
					<tui-button type="danger" size="mini" :plain="true" shape="circle" @click="go(1)">返回首页</tui-button>
					<tui-button type="danger" :shadow="true" size="mini" shape="circle" @click="go(2)">查看订单</tui-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiButton from "@/components/gift/button"
	export default {
		components: {
			tuiButton
		},
		data() {
			return {}
		},
		methods: {
			go(page) {
				if (page == 1) {
					uni.navigateTo({
						url: "../giftcenter/giftcenter"
					})
				} else {
					uni.navigateTo({
						url: '../giftcenter/my/myOrder'
					})
				}
			}
		}
	}
</script>

<style>
	.tui-bg {
		width: 100%;
		height: 260rpx;
		background: linear-gradient(20deg, #E41F19, #F34B0B);
		border-bottom-left-radius: 42rpx;
	}

	.tui-content {
		padding: 0 35rpx;
		box-sizing: border-box;
	}

	.tui-form {
		background: #fff;
		height: 500rpx;
		box-shadow: 0 10rpx 14rpx 0 rgba(0, 0, 0, 0.08);
		border-radius: 10rpx;
		margin-top: -160rpx;
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.tui-icon {
		width: 100rpx;
		height: 100rpx;
		display: block;
		margin-top: 60rpx;
	}

	.tui-title {
		font-size: 42rpx;
		line-height: 42rpx;
		padding-top: 28rpx;
	}

	.tui-sub-title {
		color: #666666;
		font-size: 28rpx;
		line-height: 28rpx;
		padding-top: 20rpx;
	}

	.tui-btn-box {
		width: 580rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding-top: 88rpx;
	}
</style>
