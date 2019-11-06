<template>
	<view id="modifychatting">
		<view class="header-image">
			<view class="imagesize"><image src="../../../static/image/q.jpg"></image></view>
			<view class="imagesize"><image src="../../../static/image/face.jpg"></image></view>
			<view class="imagesize"><image src="../../../static/image/p10.jpg"></image></view>
			<view  class="iconfont icon-tianjia"></view>
			<view  class="iconfont icon-jian"></view>
		</view>
		<view class="main">
			<view class="main-body" @tap="target('/pages/user-center/editGroup/groupName')">
				<view>群聊名称</view>
				<view class="main-name">
					<view>嗨自驾</view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
				
			</view>
			<view class="main-body" @tap="target('/pages/user-center/editGroup/GroupAnnouncement')">
				<view>群公告</view>
				<uni-icon type="arrowright"></uni-icon>
			</view>
			</view>
			<view style="padding: 0upx;">
				<view class="main-body">
					<view>查找聊天记录</view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view style="padding:20upx 0upx;">
				<view class="main-body">
					<view>消息免打扰</view>
					<switch style="transform:scale(0.7)"></switch>
				</view>
				<view class="main-body">
					<view>置顶聊天</view>
					<switch style="transform:scale(0.7)"></switch>
				</view>
			</view>
			<view style="padding-bottom: 20upx;" @tap="emptyhistory()">
				<view class="main-body">
					<view>清空聊天记录</view>
				</view>
			</view>
		<view class="footer">
			<view style="color:#FF0000" @tap="deleteExit()">
				删除并退出
			</view>
		</view>
	</view>
</template>

<script>
    import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {
			uniIcon
		},
		data() {
			return {

			};
		},
		methods: {
			target(url){
				uni.navigateTo({
					url
				});
			},
			//清空聊天记录
			emptyhistory(){
				uni.showModal({
				    content: '确定删除群的聊天记录吗？',
					confirmText:"清空",
					confirmColor:"#FF0000",
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			//删除并退出
			deleteExit(){
				uni.showModal({
				    content: '删除并退出后，将不再接收此群聊消息',
					confirmColor:"#FF0000",
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}

		},
	}
</script>

<style lang="scss">
	#modifychatting {
		background-color: #efefef;
		height:100vh; 
		width:100%;

		.header-image {
			background-color: #FFFFFF;
			padding: 25upx 15upx;
			display: flex;
			align-items: center;
			
		}
		.imagesize{
				padding:15upx;
				&>image{
					width: 110upx;
					height: 110upx;
					border-radius: 10%;
				}
		}
		.iconfont{
			padding:15upx;
			font-size: 110upx;
		}
        .main{
			padding: 20upx 0upx;
			
		}
		.main-body{
			background-color: #FFFFFF;
			padding: 20upx;
			display: flex;
			align-items: center;
			border-bottom: 2.083upx solid #efefef;
			justify-content: space-between;
			.main-name{
				color: #c8c8cc;
				display: flex;
				align-items: center;
			}
			.uni-icon{
				color: #c8c8cc;
			}
		}
		.footer{
			background-color: #FFFFFF;
			text-align: center;
			padding:20upx 0upx;
			&>view{
				padding: 15upx;
			}
		}
	}
</style>
