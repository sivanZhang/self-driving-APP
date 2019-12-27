<template>
	<view id="rewardDetail">
		<!-- 悬赏详情 -->
		<view class="top">
			<view class="header">
				<view class="header-top-left" style="display: flex;">
					<image src="../../../static/image/p10.jpg"></image>
					<view>
						<view class="header-name">张三</view>
						<view class="header-time">11-4 21：47</view>
					</view>
				</view>
				<view class="header-top-right">
					<view style="border: 1px solid #DF5000;color:#DF5000 ;" class="header-right" v-if="followClick" @tap="follow">
						<view style="font-size: 24upx;" class="iconfont icon-jiahao"></view>
						<view>关注</view>
					</view>
					<view style="border: 1px solid #c8c8cc;" class="header-right" v-else @tap="follow">
						<view style="font-size: 24upx;" class="iconfont icon-duigou"></view>
						<view>已关注</view>
					</view>
				</view>
			</view>
			<view class="header-body">
				<view class="list">
					<span>赏金:</span>1000元
				</view>
				<view class="list">
					<span>路线:</span>西安-北京
				</view>
				<view class="list">
					<span>时间:</span>2019/11/11
				</view>
				<block>
					<view class="forwardContent">
						<view>
							<span>悬赏内容:</span>谁和我一起去
						</view>
					</view>
				</block>
				<view class="body-footer">
					<view style="padding: 5upx 10upx;" class="iconfont icon-xingxing"></view>
					<view style="padding: 5upx 20upx;font-size: 48upx;" class="iconfont icon-shenglvehao"></view>
				</view>
			</view>
		</view>
		<view class="main">
			<button type="default" size="mini" @tap="showAnswer">回答</button>
		</view>
		<view class="answer" v-if="showanswer">
			<view class="answer-user">
				<view class="user-name">
					<image src="../../../static/image/face.jpg"></image>
					<view style="font-size: 34upx;padding: 20upx;">李四</view>
				</view>
				<view class="icons">
					<view>
						<view v-if="click" @click="changedianzan">
							<view class="iconfont icon-dianzan"></view>
						</view>
						<view v-else @click="changedianzan">
							<view class="iconfont icon-dianzan" style="color: #EE2222;"></view>
						</view>
					</view>
					<view>
						<view v-if="click1" @click="changeshoucang">
							<view class="iconfont icon-yidianzan"></view>
						</view>
						<view v-else @click="changeshoucang">
							<view class="iconfont icon-yidianzan" style="color: #EE2222;"></view>
						</view>
					</view>

				</view>
			</view>
			<view class="answer-data">
				2019/10/12
			</view>
			<block>
				<view class="answer-content">
					<view>
						<span style="">回答内容:</span>我很喜欢这里
					</view>
				</view>
			</block>
		</view>
		<view class="handle">
			<view>
				<button type="default" size="mini">写回答</button>
			</view>
			<view>
				<button type="default" size="mini">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import share from "@/common/share.js";
	export default {
		components: {
			
		},
		data() {
			return {
				followClick: true,
				click: true,
				click1: true,
				showanswer: false,
			};
		},
		methods: {
			follow() {
				this.followClick = !this.followClick;
			},
			showAnswer() {
				this.showanswer = !this.showanswer
			},
			changedianzan() {
				this.click = !this.click
			},
			changeshoucang() {
				this.click1 = !this.click1
			},
			shareInfo() {
				let shareInfo = {
					href: "https://uniapp.dcloud.io",
					title: "分享测试",
					desc: "分享测试",
					imgUrl: "/static/logo.png"
				};
				let shareList = [{
						icon: "/static/image/journey/sharemenu/wx.png",
						text: "微信好友",
					},
					{
						icon: "/static/image/journey/sharemenu/pyq.png",
						text: "朋友圈"
					},
					{
						icon: "/static/image/journey/sharemenu/weibo.png",
						text: "微博"
					},
					{
						icon: "/static/image/journey/sharemenu/qq.png",
						text: "QQ"
					},
					{
						icon: "/static/image/journey/sharemenu/copy.png",
						text: "复制"
					},
					{
						icon: "/static/image/journey/sharemenu/more.png",
						text: "更多"
					},
				];
				this.shareObj = share(shareInfo, shareList, function(index) {
					console.log("点击按钮的序号: " + index);
					let shareObj = {
						href: shareInfo.href || "",
						title: shareInfo.title || "",
						summary: shareInfo.desc || "",
						success: (res) => {
							console.log("success:" + JSON.stringify(res));
						},
						fail: (err) => {
							console.log("fail:" + JSON.stringify(err));
						}
					};
					switch (index) {
						case 0:
							shareObj.provider = "weixin";
							shareObj.scene = "WXSceneSession";
							shareObj.type = 0;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider = "weixin";
							shareObj.scene = "WXSenceTimeline";
							shareObj.type = 0;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 2:
							shareObj.provider = "sinaweibo";
							shareObj.type = 0;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 3:
							shareObj.provider = "qq";
							shareObj.type = 1;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 4:
							uni.setClipboardData({
								data: shareInfo.href,
								complete() {
									uni.showToast({
										title: "已复制到剪贴板"
									})
								}
							})
							break;
						case 5:
							plus.share.sendWithSystem({
								type: "web",
								title: shareInfo.title || "",
								thumbs: [shareInfo.imgUrl || ""],
								href: shareInfo.href || "",
								content: shareInfo.desc || "",
							})
							break;
					};
				});
				this.$nextTick(() => {
					this.shareObj.alphaBg.show();
					this.shareObj.shareMenu.show();
				})
			},
		},
		onBackPress() {
			//监听back键，关闭弹出菜单
			if (this.shareObj.shareMenu.isVisible()) {
				this.shareObj.shareMenu.hide();
				this.shareObj.alphaBg.hide();
				return true
			}
		},
		//导航栏分享按钮
		onNavigationBarButtonTap(val) {
			if (val.index == 0) {
				console.log("第一个按钮");
				this.shareInfo();
			};
		}
	}
</script>

<style lang="scss">
	#rewardDetail {
		.top {
			border-bottom: 2.083upx solid #c8c8cc;
		}

		.header {
			padding: 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.header-top-left {
				&>image {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
				}

				.header-name {
					font-size: 34upx;
					padding: 15upx 20upx 5upx 20upx;
					color: #DF5000;
				}
			}

			.header-top-right {
				width: 20%;

				.header-right {
					font-size: 24upx;
					height: 20px;
					display: flex;
					justify-content: center;
					align-items: center;
					 border-radius: 50px;
				}
			}
		}

		.header-body {
			padding: 15upx 30upx 15upx 30upx;
			font-size: 27.083upx;

			.list {
				padding: 10upx 10upx;
				font-size: 32upx;
				.span{
                  font-weight: bold;padding-right: 15upx;
				}
			}

			.body-footer {
				display: flex;
				justify-content: flex-end;
			}
		}

		.forwardContent {
			font-size: 32upx;
			padding: 10upx 0upx;

			&>view {
				padding: 10upx;
				min-height: 100upx;
				border: 2.083upx solid #ececec;
				box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
				.span{
					font-weight: bold;padding-right: 15upx;
				}
			}
		}

		.main {
			padding: 25upx 0upx;
			display: flex;
			justify-content: center;

		}

		.answer {
			padding: 25upx 0upx;
			border-top: 2.083upx solid #c8c8cc;
			border-bottom: 2.083upx solid #c8c8cc;

			.answer-user {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.user-name {

					padding: 30upx;
					display: flex;
					justify-content: flex-start;
					align-items: center;

					&>image {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
					}
				}

				.icons {
					padding: 0upx 30upx;
					display: flex;
					justify-content: flex-end;

					&>view {
						padding: 0upx 20upx;
					}
				}
			}
		}

		.answer-data {
			font-size: 32upx;
			padding: 0upx 30upx;
		}

		.answer-content {
			font-size: 32upx;
			padding: 10upx 30upx;

			&>view {
				padding: 10upx;
				min-height: 100upx;
				border: 2.083upx solid #ececec;
				box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
				.span{
					font-weight: bold;padding-right: 15upx;
				}
			}
		}

		.handle {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 25upx 0upx;

			&>view {
				padding: 0upx 90upx;
			}
		}
	}
</style>
