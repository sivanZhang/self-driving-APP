<template>
<!-- 忘记密码 -->
<!-- #ifdef H5 --> 
<view id="forgot-password">  
			<!-- #endif -->
			<!-- #ifndef H5 -->
		<view id="forgot-password"  :style="{backgroundImage: 'url('+imageURL+')',backgroundSize:'cover',backgroundPosition:'center'}"> 
		<!-- #endif -->
		<text class="title">找回密码</text>
		<view class="content">
			<view class="phone-number">
				<image src="/static/icons/phone.png"></image>
				<input type="number" v-model="formData.phone" pattern="[0-9]*" placeholder="手机号" placeholder-style="color:#ffffff;"
				 maxlength="11"/>
				<!-- <input class="pr-s" disabled="true" @tap="keyphone" placeholder-style="color:#ffffff;" maxlength="11" placeholder="手机号" v-model="formData.phone"/>
				<tki-float-keyboard ref="keyb" :mode="keyMode" :type="keyType" :title="keyTitle" @del="keyDel" 
				@val="keyVal" @show="keyShow" @hide="keyHide"></tki-float-keyboard>	 -->
			</view>
			<view class="verificate-code">
				<image src="/static/icons/code.png"></image>
				<input type="number" v-model.number="formData.code" placeholder="验证码" placeholder-style="color:#ffffff;"/>
				<!-- <input class="pr-s" disabled="true" @tap="keycode" placeholder-style="color:#ffffff;" maxlength="4" placeholder="验证码" v-model.number="formData.code"/> -->
				<button type="defalut" plain="true" :disabled="codeButtonType" @tap="getCode()" size="mini">{{codeButtonType?secondCount+'秒后重新获取':'获取验证码'}}</button>
			</view>
			<view class="new-password">
				<image src="/static/icons/password.png"></image>
				<input type="password" v-model="formData.password" placeholder="新密码" placeholder-style="color:#ffffff;"/>
			</view>
		</view>
		<button class="confirm" @tap="confirm">确定</button>
	</view>
</template>         

<script>
	import graceChecker from "@/utils/graceChecker"
	import { Put_Password, Get_PhoneCode } from "@/api/login.js";
	// import tkiFloatKeyboard from
	// "@/components/tki-float-keyboard/tki-float-keyboard.vue"
	export default {
		data() {
			return {
				imageURL: '/static/image/background.jpg',
				oldNum:0,
				formData: {
					phone: '',
					code: '',
					password:''
				},
				codeButtonType: false,
				secondCount: 60,
				// keyMode:'number',
				// keyType:0,
				// keyTitle:"嗨自驾数字键盘",
				// key:true
			}
		},
		components:{
					// tkiFloatKeyboard
				},
		methods: {
			// // 显示键盘
			// showKey(){
			// 	this.$refs.keyb._keyShow()
			// },
			// // 隐藏键盘
			// hideKey(){
			// 	this.$refs.keyb._keyHide()
			// },
			// // 键盘退格
			// keyDel(){
			// 	if(this.key=="true"){
			// 		let d = this.formData.phone
			// 		this.formData.phone = d.substring(0,d.length-1)
			//     } else{
			// 		let d = this.formData.code
			// 		this.formData.code = d.substring(0,d.length-1)
			// 	}
			// },
			// // 键盘输入值
			// keyVal(v){
			// 	if(this.key =="true"){
			// 		this.formData.phone = this.formData.phone + v
			// 	} else {
			// 		this.formData.code = this.formData.code + v
			// 	}
			// },
			// // 显示键盘后的回调
			// keyShow(h){
			// 	console.log(h)
			// },
			// // 隐藏键盘后的回调
			// keyHide(){
			// },
			// // 数字键盘
			// keyphone(){
			// 	this.key="true"
			// 	this.keyMode = "number"
			// 	this.showKey()
			// },
			// keycode(){
			// 	this.key="false"
			// 	this.keyMode = "number"
			// 	this.showKey()
			// },
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
							this.secondCount = 60
						}
					}, 1000)
				}).catch((err) => {
					this.codeButtonType = false
				})
			},
			//保存修改密码
			confirm () {
				const rule = [
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
					Put_Password(this.formData).then(res=>{
						uni.showToast({ title: res.data.msg, icon: "none" });
							if (res.data.status == 0){
							setTimeout(function(){
								uni.navigateTo({
									url: "/pages/login/login-page",
								});
							},1000)
					    }
					})
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			}
		}
	}
</script>

<style lang="scss">
	#forgot-password {
		min-height:100vh;
			/* #ifdef H5 */  
			background-image: url(~@/static/image/background.jpg) ;
			background-size: cover;
			background-position: center;
			/* #endif */
			.title{
			    position: relative;
				top:200upx;
				left:280upx;
				font-size:50upx;
				color: #FFFFFF;
			}
		    .content{
				margin-top:600upx;
				color:#FFFFFF;
				image{
					height: 40upx;
					width: 40upx;
				}
				.phone-number,.new-password{
					align-items: center;
					margin-top:50upx;
					margin-left:80upx;
					display:flex;
				}v
				.verificate-code{
					align-items: center;
					display:flex;
					margin-top:50upx;
					margin-left:80upx;
					position: relative;
				
					button {
						color:#FFFFFF;
						position: absolute;
						right: 100upx;
						margin-bottom:30upx;
						padding: 10upx;
						padding-bottom:12upx;
						z-index: 50;
					}
				}
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
			}
			.confirm {
				width:90%;
				background-color:#DF5000;
				font-size: 32upx;
				padding-top:10upx;
				text-align: center;
				font-family: "OpenSans-SemiBold";
				height: 100upx;
				margin-left:38upx;
				margin-top:80upx;
				color: #FFFFFF;
				border-radius: 50upx;
				z-index: 50;
			}
		}
</style>

