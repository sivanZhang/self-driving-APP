<template>
	<view id="checkPhone">
		<!-- //验证当前手机 -->
		<view class="card">
			<view class="section">
				<view class="phonenumber" style="" @click="show" v-if="!inputShow">
					<view>原手机号码:</view>
					<view>{{formData.phone}}</view>
				</view>
				<view class="phonenumber" v-else>
					<view>新手机号码:</view>
					<input focus="true" type="number"  />
				</view>
			</view>
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
		<view class="bind">
			<button class="bindphone" type="primary" @tap="bindNewPhone()" size="mini">绑定新手机</button>
			<!-- <view class="bindphone" @tap="bindNewPhone()">绑定新手机</view> -->
			<view class="confirm" @tap="target('/pages/user-center/account/bindNewPhone')">原手机不可用?</view>
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
				inputShow: false,
				eidtPhone: '',
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
			show() {
				this.inputShow = true
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
			target(url) {
				uni.navigateTo({
					url
				});
			},
			bindNewPhone() {
				console.log("11111")
			}

		}
	}
</script>

<style lang="scss">
	#checkPhone {
		.card {
			padding: 100upx 10upx;

			.section {
				display: flex;
				align-items: center;
				padding: 50.25upx 41.666upx;
				border-bottom: 2.083upx solid #c8c8cc;

				&>view {
					font-weight: bold;
				}
				.phonenumber{
					padding-left: 5upx;
					display: flex;
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
		}

		.bind {
			padding: 25upx 60upx;
			text-align: center;

			.bindphone {
				border: 2.083rpx solid #C8C8CC;
				display: block;
				text-align: center;
			}

			.confirm {
				padding: 15upx;
			}
		}
	}
</style>
