<template>
	<!-- 设置界面 -->
	<view id="setting">
		<view>
			<view class="settingList" @tap="target('/pages/user-center/personalCenter/editProfile')">
				<view>编辑个人信息</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="settingList" @tap="target('/pages/user-center/account/accountSetting')">
				<view>账号管理</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="settingList">
				<view>消息设置</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="settingList">
				<view>清除缓存</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="settingList">
				<view>关于APP</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="settingList1" @tap="togglePopup()">
				<view>退出</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {
			uniIcon,
		},
		methods: {
			target(url) {
				uni.navigateTo({
					url
				})
			},
			LogOut() {
				let self = this;
				this.$store.commit("setToken");
				this.$store.commit("setUserInfo");
				uni.navigateTo({
					url: "/pages/login/login-page"
				})
			},
			togglePopup() {
				uni.showActionSheet({
				    itemList: ['退出登录'],
				    success: res=> {
				        if(res.tapIndex===0){
							this.LogOut()
						}
				    }
				});
			},

		},
		onNavigationBarButtonTap() {
			uni.reLaunch({
				url: "/pages/home/home-page"
			})
		}
	};
</script>

<style lang="scss">
	#setting {
		.settingList {
			background-color: #FFFFFF;
			padding: 0 41.666upx;
			height: 118upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			// box-shadow: 0 0 12.5upx 2.083upx rgba(200, 200, 204, 0.8);
			border-bottom: 2.083upx solid #c8c8cc;

			&>view:nth-child(1) {
				display: flex;
				align-items: center;
			}

			&>view:nth-child(2) {
				color: #c8c8cc;
				display: flex;
				align-items: center;
			}
		}

		.settingList1 {
			padding: 0 41.666upx;
			height: 118upx;
			border-bottom: 2.083upx solid #c8c8cc;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.uni-logout {
			background: #fff;

			 &>view{
				padding: 0 41.666upx;
				height: 118upx;
				border-bottom: 2.083upx solid #c8c8cc;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
