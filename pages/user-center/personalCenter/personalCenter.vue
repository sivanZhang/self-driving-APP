<template>
	<view id="personCenter">
		<!-- 个人中心 -->
		<view class="header">
			<image  class="i" :src="'https://tl.chidict.com'+'/'+UserInfo.thumbnail_portait"></image>
			<view class="header-top">
				<span style=""></span>{{UserInfo.username||'用户'+UserInfo.phone}}</span>
				<view v-if="UserInfo.sex == '女'">
					<image src="/static/icons/women.png"></image>
				</view> 
				<view v-else>
					<image src="/static/icons/men.png"></image>
				</view>
			</view>
			<view class="header-main">
				<view style="padding: 15upx,0upx;">关注{{follow_count}}
					<span style="padding:0upx 15upx;">|</span></view>
				<view style="padding: 15upx,0upx;">粉丝{{fans_count}}
					<span style="padding:0upx 15upx;">|</span></view>
				<view style="padding: 15upx,0upx;">被赞与收藏0</view>
			</view>
			<view class="header-footer" style="">
				<button style="" type="text" @tap="target('/pages/user-center/personalCenter/editProfile')">编辑资料</button>
			</view>
		</view>
		<view class="middle">
			<span>个人介绍:</span>
			<view></view>
		</view>
		<view class="footer" style="">
			<view style="width: 50%;text-align: center;">动态</view>
			<view style="height: 100upx;">|</view>
			<view style="width: 50%;text-align: center;">足迹</view>
		</view>
	</view>
</template>

<script>
	import {
		searchFollow
	} from '@/api/usercenter'
	export default {
		data() {
			return {
				follow_count:null,
				fans_count:null,
			};
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			}
		},
		methods: {
			target(url) {
				uni.navigateTo({
					url
				})
			},
			search() {
				searchFollow({
					followfans: ''
				}).then(res => {
					this.follow_count = res.data.msg.follow_count;
					this.fans_count = res.data.msg.fans_count
					console.log(res)
				})

			}
		},
		created() {
			this.search();
		}
	}
</script>

<style lang="scss">
	#personCenter {
		.header {
			padding-top: 35upx;
			padding-bottom: 23upx;
			text-align: center;
			border-bottom: 2.083upx solid #c8c8cc;

			.i {
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
		}
	}
</style>
