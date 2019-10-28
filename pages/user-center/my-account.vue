<template>
	<view id="MyAccount">
		<view class="wall">
			
		</view>
		<view class="content">
			
			<view class="profile">
				<image src="/static/image/touxiang.png"></image> {{UserInfo.username||'用户'+UserInfo.phone}}
			</view>
			<view class="section" @tap="target('/pages/notifications/notification-list')">
				<view>
					<image class="icon" src="/static/icons/notify.png"></image>
					Notifications
				</view>
				<view>
					<block v-if="noticeData.length>0">
						<uni-badge type="error" class="badge" :text="String(noticeData.length)"></uni-badge>
					</block>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section">
				<view>
					<image class="icon" src="/static/icons/chatbox.png"></image>
					Chatbox
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section" @tap="target('/pages/user-center/user-settings')">
				<view>
					<image class="icon" src="/static/icons/setting.png"></image>
					Setting
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {GET_Notice} from '@/api/notice'
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {
			uniBadge,
			uniIcon,
		},
		data() {
			return {
				noticeData: [],
			};
		},
		computed:{
			UserInfo(){
				return this.$store.state.UserInfo
			}
		},
		methods:{
			target(url){
				uni.navigateTo({
					url
				})
			}
		},
		onLoad() {
			GET_Notice().then(res => {
				this.noticeData = res.data.msg;
				this.noticeData = this.noticeData.filter(item => item.fields.read == 0);
			})
		}
	};
</script>

<style lang="scss">
	#MyAccount {
		.wall{
			height: 250rpx;
			background: #007AFF;
		}
		.badge {
			background-color: #e60000 !important;
			font-size: 25upx !important;
		}

		.content{
			position:relative;
			top:-62.5rpx;
			.section {
				padding: 0 41.666upx;
				height: 125upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2.083upx solid #c8c8cc;
			
				&>view:nth-child(1) {
					font-weight: bold;
			
					.icon {
						width: 62.5upx;
						height: 62.5upx;
						display: inline-block;
						margin-right: 37.5upx;
					}
				}
			
				&>view:nth-child(2) {
					color: #c8c8cc;
					display: flex;
					align-items: center;
				}
			}
			
			.profile {
				padding: 0 31.25rpx;
				width: 100%;
				display:flex;
				align-items:flex-end;
				image{
					width: 125rpx;
					height: 125rpx;
					border-radius: 50%;
				}
			}
		}
	}
</style>
