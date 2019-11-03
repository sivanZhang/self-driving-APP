<template>
	<view id="bindNewPhone">
		<!-- 绑定新手机 -->
		<view class="card">
			<view class="section">
				<view>登陆密码:</view>
				<input type="text" class="signup-inp" v-model="formData.password" placeholder="请输入密码" />
			</view>
		</view>
		<view class="bind" >
			<button class="bindphone" type="primary" @tap="bindNewPhone()" size="mini">绑定新手机</button>
			<!-- <view class="bindphone" @tap="bindNewPhone()">绑定新手机</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				formData:{
						password:'',
				},
			};
		},
		methods:{
			bindNewPhone(){
				console.log("11111111")
			}
		},
	}
</script>

<style lang="scss">
	#bindNewPhone{
		.card {
			padding: 50upx 10upx 10upx 10upx;
		
			.section {
				display: flex;
				align-items: center;
				padding: 50.25upx 41.666upx;
				// border-bottom: 2.083upx solid #c8c8cc;
		
				&>view {
					font-weight: bold;
				}
			}
			.signup-inp{
				padding-left: 15upx;
				font-size: 32upx;
			}
		}
		.bind{
			padding:0upx 60upx;
			text-align: center;
			
			.bindphone{
				border: 2.083rpx solid #C8C8CC;
				display: block;
				text-align: center;
			}
		}
	}
</style>
