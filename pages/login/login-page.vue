<template>
		<view id="login" :style="{background: 'url('+imageURL+')',backgroundSize:'100% 100%'}">
			<view class="logo">
				<image src="/static/image/touxiang.png"></image>
			</view>
			<view class="inputs">
				<view class="left">
					<image src="/static/icons/wode.png"></image>
					<input type="number" v-model="PhoneNumber" placeholder="手机号" placeholder-style="color:#ffffff;">
				</view>
				<view class="left">
					<image src="/static/icons/mima.png"></image>
					<input :password="true" v-model="Password" placeholder="密码" placeholder-style="color:#ffffff;">
				</view>
			</view>
			<view class="links">
				<navigator url="/pages/login/forgot-password">重置密码</navigator>
				<navigator url="/pages/login/sign-up">注册</navigator>
			</view>
			<button class="submit common-btn" :loading="isLoding" @tap="submit" >登录</button>

		</view>
	
</template>

<script>
	import {
		POST_LOGIN
	} from '@/api/login'
	export default {
		data() {
			return {
				imageURL: '/static/image/background2.jpg',
				PhoneNumber: "",
				Password: "",
				isLoding: false,
				winSize: {},
			};
		},
		onLoad() {
			this.getWindowSize();
			console.log(this.winSize.width)
			console.log(this.winSize.height)
			// #ifdef H5
			document.onLong = function(e) {
				var e = e || window.event;
				e.preventDefault();
			};
			// #endif
		},
		methods: {
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.winSize = {
							"width": res.windowWidth,
							"height": res.windowHeight
						}
					}
				})
			},
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
							portrait,
							phone,
							email
						} = res.data
						this.$store.commit("setToken", `JWT ${res.data.token}`);
						this.$store.commit("setUserInfo", {
							username,
							sex,
							portrait,
							phone,
							email
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
		height:100vh;
		//  // padding-bottom: 400upx;
  // //       padding-top: 160upx;
  // //       width:'this.winSize.width';
		// // height:'this.winSize.height';
		.logo {
			// margin-top: 329.166upx auto 239.583upx;
			// margin-left:239.583upx;
			padding-top:200upx;
			text-align: center;

			image {
				height: 160upx;
				width: 160upx;
				border-radius: 50%;
				background-color: #d8d8d8;
				border: 2.083upx solid #c8c8cc;
			}
		}

		.submit {
			// position: absolute;
			// bottom: 0;
			width:90%;
			background-color:#DF5000;
			font-size: 32upx;
			
			text-align: center;
			font-family: "OpenSans-SemiBold";
			height: 100upx;
			// line-height: 145.833upx;
			
			margin-left:40upx;
			margin-top:180upx;
			margin-bottom: 80upx;
			color: #FFFFFF;
			border-radius: 50upx;
		}

		.inputs {
			margin-top:300upx;
			color:#FFFFFF;
			.left {
				display: flex;
				align-items: center;
				// font-weight: bold;
				margin-top:60upx;
				margin-left:80upx;
			}
			image{
				height: 60upx;
				width: 60upx;
			}
		}
		// 	margin: 0 58.333upx;

			input {
				display: block;
				outline: none;
				padding: 12.5upx 25upx;
				font-size: 29.166upx;
				width:480upx;
				border-bottom: 2upx solid #c8c8cc;

				&+input {
					margin-top: 25upx;
				}
			}
		// }

		.links {
			display: flex;
			justify-content: space-between;
			margin-top: 60upx;
			padding: 0 66.666rpx;
			color: #FFFFFF;
			font-size: 30upx;
		}
	}
</style>
