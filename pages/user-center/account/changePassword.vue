<template>
	<view id="changePassword">
		<!-- 修改密码 -->
		<view class="card">
			<view>
				<view class="identify" style="">验证身份</view>
				<view class="section">
					<view class="check">
						<view style="width: 30%;">验证码:</view>
						<view>
							<input type="number" v-model.number="formData.code" />
						</view>
						<view>
							<button type="default" :disabled="codeButtonType" @click="getCode()" size="mini">
								{{codeButtonType?secondCount+'秒后重新获取':'获取验证码'}}</button>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view class="setting" style="">设置新密码</view>
				<view class="settingNew">
					<view>新密码:</view>
					<view style="padding-left: 10upx;">
						<input type="number"  />
					</view>
				</view>
				<view class="settingNew">
					<view>确认密码:</view>
					<view style="padding-left: 10upx;">
						<input type="number" value="" />
					</view>
				</view>
			</view>
			<view class="assure" >
				<view class="assurePassword" @tap="assure()">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Get_PhoneCode,
	} from "@/api/login.js"
	export default {
		data() {
			return {
				formData: {
					phone: this.$store.state.UserInfo.phone,
					password: '',
					code: '',
					username: '',
				},
				codeButtonType: false,
				secondCount: 30,
			};
		},
		methods: {
			onNavigationBarButtonTap(val) {
				uni.reLaunch({
					url: "/pages/login/forgot-password"
				})
			},
			assure(){
				console.log("修改成功")
			},
			// 获取手机验证码
			getCode() {
				let reg = /^1(3|4|5|7|8)\d{9}$/
				if (!reg.test(this.formData.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						duration: 2000,
						icon: "none"
					})
					return false
				}
				this.codeButtonType = true
				Get_PhoneCode(this.formData.phone, {
					codetype: 1
				}).then(res => {
					uni.showToast({
						title: res.data.msg,
						duration: 2000,
						icon: "none"
					})
					let timeCount = setInterval(() => {

						this.secondCount--
						if (this.secondCount === 0) {
							clearInterval(timeCount)
							this.codeButtonType = false
							this.secondCount = 30
						}
					}, 1000)
				}).catch((err) => {
					this.codeButtonType = false
				})
			},
		}
	}
</script>

<style lang="scss">
	#changePassword {
		.card {
			padding: 100upx 10upx;
			.identify{
				padding: 0upx 41.666upx;
				font-size: 38upx;
			}

			.section {
				display: flex;
				align-items: center;
				padding: 50.25upx 41.666upx;
				border-bottom: 2.083upx solid #c8c8cc;

				&>view {
					font-weight: bold;
				}
			}

			.check {
				display: flex;
				align-items: center;

				button {
					padding: 0;
					width: 230upx;
					height: 75upx;
					font-size: 32upx;
				}
			}
			.setting{
				padding: 50.25upx 41.666upx 0upx 41.666upx;
				font-size: 38upx;
			}
			.settingNew{
				display: flex;
				align-items: center;
				padding: 50.25upx 41.666upx;
				border-bottom: 2.083upx solid #c8c8cc;
				font-weight: bold;
			}
			.assure{
				padding:25upx 280upx;
				text-align: center;
				
				.assurePassword{
					border: 2.083rpx solid #C8C8CC;
					margin: 31.25rpx 0;
					padding: 12.5rpx 25rpx;
					text-align: center;
				}
			}
		}

	}
</style>
