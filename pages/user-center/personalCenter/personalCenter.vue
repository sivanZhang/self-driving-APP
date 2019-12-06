<template>
	<view id="personCenter">
		<!-- 个人中心 -->
		<view class="header">
			<image  class="img" :src="'https://tl.chidict.com'+'/'+thumbnail_portait"></image>
			<view class="header-top">
				<span >{{username||'用户'+UserInfo.phone}}</span>
				<view v-if="sex == '女'">
					<image src="/static/icons/women.png"></image>
				</view> 
				<view v-else>
					<image src="/static/icons/men.png"></image>
				</view>
			</view>
			<view class="header-main">
				<view class="header-edge">关注{{follow_count}}
					<span class="header-center">|</span></view>
				<view class="header-edge">粉丝{{fans_count}}
					<span class="header-center">|</span></view>
				<view class="header-edge">被赞与收藏0</view>
			</view>
			<!-- <view class="header-footer" >
				<button  type="text" @tap="target('/pages/user-center/personalCenter/editProfile')">编辑资料</button>
			</view> -->
		</view>
		<view class="middle">
			<span>个人介绍:</span>
			<view></view>
		</view>
		<view class="footer" >
			<view class="footer-edge">动态</view>
			<view class="footer-center">|</view>
			<view class="footer-edge">足迹</view>
		</view>
	</view>
</template>

<script>
	import {
		searchFollow,search_users
	} from '@/api/usercenter'
	export default {
		data() {
			return {
				follow_count:null,
				fans_count:null,
				thumbnail_portait:'',
				username:'',
				sex:'',
				id:'',
			};
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			},
			isLogin() {
				return this.$store.state.estateToken || uni.getStorageSync('estateToken')
			},
		},
		onShow() {
			this.searchUser();
		},
		onLoad(){
            this.search();
		},
		methods: {
			target(url) {
				uni.navigateTo({
					url
				})
			},
			//查看关注信息
			search() {
				searchFollow({
					followfans: ''
				}).then(res => {
					this.follow_count = res.data.msg.follow_count;
					this.fans_count = res.data.msg.fans_count
				})
			},
			//查看用户信息
			searchUser(){
				if(this.isLogin){
					this.id = this.$store.state.UserInfo.id;
						let data = '';
						data=this.id;
						search_users({userid: data}).then(({ data }) => {
							this.thumbnail_portait = data.msg[0].thumbnail_portait;
							this.sex = data.msg[0].sex;
							this.username = data.msg[0].username;
						})
				}
			},
		},
		
	}
</script>

<style lang="scss">
	#personCenter {
		.header {
			padding-top: 35upx;
			padding-bottom: 23upx;
			text-align: center;
			// border-bottom: 2.083upx solid #c8c8cc;

			.img {
				width: 185rpx;
				height: 185rpx;
				border-radius: 50%;
				box-shadow: 1px 1px 2px #F2F2F2;
				border: 1.5px solid #F2F2F2;
			}
		}

		.header-top {
			display: flex;
			justify-content: center;
			padding: 20upx;

			image {
				width: 45rpx;
				height: 35rpx;
				padding-left: 8upx;
				z-index: 2;
			}
		}

		.header-main {
			display: flex;
			justify-content: center;
		    .header-edge{
				padding:15upx 0upx;
			}
			.header-center{
				padding:0upx 15upx;
			}
		}

		.header-footer {
			padding-top: 25upx;

			button {
				width: 200upx;
				height: 75upx;
				font-size: 32upx;
			}
		}

		.middle {
			padding-left: 15upx;
			padding-top: 25upx;
			padding-bottom: 35upx;
			height: 100upx;
			display: flex;
			border-bottom: 2.083upx solid #c8c8cc;
		}

		.footer {
			padding-left: 15upx;
			padding-top: 25upx;
			padding-bottom: 35upx;
			height: 100upx;
			display: flex;
			border-bottom: 2.083upx solid #c8c8cc;
			.footer-edge{
				width: 50%;
				text-align: center;
			}
			.footer-center{
				height: 100upx;
			}
		}
	}
</style>
