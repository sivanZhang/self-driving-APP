<template>
	<view id="login">
		<view class="logo">
			<image src="/static/image/touxiang.png"></image>
		</view>
		<view class="inputs">
			<input type="number" v-model="PhoneNumber" placeholder="手机号" placeholder-style="color:#fab701;">
			<input :password="true" v-model="Password" placeholder="密码" placeholder-style="color:#fab701;">
		</view>
		<view class="links">
			<navigator url="/pages/login/forgot-password">重置密码</navigator>
			<navigator url="/pages/login/sign-up">注册</navigator>
		</view>
		<button class="sunbmit common-btn" :loading="isLoding" @tap="submit">登录</button>

	</view>
</template>

<script>
	import {
		POST_LOGIN
	} from '@/api/login'
	export default {
		data() {
			return {
				PhoneNumber: "",
				Password: "",
				isLoding: false,
			};
		},
		onLoad() {},
		methods: {
			submit() {
				this.isLoding = true;
				let reg = /^1(3|4|5|7|8)\d{9}$/
				if (!reg.test(this.PhoneNumber)) {
					uni.showToast({
						title: "手机号格式错误",
						icon: "none",
					});
					return;
				}
				if (!this.Password) {
					uni.showToast({
						title: "请输入密码",
						icon: "none"
					});
					return;
				}
				let data = {
					phone: this.PhoneNumber,
					password: this.Password,
				};
				POST_LOGIN(data).then(res => {
					this.isLoding = false;
					uni.showToast({
						title: res.data.msg,
						icon: "none",
					});
					if (res.data.status === 0) {
						const {
							
							username,
							sex,
							thumbnail_portait,
							phone,
							email,
							id
						} = res.data
						this.$store.commit("setToken", `JWT ${res.data.token}`);
						this.$store.commit("setUserInfo", {
							username,
							sex,
							thumbnail_portait,  
							phone,
							email,
							id
						});
						uni.switchTab({
							url: "/pages/user-center/my-account",
							animationType: 'pop-in',
							animationDuration: 200
						})

					} else {
						this.isLoding = false;
						uni.showToast({
							title: res.data.msg,
							icon: "none",
						})
					}
				})
			}
		}
	};
</script>

<style lang="scss">
	#login {
		padding-bottom: 145.833upx;

		.logo {
			margin: 329.166upx auto 239.583upx;
			text-align: center;

			image {
				height: 270.833upx;
				width: 270.833upx;
				border-radius: 50%;
				background-color: #d8d8d8;
				border: 2.083upx solid #c8c8cc;
			}
		}

		.sunbmit {
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #fad87b;
			font-size: 31.25upx;
			font-family: "OpenSans-SemiBold";
			height: 145.833upx;
			line-height: 145.833upx;
			padding: 0;
			color: #222329;
			border-radius: 0;
		}

		.inputs {
			margin: 0 58.333upx;

			input {
				display: block;
				outline: none;
				padding: 12.5upx 25upx;
				font-size: 29.166upx;
				border-bottom: 2.083upx solid #c8c8cc;

				&+input {
					margin-top: 25upx;
				}
			}
		}

		.links {
			display: flex;
			justify-content: space-between;
			margin-top: 35.416upx;
			padding: 0 66.666rpx;
			color: #fab701;
			font-size: 29.166upx;
		}
	}
</style>
