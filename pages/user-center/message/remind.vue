<template>
	<view id="remind">
		<!-- 提醒 -->
		<view>
			<block>
				<!-- <view v-if="AjaxData==''" class="text-center">No data.</view> -->
				<view class="container section">
					<!-- <view class="date">2019/10/12 12:00</view> -->
					<view class="detail">
						<view class="content">
							<view class="name">
								<span style="color: #0A98D5;padding-right: 15upx;">张三</span>赞了你的动态</view>
							<view class="p">
								<image src="../../../static/image/p10.jpg"></image>
							</view>
							<view class="time">2019/11/11 12:00</view>
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
	#remind {
		position: relative;
		padding-top: 30upx;

		.section {
			.detail {
				display: flex;
				justify-content: space-between;
				padding: 20.833rpx;
				min-height: 212.5upx;
				border: 2.083upx solid #ececec;
				box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
				font-size: 27.083upx;

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

					.p {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						line-height: 1.8;

						&image {
							width: 80%;
							height: 80%;
							padding: 10upx;
						}
					}
					.time{
						padding-top: 20upx;
					}
				}
			}
		}

	}
</style>
