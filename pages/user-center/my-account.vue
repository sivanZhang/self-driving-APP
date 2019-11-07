<template>
	<!-- 我的首页 -->
	<view id="MyAccount">
		<view class="wall">
			<image @tap="changeImage()" src="/static/image/test1.jpg"></image>
			<view class="wall-top" @tap="target('/pages/user-center/personalCenter/personalCenter')">
				<view style="display: flex;">
					<image src="/static/image/touxiang.png"></image>
					<view>
						<view class="top-header">
							<span style="font-weight: bold;"></span>{{UserInfo.username||'用户'+UserInfo.phone}}</span>
							<view v-if="UserInfo.sex == '女'">
								<image src="/static/icons/women.png"></image>
							</view>
							<view v-else>
								<image src="/static/icons/men.png"></image>
							</view>
						</view>
					<!-- 	<view class="top-bottom">
							<view style="flex-wrap: wrap;padding-left: 5upx;">0关注</view>
							<view style="flex-wrap: wrap;padding-left: 10upx">10粉丝</view>
						</view> -->
					</view>
					<!-- <view style="padding-left: 170upx;padding-top: 35upx;font-size: 40upx;">
						点击
						<image src="../../static/icons/jiantou.png" style="width: 30upx;height: 50upx;"></image>
					</view> -->
				</view>
			</view>
		</view>
		<!-- //登录 -->
		<!-- <view class="login">
		</view> -->
		<view class="main">
			<view class="uni-content">
				<view  class="uni-content-box">
					<view class="uni-content-image">
						<image src="/static/icons/zuji.png"  />
					</view>
					<view class="uni-content-text">足迹</view>
				</view>
				<view class="uni-content-box" @tap="target('/pages/activity/activity')">
					<view class="uni-content-image">
						<image src="/static/icons/dongtai.png"  />
					</view>
					<view class="uni-content-text">动态</view>
				</view>
				<view  class="uni-content-box">
					<view class="uni-content-image">
						<image src="/static/icons/xuanshang2.png"  />
					</view>
					<view class="uni-content-text">悬赏</view>
				</view>
				<view  class="uni-content-box">
					<view class="uni-content-image" @tap="target('/pages/user-center/message/mymessage')">
						<image src="/static/icons/xiaoxi.png"  />
					</view>
					<view class="uni-content-text">消息</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="section" @tap="target('/pages/journey/journey')">
				<view>
					<image class="icon" src="/static/icons/mydriving.png"></image>
					正在进行的自驾之旅
				</view>
				<view>
					<block v-if="noticeData.length>0">
						<uni-badge type="error" class="badge" :text="String(noticeData.length)"></uni-badge>
					</block>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section">
				<view>
					<image class="icon" src="/static/icons/save.png"></image>
					我的收藏
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section" @tap="target('/pages/user-center/user-settings')">
				<view>
					<image class="icon" src="/static/icons/setting.png"></image>
					设置
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section" @tap="target('/pages/user-center/browser-history')">
				<view>
					<image class="icon" src="/static/icons/viewhistory.png"></image>
					浏览历史
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section">
				<view>
					<image class="icon" src="/static/icons/invited.png"></image>
					邀请好友
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section">
				<view>
					<image class="icon" src="/static/icons/fankui.png"></image>
					意见反馈
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
		</view>
	<!-- 	<view class="foot">
			APP版本号:
		</view> -->
		<uni-popup ref="popup" type="center" :show="true">
			<view  @tap="target('/pages/user-center/change-background')">更换相册封面</view>
		</uni-popup>
			
	</view>
</template>

<script>
	import {
		GET_Notice
	} from '@/api/notice'
	// import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			// uniBadge,
			uniIcon,
			uniPopup,
		},
		data() {
			return {
				noticeData: [],
			};
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			}
		},
		methods: {
			target(url) {
				uni.navigateTo({
					url
				})
			},
			changeImage() {
				this.$refs.popup.open()
			},
		},
		onLoad() {
			const Token = this.$store.state.estateToken || uni.getStorageSync('estateToken');
			if (!Token) {
				uni.navigateTo({
					url: "/pages/login/login-page"
				})
			}

		}
	};
</script>

<style lang="scss">
	#MyAccount {
		.wall {
			height: 360rpx;
            position:relative;
			background: #007AFF;

			image {
				height: 100%;
				width: 100%;
				// boder-bottom-left-radius:30rpx;  
				// boder-bottom-right-radius:30rpx;
			}
			.wall-top{
				position:relative; 
				z-index:2; 
				left:12upx;
				 bottom:75upx;
				 font-size: 32upx;
				 
				 image{
					 width: 125rpx;height: 125rpx;border-radius: 50%;
				 }
			}
			.top-header{
				display: flex;
				padding-left: 15upx;
				padding-top: 25upx;
				color: #FFFFFF;
				image{
					width: 45rpx;height: 35rpx;padding-left: 8upx;z-index:2;
				}
			}
			.top-bottom{
				display: flex;
				flex-wrap: nowrap;
				padding-left: 15upx;
				padding-top: 10upx;
			}
		}

		.main {
			height: 220upx;
			.uni-content {
				display: flex;
				flex-wrap: wrap;
				padding-left: 40upx;
				padding-top: 85upx;
				padding-right: 40upx;
			}
			.uni-content-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 25%;
				box-sizing: border-box;
			}
			.uni-content-image {
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 70upx;height: 70upx;
				}
			}
			.uni-content-text {
				font-size: 26upx;
				color: #333;
				padding-top: 5px;
				padding-bottom: 10px;
			}
		}

		.badge {
			background-color: #e60000 !important;
			font-size: 25upx !important;
		}

		.content {
			position: relative;
			top: -2.5rpx;

			.section {
				padding: 0 41.666upx;
				// height: 125upx;
				height: 118upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// border-bottom: 2.083upx solid #c8c8cc;

				&>view:nth-child(1) {
					// font-weight: bold;

					.icon {
						width: 62.5upx;
						height: 62.5upx;
						display: inline-block;
						margin-right: 37.5upx;
					}
				}

				&>view:nth-child(2) {
					color: #c8c8cc;
					display: flex;
					align-items: center;
				}
			}

			.profile {
				padding: 0 31.25rpx;
				width: 100%;
				display: flex;
				align-items: flex-end;

				image {
					width: 125rpx;
					height: 125rpx;
					border-radius: 50%;
				}
			}
		}
		.foot{
			color: #C8C8CC;
			font-size: 20upx;
			display: flex;
			justify-content: center;
		}
	}
</style>
