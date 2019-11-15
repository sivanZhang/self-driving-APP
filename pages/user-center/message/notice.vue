<template>
	<view id="notice">
		<!-- 通知 -->
		<view>
			<block v-for="(item,index) of NoticeList" :key="index">
				<!-- <view v-if="AjaxData==''" class="text-center">No data.</view> -->
				<view class="container section">  
					<!-- <view class="date">2019/10/12 12:00</view> -->
					<view class="detail" @tap="listTap" @longpress="onLongPress" :class="{'active':pickerUserIndex==index}" :key="index" :data-index="index">
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
							<!-- <view class="img">dunaluo</view> -->
							<view class="foot">
								<view class="time">{{item.modify_date| dateTimeFormat}}</view>
								<view>
									<uni-icon type="arrowright"></uni-icon>
								</view>
							</view>
							<view class="shade" v-show="showShade" @tap="hidePop">
								<view class="pop" :style="popStyle" :class="{'show':showPop}">
									<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu" :data-index="index">{{item}}</view>
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
import dayjs from "dayjs"
import { look_Notice} from '@/api/notice.js'
export default {
	data() {
		return {
			NoticeList:[],
			index:1,
			userList: [],
			/* 窗口尺寸 */
			winSize: {},
			/* 显示遮罩 */
			showShade: false,
			/* 显示操作弹窗 */
			showPop: false,
			/* 弹窗按钮列表 */
			popButton: ["修改状态", "删除该通知", ],
			/* 弹窗定位样式 */
			popStyle: "",
		}
	},
	components: {
		uniIcon,
	},
	onLoad() {
		this.getWindowSize();
		// #ifdef H5
		document.onLong = function(e) {
			var e = e || window.event;
			e.preventDefault();
		};
		// #endif
		this.getNoticeList();
	},
	methods:{
		getNoticeList(){
			look_Notice().then(({ data }) =>{			 
			    if(data.status === 0){
				    this.NoticeList = [...data.msg];
				    console.log("----------")
				    console.log(this.NoticeList)
			   }
			})
		},
		target(url) {
			uni.navigateTo({
				url
			})
		},
		listTap() {
			/* 因弹出遮罩问题，所以需要在遮罩弹出的情况下阻止列表事件的触发 */
			if (this.showShade) {
				return;
			}
			console.log("列表触摸事件触发")
			let data = {
				id: this.PhoneNumber,
				password: this.Password,
			};
		},
		getWindowSize() {
			uni.getSystemInfo({
				success: (res) => {
					this.winSize = {
						"width": res.windowWidth,
						"height": res.windowHeight
					}
				}
			})
		},
		onLongPress(e) {
			let [touches, style, index] = [e.touches[0], "", e.currentTarget.dataset.index];
			/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
			if (touches.clientY > (this.winSize.height / 2)) {
				style = `bottom:${this.winSize.height-touches.clientY}px;`;
			} else {
				style = `top:${touches.clientY}px;`;
			}
			if (touches.clientX > (this.winSize.witdh / 2)) {
				style += `right:${this.winSize.witdh-touches.clientX}px`;
			} else {
				style += `left:${touches.clientX}px`;
			}
			this.popStyle = style;
			this.showShade = true;
			this.$nextTick(() => {
				setTimeout(() => {
					this.showPop = true;
				}, 10);
			});
		},
		hidePop() {
			this.showPop = false;
			this.pickerUserIndex = -1;
			setTimeout(() => {
				this.showShade = false;
			}, 250);
		},
		pickerMenu(e) {
			let index = Number(e.currentTarget.dataset.index);
			if (this.showShade) {
				return;
			}
			console.log("列表触摸事件触发")
		// 	console.log(`第1条通知,第${index+1}个按钮`);
		// 	// 在这里开启你的代码秀
		
		// 	uni.showToast({
		// 		title: `第1条通知,第${index+1}个按钮`,
		// 		icon: "none",
		// 		mask: true,
		// 		duration: 600
		// 	});
		
			/* 
			 因为隐藏弹窗方法中会将当前选择的用户下标还原为-1,
			 如果行的菜单方法存在异步情况，请在隐藏之前将该值保存，或通过参数传入异步函数中
			 */
			this.hidePop();
		}
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
		.shade {
			position: fixed;
			z-index: 100;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			-webkit-touch-callout: none;
		
			.pop {
				position: fixed;
				z-index: 101;
				width: 200upx;
				box-sizing: border-box;
				font-size: 28upx;
				text-align: left;
				color: #333;
				background-color: #fff;
				box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
				line-height: 80upx;
				transition: transform 0.15s ease-in-out 0s;
				user-select: none;
				-webkit-touch-callout: none;
				transform: scale(0, 0);
		
				&.show {
					transform: scale(1, 1);
				}
		
				&>view {
					padding: 0 20upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					user-select: none;
					-webkit-touch-callout: none;
		
					&:active {
						background-color: #f3f3f3;
					}
				}
			}
		}
		
	}
</style>

