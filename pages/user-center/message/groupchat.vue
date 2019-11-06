<template>
	<!--发起群聊 -->
	<view id="groupchat">
		<view class="search"> 
			<uni-icon type="search"></uni-icon>
			<input type="text" placeholder="搜索"/>
		</view>
		<view class="userList">
			<!-- <form :model="GroupForm" ref="GroupForm"> -->
				<view class="list" v-for="(item,index) of followlist" :key="index">
					<view class="listimage">
						<image src="../../../static/image/face.jpg"></image>
					</view>
					<view class="userlist">
						<view class="listuser">{{item.user_name}}</view>
						<view class="checkbox">
							<checkbox-group name="checkbox" @change="checkboxChange()">
							    <checkbox style="transform:scale(0.7)" value="checkbox1" />
							</checkbox-group>
						</view>
					</view>
				</view>
			<!-- </form> -->
		</view>
		<view style="padding: 30upx 30upx;text-align: center;" @tap="assure()">
			<view>确定</view>
		</view>
	</view>
</template>

<script>
	import { searchFollow } from '@/api/usercenter'
	import { createdChatting } from '@/api/chatting.js'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {
			uniIcon
		},
		data(){
			return{
				user_name:'',
				followlist:[],
				checkbox1:'',
				// GroupForm: {},
			}
		},
		created(){
			this.search()
		},
		methods:{
			assure(){
				let name;
				this.followlist.forEach(item =>{
					name = item.user_name;
					console.log(name)
				})
				createdChatting({name:name}).then(res=>{
					if(res.data.status == 0){
						console.log(res.data.msg)
					} else {
						console.log(res.data.msg)
					}
					
				})
			},
			checkboxChange(){
				console.log("eeeee")
			},
			search() {
				searchFollow({
					followfans: ''
				}).then(res => {
					this.followlist = res.data.msg.follow_lst;
				})
			
			},
			onNavigationBarButtonTap(val) {
				console.log(val)
			    uni.showLoading({
			    	 title: '正在创建群聊'
			    })
				setTimeout(function () {
				    uni.hideLoading();
					uni.navigateTo({
						url:"/pages/user-center/message/chatting"
					});
				}, 2000);
			},
		},
		
	}
</script>

<style lang="scss">
	#groupchat{
		background-color: #efefef;
		height:100vh;
		width:100%;
		.search{
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 15upx 20upx;
			border-bottom: 2.083upx solid #c8c8cc;
		}
		.userList{
			width: 100%;
			padding: 20upx 0upx;
			&>view{	
			background-color: #FFFFFF;
			}
			.list{
				display: flex;
				align-items: center;
			}
			.listimage{
				padding:15upx;
				&>image{
					width: 100upx;
					height: 100upx;
					border-radius: 10%;
				}
			}
			.userlist{
				padding:35upx 30upx 25upx 30upx;
				width: 100%;
				border-bottom: 2.083upx solid #c8c8cc;
				display: flex;
				justify-content: space-between;
				
			}
			// .checkbox{
			// 	width:20upx;
			// 	height: 20upx;
			// }
			// .listuser{
			// 	
			// }
		}
		
	}
	
</style>
