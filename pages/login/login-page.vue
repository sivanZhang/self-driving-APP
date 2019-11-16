<template>
		
			<!-- #ifdef H5 -->  
			<view id="login">  
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<view id="login"  :style="{backgroundImage: 'url('+imageURL+')',backgroundSize:'cover',backgroundPosition:'center'}"> 
			<!-- #endif -->
			<view class="logo">
				嗨自驾, 自驾嗨
			</view>
			<view class="inputs">
				<view class="left">
					<image src="/static/icons/user.png"></image>
					<input type="number" v-model="PhoneNumber" placeholder="手机号" placeholder-style="color:#ffffff;">
				</view>
				<view class="left">
					<image src="/static/icons/password.png"></image>
					<input type="password" v-model="Password" placeholder="密码" placeholder-style="color:#ffffff;">
				</view>
			</view>
			<button class="submit common-btn" :loading="isLoading" @tap="submit" >登录</button>
			<view class="links">
				<navigator url="/pages/login/forgot-password">找回密码</navigator>
				<navigator url="/pages/login/sign-up"> 开始注册</navigator>
			</view>
		</view>
</template>

<script>
	import {
		POST_LOGIN
	} from '@/api/login'
	export default {
		data() {
			return {
				imageURL: '/static/image/background.jpg',
				PhoneNumber: "",
				Password: "",
				isLoading: false,
				// winSize: {},
			};
		},
		onLoad() {
			// this.getWindowSize();
			// console.log(this.winSize.width)
			// console.log(this.winSize.height)
			// #ifdef H5
			document.onLong = function(e) {
				var e = e || window.event;
				e.preventDefault();
			};
			// #endif
		},
		methods: {
			// getWindowSize() {
			// 	uni.getSystemInfo({
			// 		success: (res) => {
			// 			this.winSize = {
			// 				"width": res.windowWidth,
			// 				"height": res.windowHeight
			// 			}
			// 		}
			// 	})
			// },
			submit() {
				this.isLoading = true;
				let reg = /^1(3|4|5|7|8|9)\d{9}$/
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
					this.isLoading = false;
					uni.showToast({
						title: res.data.msg,
						icon: "none",
					});
					if (res.data.status === 0) {
						const {
							background_image,
							username,
							sex,
							thumbnail_portait,
							phone,
							email,
							id
						} = res.data
						this.$store.commit("setToken", `JWT ${res.data.token}`);
						this.$store.commit("setUserInfo", {
							background_image,
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
						this.isLoading = false;
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
		min-height:100vh;
		position: relative;
		/* #ifdef H5 */  
		background-image: url(~@/static/image/background.jpg) ;
		background-size: cover;
		background-position: center;
		/* #endif */
		.logo {
			// margin-top: 329.166upx auto 239.583upx;
			// margin-left:239.583upx;
			position: relative;
			top:200upx;
			text-align: center;
		    font-size:50upx;
			//font-weight: bold;
			color: #FFFFFF;
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
			
			margin-left:38upx;
			margin-top:80upx;
			color: #FFFFFF;
			border-radius: 50upx;
		}
		.inputs {
			margin-top:700upx;
			color:#FFFFFF;
			.left {
				display: flex;
				align-items: center;
				// font-weight: bold;
				margin-top:50upx;
				margin-left:80upx;
			}
			image{
				height: 40upx;
				width: 40upx;
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
			text-align: center;
			margin-left: 260upx;
			margin-top: 30upx;
			display: flex;
			color: #FFFFFF;
			font-size: 30upx;
			navigator{
				padding: 0 10.416rpx;
				line-height: 1;
				&:first-child{
					border-right: 2.083rpx solid #fff;
				}
			}
		}
	}
</style>