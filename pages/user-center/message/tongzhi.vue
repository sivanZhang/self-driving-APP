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
							<view class="name">
								您已加入<span style="color: #0A98D5;">张三</span>的组队和群聊
							</view>
							<!-- <view class="img">dunaluo</view> -->
							<view class="time">2019/10/12 15:30</view>
						</view>
					 </view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
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
		
					.name {
						// font-weight: 600;
						font-size: 29.166upx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						line-height: 1.8;
					}
		
					.img {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						line-height: 1.8;
					}
					.time{
						padding-top: 20upx;
					}
				}
			}
			}
		
	}
</style>

