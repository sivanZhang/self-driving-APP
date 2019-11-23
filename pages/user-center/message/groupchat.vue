<template>
	<!--发起群聊 -->
	<view id="groupchat">
		<view class="search">
			<uni-icon type="search"></uni-icon>
			<input type="text" placeholder="搜索" />
		</view>
		<view class="userList">
			<!-- <form :model="GroupForm" ref="GroupForm"> -->
			<view class="list" v-for="(item,index) of followlist" :key="index" @tap="change(item)">
				<view class="listimage">
					<image src="../../../static/image/face.jpg"></image>
					<!-- <image :src="'https://tl.chidict.com'+'/'+item.user_protrait"></image> -->
				</view>
				<view class="userlist1">
					<view class="listuser">{{item.user_name}}</view>
					<view class="checkbox">
						<checkbox-group @change="checkboxChange">
							<view>
								<checkbox style="transform:scale(0.7)" :value="item.user_id" :checked="item.checked" />
							</view>
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
				num: [],
				checked: false,
				groupid: '',
				groupname: '',
				// GroupForm: {},
			}
		},
		onLoad() {
			this.search()
		},
		computed: {
			// UserInfo() {
			// 	return this.$store.state.UserInfo
			// }
		},
		methods: {
			change(item) {
				this.num.push(item.user_id);
				this.mumbers = this.num.map(item => item).join(',')
				this.checkboxChange(item.user_id);
			},
			checkboxChange(e) {
				var items = this.followlist;
				var values = String(e);
				// console.log(values)
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.user_id)) {
						// if (values.indexOf(item.user_id) >= 0) {
						this.$set(item, 'checked', true)
						}
					// } else {
					// 	this.$set(item, 'checked', false)
					// }
				}
			},
			assure() {
				let data = '';
				data = this.$store.state.UserInfo.id;
				createdGroupsChatting({
					member_ids: this.mumbers
				}).then(res => {
					if (res.data.status == 0) {
						// this.mumbers = '';
						this.groupid = res.data.msg.groupid;
						this.groupname = res.data.msg.groupname;
						uni.navigateTo({
							url: '/pages/user-center/message/chatting?id=' + this.groupid + '&mumbers=' + this.mumbers + '&name=' + this.groupname
						});
					}
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
			//导航栏的确认按钮（创建群聊）
			onNavigationBarButtonTap(val) {
				// console.log(val)
				let data = '';
				data = this.$store.state.UserInfo.id;
				// createdGroupsChatting({
				// 	member_ids: this.mumbers
				// }).then(res => {
				// 	if (res.data.status == 0) {
				// 		// this.mumbers = '';
				// 		this.groupid = res.data.msg.groupid;
				// 		this.groupname = res.data.msg.groupname;
				// 		uni.showLoading({
				// 			title: '正在创建群聊'
				// 		})
				// 		setTimeout(function() {
				// 			uni.hideLoading();
							uni.navigateTo({
								url: '/pages/user-center/message/chatting?id=' + this.groupid + '&mumbers=' + this.mumbers + '&name=' + this.groupname
							});
				// 		}, 2000);
				// 	}
				// });

			},
		},

	}
</script>

<style lang="scss">
	#groupchat {
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
					width: 100upx;
					height: 100upx;
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
