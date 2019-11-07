<template>
	<!-- 消息首页 -->
	<view id="mymessage">
		<view class="list">
			<view class="list-left">
				<image src="../../../static/image/face.jpg"></image>
			</view>
			<view class="list-right">
				<view>张三</view>
				<view>上午10:12</view>
			</view>
		</view>
		<view class="list">
			<view class="list-left">
				<image src="../../../static/icons/notify.png"></image>
			</view>
			<view class="list-right">
				<view>提醒</view>
		        <view>昨天</view>
			</view>
		</view>
		<view class="list">
			<view class="list-left">
				<image src="../../../static/icons/notify.png"></image>
			</view>
			<view class="list-right">
				<view>组队群聊名称1</view>
		        <view>日期时间</view>
			</view>
		</view>
		<view class="list">
			<view class="list-left">
				<image src="../../../static/icons/notify.png"></image>
			</view>
			<view class="list-right">
				<view>回复</view>
		        <view>11月12日</view>
			</view>
		</view>
		<view class="list">
			<view class="list-left">
				<image src="../../../static/icons/notify.png"></image>
			</view>
			<view class="list-right">
				<view>通知</view>
		        <view>10月1日</view>
			</view>
		</view>
		<view class="list">
			<view class="list-left">
				<image src="../../../static/icons/notify.png"></image>
			</view>
			<view class="list-right">
				<view>自己建的群名称</view>
		        <view>昨天</view>
			</view>
		</view>
		<!-- 临时的一个创建群聊按钮，起作用的是导航栏的按钮 -->
		<view style="padding: 15upx;">
			<button type="primary" @tap="target('/pages/user-center/message/groupchat')">发起群聊</button>
		</view>
		<!-- //弹出创建群聊 -->
		<uni-popup ref="popup" type="right" :custom="true" :show="true">
			<view class="uni-logout">
				<view class="iconfont icon-message4xinxi"></view>
				<view @tap="target('/pages/user-center/message/groupchat')">发起群聊</view>
			</view>
		</uni-popup>
	</view>


</template>

<script>
	import { searchFollow } from '@/api/usercenter'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				user_name:'',
				followlist:[],

			};
		},
		created(){
			this.search()
		},
		methods: {
			target(url){
				uni.navigateTo({
					url
				});
				this.$refs.popup.close();
			},
			search() {
				searchFollow({
					followfans: ''
				}).then(res => {
					this.followlist = res.data.msg.follow_lst;
					console.log(res)
				})
			
			}


		},
		//发起群聊
		onNavigationBarButtonTap(val) {
			console.log(val.index);
			if (val.index == 0) {
				console.log("第一个按钮");
				this.$refs.popup.open()
			};
			if (val.index == 1) {
				// uni.reLaunch({
				// 	url:"/pages/joinPartner/creatPartner"
				// })
				console.log("第二个按钮");
			};
			if (val.index == 2) {
				// uni.reLaunch({
				// 	url:"/pages/joinPartner/creatPartner"
				// })
				console.log("第三个按钮");
			}
		}
	}
</script>

<style lang="scss">
	#mymessage {
		.list{
			width: 100%;
			padding: 15upx 0upx;
			display: flex;
			border-bottom: 2.083upx solid #c8c8cc;
			align-items: center;
		}	
		.list-left{
			padding: 15upx;
			
			&>image {
				width: 100upx;
				height: 100upx;
				border-radius: 10%;
			}
		}
		.list-right{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 35upx 30upx 25upx 30upx;
			width: 100%;
		}
		.uni-popup {
			position: absolute;
			width: 100%;
			display: flex;
			justify-content: flex-end;
			z-index: 998;
			overflow: hidden;
		}

		.uni-logout {
			background: #404040;
			color: #fff;
			display:flex;
			width:100%;
			.iconfont{
				padding: 0upx 10upx 0upx 20upx;
			}


			&>view {
				padding: 0upx 30upx 0upx 10upx;
				height: 118upx;
				border-bottom: 2.083upx solid #c8c8cc;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32upx;
			}
		}
	}
</style>
