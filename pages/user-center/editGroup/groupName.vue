<template>
	<!-- 修改群聊名称 -->
	<view id="groupName">
		<!-- <view > -->
			<view class="header">群聊名称</view>
			<view class="body">
				<input type="text" v-model="groupname" focus/>
			</view>
			<view>
				<button type="primary" @tap="editGroupName">保存</button>
			</view>
		<!-- </view> -->
	</view>
</template>

<script> 
import { EditGroupsChatting } from '@/api/chatting'
	export default {
		data(){
			return{
				groupname:'',
				groupid:'',
				mumbers:'',
			};
		},
		onLoad(option){
            this.groupid = option.id;
			this.groupname = option.name;
			this.mumbers = option.mumbers;
		},
		methods:{
			//修改群名称
			editGroupName(){
				EditGroupsChatting({method:"put",id:this.groupid,name:this.groupname}).then(({ data })=>{
					if(data.status == 0){
                      uni.showToast({
                         title: '修改成功',
                         duration: 2000
                   });
				   uni.redirectTo({
				       url: '/pages/user-center/editGroup/modifychatting?id=' + this.groupid + '&mumbers=' + this.mumbers + '&name=' + this.groupname,
				       animationType: 'pop-in',
				       animationDuration: 200
				   });
					}
					
				})
			}
		},
		onNavigationBarButtonTap(val) {
			console.log("保存成功");
			this.editGroupName();
			// uni.redirectTo({
			//     url: '/pages/user-center/editGroup/modifychatting?id=' + this.groupid + '&mumbers=' + this.mumbers + '&name=' + this.groupname,
			//     animationType: 'pop-in',
			//     animationDuration: 200
			// });
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
