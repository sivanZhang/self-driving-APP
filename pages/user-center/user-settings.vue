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
		<uni-popup ref="logout" type="bottom" :custom="true" :show="true">
			<view class="uni-logout">
				<view  @tap="LogOut">退出登录</view>
				<view>关闭嗨自驾</view>
				<view @tap="cancel()">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniIcon,
			uniPopup
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
				uni.showToast({
					title: '成功退出账号',
					mask: false,
					duration: 1500,
					success() {
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/login/login-page"
							})
						}, 1000);
					}
				});

			},
			togglePopup() {
				this.$refs.logout.open()
			},
			cancel() {
				this.$refs.logout.close()
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
