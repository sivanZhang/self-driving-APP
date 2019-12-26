<template>
	<!-- 里程排行榜 -->
	<!-- #ifdef H5 -->
	<view id="rank">
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view id="rank" :style="{backgroundImage: 'url('+imageURL+')',backgroundAttachment:'fixed',backgroundSize:'cover',backgroundPosition:'center'}">
			<!-- #endif -->
		<view class="top">
			<view class="top-item">
				<button class="top-item-total" :style="{background:background,
					color:color}" size="mini" @tap="lookrank_total">总榜</button>
				<button class="top-item-month" size="mini" @tap="lookrank_month">月榜</button>
			</view>
		</view>
		<view class="main">
			<view class="main-item-data">
				<view v-for="(item,index) of List2" :key="index">
					<view class="main-item-second" v-if="index==1">
						<view class="main-item-data-username">{{item.user_name}}</view>
						<image class="second-avatar" :src="'https://tl.chidict.com'+'/'+item.user__thumbnail_portait"></image>
						<view class="main-item-data-strokes">{{item.distance}}</view>
						<view class="main-item-data-unit">km</view>
					</view>
					<view class="main-item-first" v-if="index==0">
						<view class="main-item-data-username">{{item.user_name}}</view>
						<image class="first-avatar" :src="'https://tl.chidict.com'+'/'+item.user__thumbnail_portait"></image>
						<view class="main-item-data-strokes">{{item.distance}}</view>
						<view class="main-item-data-unit">km</view>
					</view>
					<view class="main-item-third" v-if="index==2">
						<view class="main-item-data-username">{{item.user_name}}</view>
						<image class="third-avatar" :src="'https://tl.chidict.com'+'/'+item.user__thumbnail_portait"></image>
						<view class="main-item-data-strokes">{{item.distance}}</view>
						<view class="main-item-data-unit">km</view>
					</view>
				</view>
			</view>
			<view class="main-item-grade">
				<image class="grade-second" src="/static/icons/second.png"></image>
				<image class="grade-first" src="/static/icons/first.png"></image>
				<image class="grade-third" src="/static/icons/third.png"></image>
			</view>
		</view>
		<view class="card">
			<view v-for="(item,index) of List" :key="index">
				<view class="card-item" v-if="index > 2">
					<view class="card-item-serial">
						{{index+1}}
					</view>
					<view class="card-item-avatar">
						<image class="avatar" :src="'https://tl.chidict.com'+'/'+item.user__thumbnail_portait"></image>
					</view>
					<view class="card-item-username">
						{{item.user_name}}
					</view>
					<view class="card-item-strokes">{{item.distance}}km</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<!-- <view class="bottom-background"></view> -->
			<view class="bottom-item">
				<view class="bottom-item-rank">{{rank}}</view>
				<view class="bottom-item-avatar">
					<image class="avatar" :src="'https://tl.chidict.com'+'/'+image"></image>
				</view>
				<view class="bottom-item-user">
					<view class="bottom-item-username">{{username}}</view>
					<view class="bottom-item-kilometers">{{distance}}km</view>
				</view>
				<button size="mini" class="bottom-item-share" @click="shareInfo">和好友比一比</button>
			</view>
		</view>
	</view>
</template>
<script>
	import share from "@/common/share.js";
	import uniCard from "@/components/uni-card/uni-card"
	import {
		Track_Rank,
	} from '@/api/track.js'
	export default {
		components: {
			uniCard
		},
		data() {
			return {
				background:'#262d37',
			    color:'white',
				thumbnail_portait:'',
				imageURL: '/static/image/background2.jpg',
				List:[],
				List2:[],
				distance:'',
				rank:'',
				username:'',
				info:'',
				image:''
			};
		},
		computed: {
			
		},
		methods: {
			lookrank_total(){
				let data = {
					year:''
				}
				Track_Rank(data).then(({
					data
				}) => {
					if(data.status === 0){
						this.background = '#262d37';
						this.color = 'white';
						this.List = [...data.msg];
					    this.List2 = this.List.slice(0,3)
						// console.log(data)
						// this.thumbnail_portait = "0"
						this.info = data.user_rank;
						this.rank = this.info.rank;
						this.username = this.info.user_name;
						this.distance = this.info.mileage;
						this.image = this.info.user__thumbnail_portait;
						// console.log(this.image)
					}
					// console.log(data)
				})
			},
			lookrank_month(){
				let data = {
					month:''
				}
				Track_Rank(data).then(({
					data
				}) => {
					if(data.status === 0){
						this.background = '#1d1e23'
						this.color = '#4a4b50'
						this.List = [...data.msg];
					    this.List2 = this.List.slice(0,3)
				        this.info = data.user_rank;
				        this.rank = this.info.rank;
				        this.username = this.info.user_name;
				        this.distance = this.info.mileage;
				        // console.log(this.info)
					}
					// console.log(data)
				})
			},
			shareInfo() {
				let shareInfo = {
					href: "https://uniapp.dcloud.io",
					title: "分享测试",
					desc: "分享测试",
					imgUrl: "/static/logo.png"
				};
				let shareList = [{
						icon: "/static/image/journey/sharemenu/wx.png",
						text: "微信好友",
					},
					{
						icon: "/static/image/journey/sharemenu/pyq.png",
						text: "朋友圈"
					},
					{
						icon: "/static/image/journey/sharemenu/weibo.png",
						text: "微博"
					},
					{
						icon: "/static/image/journey/sharemenu/qq.png",
						text: "QQ"
					},
					{
						icon: "/static/image/journey/sharemenu/copy.png",
						text: "复制"
					},
					{
						icon: "/static/image/journey/sharemenu/more.png",
						text: "更多"
					},
				];
				this.shareObj = share(shareInfo, shareList, function(index) {
					console.log("点击按钮的序号: " + index);
					let shareObj = {
						href: shareInfo.href || "",
						title: shareInfo.title || "",
						summary: shareInfo.desc || "",
						success: (res) => {
							console.log("success:" + JSON.stringify(res));
						},
						fail: (err) => {
							console.log("fail:" + JSON.stringify(err));
						}
					};
					switch (index) {
						case 0:
							shareObj.provider = "weixin";
							shareObj.scene = "WXSceneSession";
							shareObj.type = 0;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider = "weixin";
							shareObj.scene = "WXSenceTimeline";
							shareObj.type = 0;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 2:
							shareObj.provider = "sinaweibo";
							shareObj.type = 0;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 3:
							shareObj.provider = "qq";
							shareObj.type = 1;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 4:
							uni.setClipboardData({
								data: shareInfo.href,
								complete() {
									uni.showToast({
										title: "已复制到剪贴板"
									})
								}
							})
							break;
						case 5:
							plus.share.sendWithSystem({
								type: "web",
								title: shareInfo.title || "",
								thumbs: [shareInfo.imgUrl || ""],
								href: shareInfo.href || "",
								content: shareInfo.desc || "",
							})
							break;
					};
				});
				this.$nextTick(() => {
					this.shareObj.alphaBg.show();
					this.shareObj.shareMenu.show();
				})
			},

		},
		onLoad() {
			this.lookrank_total();
		},
		onShow(){
			
		},
	};
	
</script>

<style lang="scss">
	#rank{
		overflow-x: hidden;
		min-height: 100vh;
		position: relative;
		/* #ifdef H5 */
		background-image: url(~@/static/image/background2.jpg);
		background-size: cover;
		background-position: center;
		background-attachment:fixed;
		/* #endif */
		.first-avatar,.second-avatar,.third-avatar,.avatar{
			position: relative;
			left: 3%;
			width: 130rpx;
			height: 130rpx;
			border-radius: 50%;
			// box-shadow: 1px 1px 2px #F2F2F2;
			border: 1.5px solid #F2F2F2;
			background-color: #EFEFEF;
		}
		.top{
			position:fixed;
			z-index:10;
			background-color: #22262f;
			// margin:20upx 30upx;
			height:80upx;
			width:100%;
			color:#708090;
			font-size:32upx;
			.top-item{
				display:flex;
				flex-wrap: wrap;
				width:90%;
				background-color: #1d1e23;
			    border-radius: 20upx;
				margin-left:40upx;
				margin-top:10upx;
				button{
					background-color:#1d1e23;
					width:50%;
					text-align: center;
					color:#4a4b50;
				}
				button:hover{
					background:#262d37;
					color:white;
				}
			}
		}
	    .main{
			// position: absolute;
			margin-left:20upx;
			color:white;
			.main-item-data{
				display:flex;
				flex-wrap: nowrap;
				flex-direction: row;
				// justify-content:space-between;
				// display: -webkit-flex; /* Safari */
				font-size:32upx;
				image{
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
					margin-left:30upx;
					z-index:9;
					// position:absolute;
				}
					.main-item-data-username{
						// padding-left:30upx;
						margin-top:120upx;
						text-align: center;
					}
					.main-item-data-strokes{
						// padding-left:30upx;
						margin-top:170upx;
						text-align: center;
					}
					.main-item-data-unit{
						// margin-left:60upx;
						text-align: center;
					}
					.main-item-first{
						text-align: center;
			            margin-left:290upx; 
						margin-top:10upx;
						.first-avatar{
							margin-left:-30upx;
						}
					}
					.main-item-second{
						margin-top:170upx;
						margin-left:-780upx;
						.second-avatar{
							margin-left:325upx;
						}
					}
					.main-item-third{
						text-align: center;
						margin-top:200upx;
						margin-left:100upx;
						.third-avatar{
							margin-left:20upx;
						}
					}
			}
			.main-item-grade{
				position: absolute;
				display:flex;
				flex-wrap: nowrap;
				image{
					width:170upx;
					height:180upx;
				}
				.grade-first{
					margin-top:-380upx;
					margin-left:110upx;
				}
				.grade-second{
					margin-top:-330upx;
				}
				.grade-third{
					margin-top:-300upx;
					margin-left:110upx;
				}
			}
		}
	    .card{
			background-color:#C9D3FB;
			height:auto;
			width:94%;
			margin-left:22upx;
			margin-top:50upx;
			position:absolute;
			border-radius: 20upx;
			.card-item {
			    padding: 20upx;
			    position: relative;
			    display: -webkit-box;
			    display: -webkit-flex;
			    display: flex;
			    -webkit-box-align: center;
			    -webkit-align-items: center;
			    align-items: center;
			}
			
			.card-item-serial {
			    margin-right: .4em;
			    text-align: center;
				font-size:35upx;
			}
			.card-item-avatar {
			    margin-right: .8em;
			    width: 90upx;
			    height: 90upx;
				border-radius: 50%;
			    line-height: 80upx;
			    text-align: center;
			}
			
			.card-item-avatar image {
			    width: 100%;
			    max-height: 100%;
				border-radius: 50%;
				vertical-align: top;
			}
			
			.card-item-username {
			    -webkit-box-flex: 1;
			    -webkit-flex: 1;
			    flex: 1;
			    min-width: 0;
				font-size:35upx;
			}
			.card-item:before {
			    position: absolute;
			    z-index: 2;
			    -webkit-transform: scaleY(0.5);
			    transform: scaleY(0.5);
			    -webkit-transform-origin: 0 100%;
			    transform-origin: 0 100%;
			}
			
			.card-item-strokes {
			    text-align: right;
			    font-size: 35upx;
			}
		}
		.bottom{
			position:fixed;
			z-index:10;
			background:rgba(34,38,47,0.6);
			color:#FFFFFF;
			width:94%;
			height:120upx;
			margin-left:22upx;
			// margin-top:86%;
			bottom: 0upx;
			font-size:32upx;
			.bottom-item {
				display: flex;
				flex-wrap: wrap;
				// padding-top: 120upx;
				image{
					opacity: 1;
					z-index:11;
					margin-top: 20upx;
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					line-height: 80upx;
					text-align: center;
					left:10upx;
					border: 1.5px solid #F2F2F2;
					
				}
				.bottom-item-rank{
					padding-top: 30upx;
					padding-left:15upx;
				}
				.bottom-item-user{
					display: flex;
					flex-direction: column;
					padding-left:20upx;
					padding-top:10upx;
				}
				button{
					border-radius: 50upx;
					top: 28upx;
					color:#FFFFFF;
					left:110upx;
					height: 70upx;
					background:linear-gradient(to right, #C80808,#E56D00);
				}
			}
		}
	}
</style>
