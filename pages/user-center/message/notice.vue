<template>
	<view id="notice">
		<!-- 通知 -->
		<view>
			<block v-for="(item,index) of NoticeList" :key="index">
				<view class="container section">  
					<view class="detail">
						<view class="content">
							<view class="header">
								<image class="icon" src="/static/icons/notice.png"></image>
								<view class="tip">消息通知</view>
							</view>
							<view class="middle">
								<view class="title">{{item.title}}</view>
								<view class="name">
									{{item.content}}
								</view>
							</view>
							<view class="foot">
								<view class="time">{{item.modify_date| dateTimeFormat}}</view>
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
import dayjs from "dayjs"
import { look_Notice} from '@/api/notice.js'
export default {
	data() {
		return {
			NoticeList:[],
			index:1,
		}
	},
	onLoad() {
		this.getNoticeList();
	},
	methods:{
		getNoticeList(){
			look_Notice().then(({ data }) =>{			 
			    if(data.status === 0){
				    this.NoticeList = [...data.msg];
				    console.log(this.NoticeList)
			   }
			})
		},
	}
}
</script>

<style lang="scss" scoped>
	#notice{
		position: relative;
		padding-top:30upx;
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
					}
					.img {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						line-height: 1.8;
					} 
					.icon{
						width: 80upx;
						height: 80upx;
						display: inline-block;
					}
					.tip{
						padding-top:20upx;
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

