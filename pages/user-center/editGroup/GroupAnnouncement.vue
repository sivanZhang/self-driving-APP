<template>
	<!-- 修改群公告 -->
	<view id="GroupAnnouncement">
		<view class="main">
			 <textarea  focus placeholder="请编辑群公告"  auto-height />
		</view>
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

<style>
	#GroupAnnouncement {
		padding: 15upx;
		background-color: #efefef;
		height: 100vh;
		width: 100%;
	}
</style>
