<template>
<!-- 搭伴展示页 -->
    <view id="teamDetail">
        <block v-for="(item,index) of TeamList" :key="index">
			<view class="container section">
				<view class="detail">
					<view class="content">
						<view class="footer-left">
							<image src="../../static/image/p10.jpg"></image>
							<view>{{ item.creator_name }}</view>
						</view>
						<view class="name">
							<span style="font-weight: bold;">路线：</span>
							{{ item.line.content }}
						</view>
						<view style="font-size: 32upx;">
							<span style="font-weight: bold;">时间：</span>
							{{ item.line.start_date | dateFormat }}--{{ item.line.end_date | dateFormat }}
						</view>
						<block>
							<view class="forwardContent">
								<view>搭伴说明：{{ item.content }}</view>
							</view>
						</block>
						<view class="footer">
							<view class="footer-right">
								<view>评论：3</view>
								<view>报名：{{ item.number }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
    </view>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    props: ["TeamList"],
    methods:{

    }
}
</script>
<style lang="scss">
#teamDetail{
    	.section {
		padding-top: 25upx;

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
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					line-height: 1.8;
					font-size: 32upx;
				}
				.footer-left {
					width: 50%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					& > image {
						width: 60upx;
						height: 60upx;
						border-radius: 50%;
					}
					& > view {
						padding-left: 10upx;
					}
				}
				.forwardContent {
					font-size: 32upx;
					padding: 10upx 0upx;
					& > view {
						padding: 10upx;
						min-height: 100upx;
						border: 2.083upx solid #ececec;
						box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
					}
				}

				.footer {
					padding: 10upx;
					display: flex;
					justify-content: flex-end;
					.footer-right {
						display: flex;
						align-items: center;
						& > image {
							width: 60upx;
							height: 60upx;
							border-radius: 50%;
						}
						& > view {
							padding-left: 10upx;
						}
					}
				}
			}
		}
	}
}
</style>