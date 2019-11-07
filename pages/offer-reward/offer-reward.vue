<template>
	<!-- 悬赏功能 -->
	<view id="offer-reward">
		<view class="header">
			<view class="reward">悬赏大厅</view>
			<view class="line">路线/攻略</view>
		</view>
		<block>
			<view class="container section">
				<view class="detail">
					<view class="content">
						<view class="name">
							<span style="font-weight: bold;">路线：</span>西安——贵州
						</view>
						<view style="font-size: 32upx;">
							<span style="font-weight: bold;">时间：</span>2019/10/1-2019/11/30
						</view>
						<block >
							<view class="forwardContent">
								<view>悬赏内容：帮忙制作旅游攻略</view>
							</view>
						</block>
						<view class="footer">
							<view class="footer-left">
								<image src="../../static/image/p10.jpg"></image>
								<view>张三</view>
							</view>
							<view class="footer-right">
								<image src="../../static/icons/money.png"></image>
								<view>张三</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- //弹出悬赏窗口 -->
		<uni-popup ref="popup" type="right" :custom="true" :show="true">
			<view class="uni-logout">
				<view @tap="target1('/pages/user-center/message/groupchat')">我的悬赏</view>
			</view>
			<view class="uni-logout">
				<view @tap="target1('/pages/user-center/message/groupchat')">发布悬赏</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {

			}
		},
		methods: {

		},
		//发起群聊
		onNavigationBarButtonTap(val) {
			console.log(val.index);
			if (val.index == 0) { //添加
				console.log("第一个按钮");
				this.$refs.popup.open()
			};
			if (val.index == 1) { //搜索
				// uni.reLaunch({
				// 	url:"/pages/joinPartner/creatPartner"
				// })
				console.log("第二个按钮");
			};
			if (val.index == 2) {
				// uni.reLaunch({
				// 	url:"/pages/joinPartner/creatPartner"
				// })
				console.log("第三个按钮");
			}
		}
	}
</script>

<style lang="scss">
	#offer-reward {
		.header {
			font-size: 32upx;
			display: flex;
			align-items: center;

			.reward {
				display: flex;
				justify-content: center;
				padding: 30upx 20upx;
				width: 50%;
				border-right: 1px solid #c8c8cc;
				border-bottom: 1px solid #c8c8cc;
				border-top: 1px solid #c8c8cc;
			}

			.line {
				display: flex;
				justify-content: center;
				padding: 30upx 20upx;
				width: 50%;
				border-bottom: 1px solid #c8c8cc;
				border-top: 1px solid #c8c8cc;
			}
		}

		.section {
			padding-top: 25upx;

			.detail {
				display: flex;
				justify-content: space-between;
				padding: 20.833rpx;
				min-height: 212.5upx;
				border: 2.083upx solid #ececec;
				box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
				font-size: 27.083upx;

				.content {
					flex: 0 1 100%;
					width: 0;
					font-size: 27.083upx;

					.name {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						line-height: 1.8;
						font-size: 32upx;
					}

					.forwardContent{
						font-size: 32upx;
						padding: 10upx 0upx;
						&>view{
							padding: 10upx;
							min-height: 100upx;
							border: 2.083upx solid #ececec;
							box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
						}
					}

					.footer {
						padding: 10upx;
						display: flex;
						.footer-left{
							width: 50%;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							&>image{
								width: 60upx;
								height: 60upx;
								border-radius: 50%;
							}
							&>view{
								padding-left: 10upx;
							}
						}
						.footer-right{
							display: flex;
							justify-content: flex-start;
							align-items: center;
							&>image{
								width: 60upx;
								height: 60upx;
								border-radius: 50%;
							}
							&>view{
								padding-left: 10upx;
							}
						}
					}
				}
			}
		}

		.uni-logout {
			background: #404040;
			color: #fff;
			display: flex;
			width: 100%;

			.iconfont {
				padding: 0upx 10upx 0upx 20upx;
			}


			&>view {
				padding: 0upx 30upx 0upx 10upx;
				height: 118upx;
				border-bottom: 2.083upx solid #c8c8cc;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32upx;
			}
		}
	}
</style>
