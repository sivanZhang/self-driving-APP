<template>
	<view id="rewardDetail">
		<!-- 悬赏详情 -->
		<view class="top">
			<view class="header">
				<image src="../../../static/image/p10.jpg"></image>
				<view class="header-name">张三</view>
				<view style="border: 1px solid #DF5000;color:#DF5000 ;" class="header-right" v-if="followClick" @tap="follow">
					<view style="font-size: 24upx;" class="iconfont icon-jiahao"></view>
					<view>关注</view>
				</view>
				<view style="border: 1px solid #c8c8cc;" class="header-right" v-else @tap="follow">
					<view style="font-size: 24upx;" class="iconfont icon-duigou"></view>
					<view >已关注</view>
				</view>
			</view>
			<view class="header-body">
			    <view class="list">
					<span style="font-weight: bold;padding-right: 15upx;">赏金:</span>1000元
				</view>
				<view style="padding:0upx 10upx;font-size: 32upx;">
					<span style="font-weight: bold;padding-right: 15upx;">路线:</span>西安-北京
				</view>
				<view class="list">
					<span style="font-weight: bold;padding-right: 15upx;">时间:</span>2019/11/11
				</view>
				<block>
					<view class="forwardContent">
						<view >
							<span style="font-weight: bold;padding-right: 15upx;">悬赏内容:</span>谁和我一起去
						</view>
					</view>
				</block>
				<view class="body-footer">
					<view style="padding: 5upx 10upx;" class="iconfont icon-xingxing"></view>
					<view style="padding: 5upx 20upx;font-size: 48upx;" class="iconfont icon-shenglvehao"></view>
				</view>
			</view>
		</view>
		<view class="main">
			<button type="default" size="mini" @tap="showAnswer">回答</button>
		</view>
		<view class="answer" v-if="showanswer">
			<view class="answer-user">
				<view class="user-name">
					<image src="../../../static/image/face.jpg"></image>
					<view style="font-size: 34upx;padding: 20upx;">李四</view>
				</view>
				<view class="icons">
					<view>
						<view v-if="click" @click="changedianzan">
							<view class="iconfont icon-dianzan"></view>
						</view>
						<view v-else @click="changedianzan">
							<view class="iconfont icon-dianzan" style="color: #EE2222;"></view>
						</view>
					</view>
					<view>
						<view v-if="click1" @click="changeshoucang">
							<view class="iconfont icon-yidianzan"></view>
						</view>
						<view v-else @click="changeshoucang">
							<view class="iconfont icon-yidianzan" style="color: #EE2222;"></view>
						</view>
					</view>
					
				</view>				
			</view>
		    <view class="answer-data">
				2019/10/12
			</view>
			<block>
				<view class="answer-content">
					<view >
						<span style="font-weight: bold;padding-right: 15upx;">回答内容:</span>我很喜欢这里
					</view>
				</view>
			</block>
		</view>
		<view class="handle">
			<view>
				<button type="default" size="mini">写回答</button>
			</view>
			<view>
				<button type="default" size="mini">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				followClick:true,
				click: true,
				click1: true,
				showanswer:false,
			};
		},
		methods:{
			follow(){
				this.followClick = !this.followClick;
			},
			showAnswer(){
				this.showanswer = !this.showanswer
			},
			changedianzan(){
				this.click = !this.click
			},
			changeshoucang(){
				this.click1 = !this.click1
			}
		},
	}
</script>

<style lang="scss">
	#rewardDetail {
		.top{
			border-bottom: 2.083upx solid #c8c8cc;
		}
		.header {
			padding: 30upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			&>image {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
			}
            .header-name{
				font-size: 34upx;
				 padding: 20upx;
			}
			.header-right {
				font-size: 24upx;
                width:15%;
				height: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 18%;
			}
		}
		.header-body{
			padding: 15upx 30upx 15upx 30upx;
			font-size: 27.083upx;
			.list{
				padding: 10upx 10upx;
				font-size: 32upx;
			}
		    .body-footer{
				display: flex;
				justify-content: flex-end;
			}
		}
		.forwardContent{
			font-size: 32upx;
			padding: 10upx 0upx;
			&>view{
				padding: 10upx;
				min-height: 100upx;
				border: 2.083upx solid #ececec;
				box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
			}
		}
		.main{
			padding: 25upx 0upx;
			display: flex;
			justify-content: center;
			
		}
		.answer{
			padding: 25upx 0upx;
			border-top: 2.083upx solid #c8c8cc;
			border-bottom: 2.083upx solid #c8c8cc;
			.answer-user{
				display: flex;
				justify-content: space-between;
				align-items:center;
	           .user-name{
				   
				   padding: 30upx;
				   display: flex;
				   justify-content: flex-start;
				   align-items: center;
				   &>image{
					   width: 100upx;
					   height: 100upx;
					   border-radius: 50%;
				   }
			   }
			   .icons{
				   padding: 0upx 30upx;
				   display: flex;
				   justify-content: flex-end;
				   &>view{
					   padding: 0upx 20upx;
				   }
			   }
			}
		}
		.answer-data{
			font-size: 32upx;
			padding: 0upx 30upx;
		}
		.answer-content{
			font-size: 32upx;
			padding: 10upx 30upx;
			&>view{
				padding: 10upx;
				min-height: 100upx;
				border: 2.083upx solid #ececec;
				box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
			}
		}
		.handle{
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 25upx 0upx;
			&>view{
				padding: 0upx 90upx;
			}
		}
	}
</style>
