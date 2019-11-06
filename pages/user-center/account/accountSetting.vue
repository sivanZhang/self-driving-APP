<template>
	<view id="accountSetting">
		<!-- 账号管理 -->
		<view class="card">
			<view class="section">
				<view class="left">
					<image src="../../../static/icons/phoneAccount.png"></image>
					<view style="padding-left: 5upx;">手机号码:{{UserInfo.phone}}</view>
				</view>
				<view @tap="target('/pages/user-center/account/checkPhone')">
					<button type="text" size="mini">修改</button>
				</view>
			</view>
			<view class="section" @tap="target('/pages/user-center/account/changePassword')">
				<view class="left">
					<image src="../../../static/icons/mima.png"></image>
					<view style="padding-left: 5upx;">修改密码</view>
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
		</view>
		<view></view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {
			uniIcon,
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
				});
			}
		}
	}
</script>

<style lang="scss">
	#accountSetting {
		background-color: #efefef;
		height: 100vh;
		width: 100%;

		.card {
			padding: 25upx 0upx;

			.section {
				background-color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20upx;
				border-bottom: 2.083upx solid #efefef;

				.left {
					display: flex;
					align-items: center;
					font-weight: bold;
				}
				image {
					width: 60upx;
					height: 60upx;
				}

				.uni-icon {
					color: #c8c8cc;
				}
			}
		}
	}
</style>
