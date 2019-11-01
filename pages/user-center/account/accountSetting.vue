<template>
	<view id="accountSetting">
		<view class="card">
			<view class="section">
				<view class="left">
					<image src="../../../static/icons/phoneAccount.png"></image>
					<view style="padding-left: 5upx;">手机号码:{{UserInfo.phone}}</view>
				</view>
				<view @tap="target('/pages/user-center/account/checkPhone')">
					<button type="text">修改</button>
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
		methods:{
			target(url){
				uni.navigateTo({
					url
				});
			}
		}
	}
</script>

<style lang="scss">
	#accountSetting {
		.card {
			padding: 100upx 10upx;

			.section {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 50.25upx 41.666upx;
				border-bottom: 2.083upx solid #c8c8cc;

				.left {
					display: flex;
					align-items: center;
					font-weight: bold;
				}
                button {
                	width: 130upx;
                	height: 75upx;
                	font-size: 32upx;
                }
				image {
					width: 60upx;
					height: 60upx;
				}
			}
		}
	}
</style>
