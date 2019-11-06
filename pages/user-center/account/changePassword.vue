<template>
	<view id="changePassword">
		<!-- 修改密码 -->
		<view class="card">
			<view>
				<view class="identify" style="padding-bottom: 10upx;">验证身份:</view>
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
				<view class="setting" style="padding-bottom: 10upx;">设置新密码:</view>
				<view class="settingNew">
					<view class="newpassward">
						<view>新密码:</view>
						<view style="padding-left: 10upx;">
							<input placeholder="请输入密码" :password="showPassword" v-model="NewPassward"/>
						</view>
					</view>
					<view v-if="isshow" @click="changePassword">
						<view class="iconfont icon-yanjing-biyan"></view>
					</view>
					<view v-else @click="changePassword">
						<view class="iconfont icon-jurassic_openeyes"></view>
					</view>

				</view>
				<view class="settingNew">
					<view class="newpassward">
						<view>确认密码:</view>
						<view style="padding-left: 10upx;">
							<input placeholder="请输入密码" :password="showPassword1" v-model="assureNewPassward"/>
						</view>
					</view>
					<view v-if="isshow1" @click="assurePassword">
						<view class="iconfont icon-yanjing-biyan"></view>
					</view>
					<view v-else @click="assurePassword">
						<view class="iconfont icon-jurassic_openeyes"></view>
					</view>
				</view>
			</view>
			<view class="assure">
				<button class="assurePassword" type="primary" @tap="assure()" size="mini">确定</button>
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
				showPassword: true,
				showPassword1: true,
				NewPassward: '',
				assureNewPassward: '',
				isshow: false,
				isshow1: false,
				codeButtonType: false,
				secondCount: 30,
			};
		},
		methods: {
			changePassword: function() {
				this.showPassword = !this.showPassword;
				this.isshow = !this.isshow
			},
			assurePassword: function() {
				this.showPassword1 = !this.showPassword1;
				this.isshow1 = !this.isshow1
			},
			onNavigationBarButtonTap(val) {
				uni.reLaunch({
					url: "/pages/login/forgot-password"
				})
			},
			assure() {
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
		background:#EFEFEF;
		.card {
			padding: 100upx 10upx;

			.identify {
				padding: 0upx 41.666upx;
				font-size: 38upx;
			}

			.section {
				background:#FFFFFF;
				display: flex;
				align-items: center;
				padding: 15.25upx 41.666upx;
				// border-bottom: 2.083upx solid #c8c8cc;

				&>view {
					font-weight: bold;
				}
			}

			.check {
				display: flex;
				align-items: center;
				height:70upx;

				button {
					padding: 0;
					width: 200upx;
					font-size: 30upx;
				}
			}

			.setting {
				padding: 50.25upx 41.666upx 0upx 41.666upx;
				font-size: 38upx;
			}

			.settingNew {
				background:#FFFFFF;
				display: flex;
				align-items: center;
				padding: 15.25upx 41.666upx;
				font-weight: bold;
				justify-content: space-between;
				border: 2.083rpx solid #C8C8CC;

				.newpassward {
					display: flex;
					align-items: center;
				}
			}
			.assure {
				padding: 25upx 60upx;
				text-align: center;

				.assurePassword {
					height: 80upx;
					// border: 2.083rpx solid #C8C8CC;
					display: block;
					// margin: 31.25rpx 0;
					// padding: 12.5rpx 25rpx;
					text-align: center;
				}
			}
		}

	}
</style>
