<template>
	<view id="tongzhi">
		<!-- 通知 -->
		<view>
			<block>
				<!-- <view v-if="AjaxData==''" class="text-center">No data.</view> -->
				<view class="container section">
					<!-- <view class="date">2019/10/12 12:00</view> -->
					<view class="detail">
						<view class="content">
							<view class="header">
								<image class="icon" src="/static/icons/notify.png"></image>
								<view class="tip">通知1</view>
							</view>
							<view class="middle">
								<view class="title">群聊通知</view>
								<view class="name">
									您已加入<span style="color: #0A98D5;">张三</span>的组队和群聊
								</view>
							</view>
							<!-- <view class="img">dunaluo</view> -->
							<view class="foot">
								<view class="time">2019/10/12 15:30</view>
								<view>
									<uni-icon type="arrowright"></uni-icon>
								</view>
							</view>
						</view>
					 </view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import uniIcon from "@/components/uni-icon/uni-icon.vue"
export default {
	components: {
		uniIcon,
	},
}
</script>

<style lang="scss" scoped>
	#tongzhi{
		position: relative;
		padding-top:30upx;
		.section {
			.detail {
				display: flex;
				justify-content: space-between;
				padding: 20.833rpx;
				min-height: 212.5upx;
				border: 2.083upx solid #ececec;
				box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
				font-size: 27.083upx;
		
				.operation {
					flex: 1 1 20%;    
					display: flex;
					flex-flow: column nowrap;
					justify-content: space-between;
					text-align: right;
				}
		
				.content {
					flex: 0 1 100%;  
					width: 0;
					font-size: 27.083upx;
					.header{
						background-color:#DDDDDD;
						display:flex;
						margin:-20upx;
						height:80upx;
						padding-top:20upx;
						
					}   
					.img {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						line-height: 1.8;
					}
					.icon{
						width: 40upx;
						height: 40upx;
						display: inline-block;
						margin-left:20upx;
					}
					.tip{
						margin-left:16upx;
						font-size:30upx;
					}
					.middle{
						padding-top:20upx;
						padding-bottom:40upx;
					}
					.title{
						// font-weight: 600;
						font-weight:bold;
						font-size: 35upx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						line-height: 1.8;
						padding-top:20upx;
						padding-left:10upx;
					}
		            .name{
						padding-left:10upx;
						color:#C7C6CD;
						font-size:28upx;
					}
					.time{
						font-size:26upx;
						color: #BBBBBB;
						padding-top: 10upx;
						padding-left:10upx;
					}
					.foot{
						border-top:1upx #EEEEF5 solid;
						display: flex;
						justify-content: space-between;
						height:50upx;
						&>view:nth-child(2) {
							color: #c8c8cc;
							padding-top: 10upx;
							padding-right:0;
							display: flex;
						}
					}
				}
			}
			}
		
	}
</style>

