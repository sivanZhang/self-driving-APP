<template>
	<view id="sign-up">
		<text>注册</text>
		<input class="signup-inp" type="text" v-model="formData.phone" placeholder="手机号" />
		<view class="code-warp">
			<input class="signup-inp" type="number" v-model.number="formData.code" placeholder="验证码" />
			<button type="default" :disabled="codeButtonType" @click="getCode()" size="mini">{{codeButtonType?secondCount+'秒后重新获取':'获取验证码'}}</button>
		</view>
		<input class="signup-inp" type="text" v-model="formData.username" placeholder="用户名" />
		<input type="text" class="signup-inp" v-model="formData.password" placeholder="密码" />
		<button type="primary" @tap="signup">注册</button>
	</view>
</template>

<script>
	import graceChecker from "@/utils/graceChecker"
	import {
		Get_PhoneCode,
		Post_Signup
	} from "@/api/login.js"
	export default {
		data() {
			return {
				formData: {
					phone: 18691631041,
					password: '',
					code: '',
					username: '',
				},
				codeButtonType: false,
				secondCount: 30,
			}
		},
		methods: {
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
					codetype: 0
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
			//注册
			signup() {
				const rule = [{
						name: "password",
						checkType: "string",
						checkRule: "6,16",
						errorMsg: "密码最少输入6位"
					},
					{
						name: "code",
						checkType: "reg",
						checkRule: /\d{4}/,
						errorMsg: "验证码格式错误"
					},
					{
						name: "phone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "手机号格式错误"
					},
				]
				let checkRes =graceChecker.check(this.formData, rule)
				if(checkRes){
					Post_Signup(this.formData).then(res=>{
						uni.showToast({ title: res.msg, icon: "none" });
					})
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			}
		}
	}
</script>

<style lang="scss">
	#sign-up {
		text-align: center;
		padding: 250rpx 31.25rpx 0;

		.code-warp {
			position: relative;

			button {
				position: absolute;
				right: 20.833rpx;
				top: 5px;
				padding: 0;
			}
		}

		.signup-inp {
			border: 2.083rpx solid #C8C8CC;
			margin: 31.25rpx 0;
			padding: 12.5rpx 25rpx;
			text-align: left;
		}
	}
</style>
