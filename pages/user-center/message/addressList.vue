<template>
	<!-- 通讯录 -->
	<view id="mymessage">
        <view class="search">
			<uni-icon type="search"></uni-icon>
			<input type="text" placeholder="搜索" />
		</view>
        <view class="userList" style="padding:0">
        <view class="list" @tap="target('/pages/user-center/message/groupList')">
            <view class="listimage">
				<image src="../../../static/icons/tongxunlu.png"></image>
			</view>
			<view class="userlist1">
				<view>群聊</view>
			</view>
		</view>
        </view>
		<view class="userList">
			<!-- <form :model="GroupForm" ref="GroupForm"> -->
			<view class="list" v-for="(item,index) of followlist" :key="index" @tap="change(item)">
				<view class="listimage">
					<image :src="'https://tl.chidict.com'+'/'+item.user_protrait"></image>
				</view>
				<view class="userlist1">
					<view class="listuser">{{item.user_name}}</view>
				</view>
			</view>
			<!-- </form> -->
		</view>
    </view>
</template>
<script>
	import {
		searchFollow
	} from '@/api/usercenter'
	import {
		createdGroupsChatting
	} from '@/api/chatting.js'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				user_name: '',
				followlist: [],
				mumbers: '',
				checkbox1: '',
				checked: false,
				mumberid : '',
				groupname :'',
				mumbers :'',
			}
		},
		onLoad() {
			this.search()
		},
		computed: {
		},
		methods: {
			change(item) {
                this.mumberid = item.user_id;
                this.mumbers = item.user_id;
                this.mumbersname = item.user_name;
                uni.navigateTo({
					url: '/pages/user-center/message/chatting?id='+this.mumberid+'&mumbers='+this.mumbers+'&name='+this.mumbersname
				});	
			},
			search() {
				searchFollow({
					followfans: ''
				}).then(({
					data
				}) => {
					this.followlist = data.msg.follow_info;
				})
            },
            target(url) {
				uni.navigateTo({
					url
				});
			},
        },
        //导航栏的确认按钮（创建群聊）
			onNavigationBarButtonTap(val) {
				uni.showLoading({
					title: '正在创建群聊'
				})
				setTimeout(function() {
					uni.hideLoading();
					uni.navigateTo({
						url: '/pages/user-center/message/chatting?id='+this.groupid+'&mumbers='+this.mumbers+'&name='+this.groupname
					});
				}, 2000);
			},

	}
</script>

<style lang="scss">
	#mymessage {
		background-color: #efefef;
		height: 100vh;
		width: 100%;

		.search {
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 15upx 20upx;
			border-bottom: 2.083upx solid #c8c8cc;
        }
		.userList {
			width: 100%;
			padding: 20upx 0upx;

			&>view {
				background-color: #FFFFFF;
			}

			.list {
				display: flex;
				align-items: center;
			}

			.listimage {
				padding: 15upx;

				&>image {
					width: 80upx;
					height: 80upx;
					border-radius: 10%;
				}
			}

			.userlist1 {
				padding: 35upx 30upx 25upx 30upx;
				width: 100%;
				border-bottom: 2.083upx solid #c8c8cc;
				display: flex;
				justify-content: space-between;

			}
		}

	}
</style>
