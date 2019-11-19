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
		<view class="list" @tap="target('/pages/user-center/message/remind')">
			<view class="list-left">
				<image src="../../../static/icons/tixing.png"></image>
			</view>
			<view class="list-right">
				<view>提醒</view>
				<view>昨天</view>
			</view>
		</view>
		<view class="list">
			<view class="list-left">
				<image src="../../../static/image/face.jpg"></image>
			</view>
			<view class="list-right">
				<view>组队群聊名称1</view>
				<view>日期时间</view>
			</view>
		</view>
		<view class="list" @tap="target('/pages/user-center/message/reply')">
			<view class="list-left">
				<image src="../../../static/icons/huifu.png"></image>
			</view>
			<view class="list-right">
				<view>回复</view>
				<view>11月12日</view>
			</view>
		</view>
		<view class="list" @tap="target('/pages/user-center/message/notice')">
			<view class="list-left">
				<image src="../../../static/icons/tongzhi.png"></image>
			</view>
			<view class="list-right">
				<view>通知</view>
				<view>10月1日</view>
			</view>
		</view>
		<view v-for="(row,index) of groupList" :key="index" @longpress="longtap(row.id)">
			<!-- <view class="list"  @tap="deleteGroupList(row.id)"> -->
			<view class="list" @tap="target('/pages/user-center/message/chatting?id='+row.id+'&mumbers='+row.members+'&name='+row.name)">
				<view class="list-left">
					<image src="../../../static/image/face.jpg"></image>
				</view>
				<view class="list-right">
					<view>{{row.name}}</view>
					<view>{{row.time|dateFormat}}</view>
				</view>
				<!-- <view :data-userid="row.id" @tap="deleteGroupList(row.id)">
			</view> -->
			</view>
		</view>
		<!-- 临时的一个创建群聊按钮，起作用的是导航栏的按钮 -->
		<view style="padding: 15upx;">
			<button type="primary" @tap="target1('/pages/user-center/message/groupchat')">发起群聊</button>
		</view>
		<!-- //弹出创建群聊 -->
		<uni-popup ref="popup" type="right" :custom="true" :show="true">
			<view class="uni-logout">
				<view class="iconfont icon-message4xinxi"></view>
				<view @tap="target1('/pages/user-center/message/groupchat')">发起群聊</view>
			</view>
		</uni-popup>
	</view>


</template>

<script>
	import {
		LookGroupsChatting,
		DeleteGroupsChatting
	} from "@/api/chatting";
	import {
		searchFollow
	} from '@/api/usercenter'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				user_name: '',
				followlist: [],
				groupList: [],
				// 前台用户标志
				result: [],
				delBtnWidth: 60, //删除按钮宽度单位（rpx）
				startX: '',
				members: [],

			};
		},
		onLoad() {
			this.search();
			this.searchGroupList()
		},
		methods: {
			//长按事件
			longtap(e) {
				let id = e
				let that = this
				uni.showActionSheet({
					itemList: ['删除群组'],
					success: res => {
						if (res.tapIndex === 0) {
							uni.showModal({
								content: '删除后，将清空该群聊的消息记录',
								confirmColor: "#FF0000",
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										that.deleteGroupList(id);
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					}
				});
			},
			//查看群组
			searchGroupList() {
				LookGroupsChatting({
					mine: this.$store.state.UserInfo.id
				}).then(({
					data
				}) => {
					this.groupList = data.msg;
					this.groupid = data.msg.id;
				})
			},
			//删除群组
			deleteGroupList(id) {
				// setTimeout(() => {
				DeleteGroupsChatting({
					id: id,
					method:'delete'
				}).then(({
					data
				}) => {
					this.searchGroupList()
				})
				// },200)
			},
			target(url) {
				uni.navigateTo({
					url
				});
			},
			target1(url) {
				this.target(url);
				this.$refs.popup.close();
			},
			search() {
				searchFollow({
					followfans: ''
				}).then(res => {
					this.followlist = res.data.msg.follow_lst;
					console.log(res)
				})

			},
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
		.list {
			width: 100%;
			padding: 15upx 0upx;
			display: flex;
			border-bottom: 2.083upx solid #c8c8cc;
			align-items: center;
		}

		.list-left {
			padding: 15upx;

			&>image {
				width: 80upx;
				height: 80upx;
				border-radius: 10%;
			}
		}

		.list-right {
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
			display: flex;
			width: 100%;

			.iconfont {
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
