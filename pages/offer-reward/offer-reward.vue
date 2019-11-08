<template>
	<!-- 悬赏功能 -->
	<view id="offer-reward">
		<view class="header">
			<view class="reward">悬赏大厅</view>
			<view class="line" @tap="target('/pages/offer-reward/router/router')">路线/攻略</view>
		</view>
		<!-- 临时的按钮 -->
		<button type="primary" size="mini" @tap="target('/pages/offer-reward/createReward/rewardDetail')">临时跳转到详情的按钮</button>
		<block v-for="(item,index) of RewardList" :key="index">
			<view class="container section">
				<view class="detail">
					<view class="content" >
						<view @tap="target('/pages/offer-reward/createReward/rewardDetail')">
							<view class="top-left">
								<image src="../../static/image/p10.jpg"></image>
								<view>{{item.lineinfo.creator_name}}</view>
							</view>
							<view class="name">
								<span style="font-weight: bold;">路线：</span>
								{{item.lineinfo.content }}
							</view>
							<view style="font-size: 32upx;">
								<span style="font-weight: bold;">时间：</span>
								{{ item.lineinfo.start_date | dateFormat }}--{{ item.lineinfo.end_date | dateFormat }}
							</view>
							<block >
								<view class="forwardContent">
									<view>悬赏内容：{{item.content}}</view>
								</view>
							</block>
						</view>
						<view class="footer">
							<view class="footer-right">
								<view>
									<view class="iconfont icon-qian" style="color: #EE0000;"></view>
									<view style="padding: 0upx 5upx;">{{item.money}}元</view>
								</view>
								<view>
									<view>
										<view class="iconfont icon-dianzan" style="color: #EE2222;padding-right: 8upx;"></view>
										<view>3</view>
									</view>
									<view>
										<view class="iconfont icon-yidianzan" style="color: #EE2222;padding-right: 8upx;"></view>
										<view>5</view>
									</view>
									
								</view>
								
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
				<view @tap="target1('/pages/offer-reward/createReward/createReward')">发布悬赏</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { query_RewardDetail } from '@/api/offerReward';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				RewardList: []

			}
		},
		onLoad() {
		    this.getRewardList();
	    },
		methods: {
			//获取悬赏详情列表
			getRewardList(){
              query_RewardDetail().then(({ data }) =>{
				 
				  if(data.status == 0){
					  this.RewardList = [...data.msg];
					  console.log("----------")
					   console.log(this.RewardList)
				  }
			  })
			},
			//页面跳转
			target(url){
				uni.navigateTo({
					url
				});
			},
			//发布悬赏和我的悬赏页面跳转
			target1(url){
				this.target(url);
				this.$refs.popup.close();
			},

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
						.top-left{
							width: 50%;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							&>image{
								width: 80upx;
								height: 80upx;
								border-radius: 50%;
							}
							&>view{
								padding-left: 10upx;
							}
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
						.footer-right{
							display: flex;
							justify-content: space-between;
							align-items: center;
							&>image{
								width: 60upx;
								height: 60upx;
								border-radius: 50%;
							}
							&>view{
								display: flex;
								&>view{
									display: flex;
									align-items: center;
									padding: 0upx 10upx;
								}
							}
						}
					}
				}
			}
		}
		.uni-popup {
			position: absolute;
			width: 100%;
			display: flex;
			justify-content: flex-end;
			z-index: 998;
			overflow: hidden;
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
