<template>
	<!-- 我的首页 -->
	<view id="MyAccount">
		<view class="wall">

			<view class="header">
				<map style="width:100vw;height:40vw;"></map>
			 <!-- <web-view      src="/hybrid/html/line.html" ></web-view> -->
			</view> 
			<view class="wall-top" >
				<view style="display: flex;">
					<image   class="i" :src="'https://tl.chidict.com'+'/'+UserInfo.thumbnail_portait" @tap="target('/pages/user-center/personalCenter/personalCenter')"></image>
					<view class="top" style="display:flex;padding-top:20upx;padding-left:10upx;">
						<view class="position">
							<image @tap="chooseLocation"  src="../../static/image/journey/e.png"></image>
							<view  class="address">
								{{locationAddress}}
							</view>
						</view>
						<view class="top-header" @tap="target('/pages/user-center/personalCenter/personalCenter')" >
							<span style="font-weight: bold"></span>{{UserInfo.username||'用户'+UserInfo.phone}}</span>
							<!-- <view v-if="UserInfo.sex == '女'">
								<image src="/static/icons/women.png"></image>
							</view>
							<view v-else>
								<image src="/static/icons/men.png"></image>
							</view> -->
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
				<view class="uni-content-box" @tap="target('/pages/foot/my-foot')">
					<view class="uni-content-image">
						<image src="/static/icons/zuji.png" />
					</view>
					<view class="uni-content-text">车迹</view>
				</view>
				<view class="uni-content-box" @tap="target('/pages/activity/activity')">
					<view class="uni-content-image">
						<image src="/static/icons/dongtai.png" />
					</view>
					<view class="uni-content-text">动态</view>
				</view>
				<view class="uni-content-box" >
					<view class="uni-content-image" style="position:relative;top:-0.5rem;">
						<image class="img" src="/static/image/journey/start.png" />
					</view>
					
				</view>
				<view class="uni-content-box">
					<view class="uni-content-image">
						<image src="/static/icons/xuanshang2.png" />
					</view>
					<view class="uni-content-text">悬赏</view>
				</view>
				<view class="uni-content-box">
					<view class="uni-content-image" @tap="target('/pages/user-center/message/mymessage')">
						<image src="/static/icons/xiaoxi.png" />
					</view>
					<view class="uni-content-text">通知</view>
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
			<view class="section" @tap="target('/pages/user-center/user-settings')">
				<view>
					<image class="icon" src="/static/icons/setting.png"></image>
					设置
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
		<view class="foot">
			版本:12.321.33
		</view>
		
		

	</view>
</template>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script>
	import {
		search_users
	} from '@/api/usercenter'
	import {
		GET_Notice
	} from '@/api/notice'
	// import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	var util = require('../../common/util.js');
	var formatLocation = util.formatLocation;
	export default {
		components: {
			// uniBadge,
			uniIcon,
		},
		data() {
			return {
				noticeData: [],
				
				location: {},
				locationAddress: '',
			};
		},

		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			},
            
		},
		methods: { 
		chooseLocation: function() {
			uni.chooseLocation({
				success: (res) => {
					this.hasLocation = true,
						this.location = formatLocation(res.longitude, res.latitude),
						this.locationAddress = res.address
				}
			})
		},
			search(){
				search_users({
					userid: this.$store.state.UserInfo.id
				}).then(res => {
					console.log(res)
				})
			},
			target(url) {
				uni.navigateTo({
					url
				})
			},
		},
		onLoad() { 
					
			const Token = this.$store.state.estateToken || uni.getStorageSync('estateToken');
			if (!Token) {
				uni.navigateTo({
					url: "/pages/login/login-page"
				})
			}
           this.amapPlugin = new amap.AMapWX({
           				key: this.key
           			});  
		},
		created() {
			this.search();
		}
	};
</script>

<style lang="scss">
	#MyAccount {
		overflow-x: hidden;
		.wall {
			height: 360rpx;
			position: relative;
			background: #fff;

			.wall-top {
				position: relative;
				z-index: 2;
				left: 12upx;
				bottom: 3upx;
				font-size: 32upx;

				.i {
					position:relative;
					left:3%;
 				    width: 130rpx;
					height: 130rpx;
					border-radius: 50%;
					box-shadow: 1px 1px 2px #F2F2F2;
					border: 1.5px solid #F2F2F2;
				}
			}

			.header {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
            .position{
				image {
					width: 85upx;
					height: 60upx;
					padding-left: 30upx;
					z-index: 2;
				}
				.address{
					
					position:relative;
					top:-1.5rem;
					right:-2rem;
				}
			}
			.top-header {
				position:relative;
				left:2.5rem;
				color: black;
			}

			.top-bottom {
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
				padding-left: 0upx;
				padding-top: 85upx;
				padding-right: 5upx;
			}

			.uni-content-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 20%;
				box-sizing: border-box;
			}

			.uni-content-image {
				display: flex;
				justify-content: center;
				align-items: center;
                .img{
					width:100upx;
					height:100upx;
				}
				
				image {
					width: 70upx;
					height: 70upx;
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

		.foot {
			padding-top: 40upx;
			opacity: 0.5;
			color: black;
			font-size: 25upx;
			display: flex;
			justify-content: center;
		}
	}
</style>
