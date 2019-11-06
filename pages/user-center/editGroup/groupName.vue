<template>
	<view id="groupName">
		<!-- <view > -->
			<view class="header">群聊名称</view>
			<view class="body">
				<input type="text" focus/>
			</view>
		<!-- </view> -->
	</view>
</template>

<script> 
	export default {
		data(){
			return{
				
			};
		},
		methods:{
			
		},
		onNavigationBarButtonTap(val) {
			console.log("保存成功");
			uni.redirectTo({
			    url: '/pages/user-center/editGroup/modifychatting',
			    animationType: 'pop-in',
			    animationDuration: 200
			});
		}
	}
</script>

<style lang="scss">
	#groupName{
		padding: 30upx 0upx;
		background-color: #efefef;
		height:100vh; 
		width:100%;
		.header{
			padding: 30upx 25upx 15upx 25upx;
			color: #c8c8cc;
		}
		.body{
			padding: 0upx 25upx;
			border-bottom: 2.083upx solid #1482D1;
		}
	}
</style>
