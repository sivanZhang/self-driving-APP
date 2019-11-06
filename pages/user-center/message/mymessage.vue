<template>
	<!-- 消息 -->
	<view id="mymessage">
		<view class="">
			<view @tap="target('/pages/user-center/message/groupchat')">发起群聊</view>
		</view>
		<uni-popup ref="popup" type="right" :custom="true" :show="true">
			<view class="uni-logout">
				<view class="iconfont icon-message4xinxi"></view>
				<view @tap="target('/pages/user-center/message/groupchat')">发起群聊</view>
				<!-- <view>添加朋友</view> -->
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
