<template>
	<!--	<view id="home">
		<view class="header">
			<view class="title">
				Home
				<view class="hint">
					<template v-if="noticeData.length > 0">
						<image @tap="target('/pages/notifications/notification-list')" src="/static/icons/bell.png" mode="aspectFit"></image>
						<view class="badge">
							<uni-badge type="error" :text="String(noticeData.length)"></uni-badge>
						</view>
					</template>
					<template v-else>
						<image @tap="target('/pages/notifications/notification-list')" src="/static/icons/bell.png" mode="aspectFit"></image>
					</template>
				</view>
			</view>
		</view>
		<view class="main"> -->
	<!-- 		<view class="mask">
				<view class="left" @tap="target('/pages/notifications/new-list')">
					<image src="/static/icons/laba.svg"></image>
					<view class="tag-p">All News</view>
					<uni-icon type="arrowdown" size="18" style="color: #c8c8c8;"></uni-icon>
				</view>
				<view v-if="newsListData.length" class="right" @tap="target('/pages/notifications/new-detail?id='+newsListData[0].pk)">
					<view class="notice">
						{{ notice }}
					</view>
					<uni-icon type="arrowright" size="18" style="color: #c8c8c8;"></uni-icon>
				</view>
				<view v-else class="right">No news</view>
			</view>
		</view> 
	</view>-->
	<view id="page-body">
		<view class="header">
			<image  class="img" :src="'https://tl.chidict.com'+'/'+thumbnail_portait" ></image>
			<span class="header-right">{{username||'用户'+UserInfo.phone}}</span>
			<view class="header-right">
				<view class="header-top-center" v-if="followClick" @tap="follow">
					<view  class="iconfont icon-jiahao"></view>
					<view>关注</view>
				</view>
				<view  class="header-top-right"  v-else @tap="follow">
					<view  class="iconfont icon-duigou"></view>
					<view>已关注</view>
				</view>
			</view>
			
		</view>
		
	  
		<view class="content">
			<view >10月11日</view>
			
			<image class="getposition" src="../../static/image/position.png" @click="chooseLocation"></image>
			<block v-if="hasLocation === false">
				<view >未选择位置</view>
			</block>
			<block v-if="hasLocation === true">
				<view >
					{{locationAddress}}
				</view>
			</block>
			
			<view class="uni-label" >数量限制</view>
			<picker :range="count" @change="countChange" mode="selector">
				<view class="uni-input" >{{count[countIndex]}}</view>
			</picker>

			<view class="uni-uploader-info" >{{imageList.length}}/{{count[countIndex]}}</view>
			<view class="uni-uploader-body">
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">
						<view class="uni-uploader__file">
							<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage" mode="aspectFill"></image>
							<image src="../../static/image/journey/de.png" class="remove" :data-index="index" @tap='deleteImage' ></image>

						</view>
					</block>
					<view class="uni-uploader__input-box">
						<view class="uni-uploader__input" @tap="chooseImage"></view>
					</view>
				</view>
			</view>
		</view>

      <view class="uni-padding-wrap" >
		  <view class="header-right">
      	<image  class="img" :src="'https://tl.chidict.com'+'/'+thumbnail_portait" ></image>
	         <image class="share"
	             src="../../static/image/journey/s.png" @click="shareInfo">
	         	</image> 
	         </view>
      		<image class="getposition" src="../../static/image/position.png" @click="chooseLocation"></image>
      		<block v-if="hasLocation === false">
      			<view >未选择位置</view>
      		</block>
      		<block v-if="hasLocation === true">
      			<view >
      				{{locationAddress}}
      			</view>
      		</block>
      					
      		<image class="picture" src="../../static/image/journey/1.jpg"></image>							
      		<image class="picture" src="../../static/image/journey/2.jpg"></image>
      		<image class="picture" src="../../static/image/journey/3.jpg"></image>
      			<div class="heart" id="like2" rel="like"></div>
      			<text >点赞</text>
      			<image class="footer" src="../../static/image/journey/l.png">
      			</image>
      			<text >评论</text>
      			<image class="footer" src="../../static/image/journey/collection.png">
      			</image>
      			<text >收藏</text>
      </view>
      
	</view>
</template>

<script>
	// 	import {GET_Notice,GET_News} from '@/api/notice'
	// 	import dayjs from "dayjs";
	// 	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	// 	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	// 	export default {
	// 		components: {
	// 			uniBadge,
	// 			uniIcon
	// 		},
	// 		data() {
	// 			return {
	// 				noticeData: [],
	// 				newsListData: [],
	// 				notice: '',
	// 			};
	// 		},
	// 		methods: {
	// 			target(url) {
	// 				uni.navigateTo({
	// 					url
	// 				});
	// 			}
	// 		},
	// 		onLoad() {
	// 			const Token = this.$store.state.estateToken || uni.getStorageSync('estateToken');
	// 			if (!Token) {
	// 				uni.navigateTo({
	//         url:"/pages/login/login-page"
	//     })
	// 			} else {
	// 				GET_Notice().then(res => {
	// 					this.noticeData = [...res.data.msg];
	// 					this.noticeData = this.noticeData.filter(item => item.fields.read == 0);
	// 				});
	// 				GET_News().then(res => {
	// 					this.newsListData = [...res.data.msg];
	// 					this.notice = this.newsListData[0].fields.title;
	// 				});
	// 			}
	// 
	// 		}
	// 	}
	
	import share from "@/common/share.js";
	var util = require('../../common/util.js');
	var formatLocation = util.formatLocation;
    import {
    	search_users
    } from '@/api/usercenter'
	
	import permision from "@/common/permission.js"
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']  
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	
	export default {
		data() {
			return {
				id:'',
				username:'',
				thumbnail_portait: '',
				followClick: true,
				hasLocation: false,
				location: {},
				locationAddress: '',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		onBackPress() {
			//监听back键，关闭弹出菜单
			if (this.shareObj.shareMenu.isVisible()) {
				this.shareObj.shareMenu.hide();
				this.shareObj.alphaBg.hide();
				return true
			}
		},
		onUnload() {
			this.imageList = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
				
		},
       onLoad(){
		   
		  
	   },
	   onShow(){
		   this.search();
	   },
	   computed: {
	   	UserInfo() {
	   		return this.$store.state.UserInfo
	   	},
	    isLogin() {
	  	return this.$store.state.estateToken || uni.getStorageSync('estateToken')
	    },
	   },
		methods: {
			follow() {
				this.followClick = !this.followClick;
			},
			search() {
				
				if( this.isLogin ){
					this.id = this.$store.state.UserInfo.id;  				
						let data = '';
						data = this.id;
						search_users({
							userid: data
						}).then(({
							data
						}) => {
							this.thumbnail_portait = data.msg[0].thumbnail_portait;
							this.username = data.msg[0].username;								
						})
				}				
			},
			
			
			chooseLocation: function() {
				uni.chooseLocation({
					success: (res) => {
						this.hasLocation = true,
							this.location = formatLocation(res.longitude, res.latitude),
							this.locationAddress = res.address
					}
				})
			},
			//删除图片
			deleteImage: function(e) {
				var index = e.target.dataset.index;
				var that = this;
				var images = that.imageList;
				images.splice(index, 1);
				that.imageList = images;
			},


			sourceTypeChange: function(e) {
				this.sourceTypeIndex = parseInt(e.target.value)
			},
			sizeTypeChange: function(e) {
				this.sizeTypeIndex = parseInt(e.target.value)
			},
			countChange: function(e) {
				this.countIndex = e.target.value;
			},
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif

				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},


			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}

				return status;
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
		}


	}
</script>

<style scoped lang="scss">
	#page-body {
		padding-top:10%;
		width: 100%;
		background-color: #3B4144;
		overflow-x: hidden;
		.header{
			padding:2%;
			width:100%;
			background-color: #DAC2A6;
			display: flex;
			position:relative;
			.header-right{
				padding-left:5%;
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				
				.header-top-center{
					border: 1px solid #c8c8cc;
					
				}
				.header-top-right{
					border: 1px solid #DF5000;
					color:#DF5000 ;
				}
			}
			.img {
				position: relative;
				left: 3%;
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
				box-shadow: 1px 1px 2px #F2F2F2;
				border: 1.5px solid #F2F2F2;
			}
		}
		.content{
			margin:2%;
			padding:2%;
			
			background-color: #DAC2A6;
			
			position:relative;
			.getposition{
				width:50upx;
				height:50upx;
			}
			.remove{
				position:relative;
				width: 38upx;
				height: 38upx;
				top:-7.5rem;
				left:5.5rem;
			}
		}
		
		/* 上传 */
		.uni-uploader {
			flex: 1;
			flex-direction: column;
		}
		
		.uni-uploader-head {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
		
		.uni-uploader-info {
			color: #B2B2B2;
		}
		
		.uni-uploader-body {
			margin-top: 16upx;
		}
		
		.uni-uploader__files {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}
		
		.uni-uploader__file {
			margin: 10upx;
			width: 210upx;
			height: 210upx;
		}
		
		.uni-uploader__img {
			display: block;
			width: 210upx;
			height: 210upx;
		
		}
		
		.uni-uploader__input-box {
			position: relative;
			margin: 10upx;
		
			width: 208upx;
			height: 208upx;
			border: 2upx solid #F2F2F2;
		}
		
		.uni-uploader__input-box:before,
		.uni-uploader__input-box:after {
			content: " ";
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			background-color: #F2F2F2;
		}
		
		.uni-uploader__input-box:before {
			width: 4upx;
			height: 79upx;
		}
		
		.uni-uploader__input-box:after {
			width: 79upx;
			height: 4upx;
		}
		
		.uni-uploader__input-box:active {
			border-color: #F2F2F2;
		}
		
		.uni-uploader__input-box:active:before,
		.uni-uploader__input-box:active:after {
			background-color: #F2F2F2;
		}
		
		.uni-uploader__input {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
		.uni-padding-wrap{
			background-color:#DAC2A6;
			margin:8% 2% 0% 2%;
			padding:2%;
			position: relative;
			
			.img{
				position: relative;
				top:-1.5rem;
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
				box-shadow: 1px 1px 2px #F2F2F2;
				border: 1.5px solid #F2F2F2;
			}
			.getposition{
				width:50upx;
				height:50upx;
			}
			.share{
				margin-left:60%;
				width:70upx;
				height:70upx;
			}
			.picture{
				margin-left:10%;
				width:100upx;
				height:120upx;
			}
			.footer{
		       margin-left:15%;
				width:60upx;
				height:60upx;
			}
			.heart {
				background: url(http://demo.htmleaf.com/1511/201511131551/images/web_heart_animation.png);
				height: 90px;
				width: 90px;
				position: relative;
				margin-right:15%;
				top:3.5rem;
				background-size: 2900%;
			}
			
			.heart:hover,
			.heart:focus {
				background-position: right;
			}
			
			@-webkit-keyframes heartBlast {
				from {
					background-position: left;
				}
			
				to {
					background-position: right;
				}
			}
			
			@keyframes heartBlast {
				from {
					background-position: left;
				}
			
				to {
					background-position: right;
				}
			}
			
			.heartAnimation {
				-webkit-animation-name: heartBlast;
				animation-name: heartBlast;
				-webkit-animation-duration: .8s;
				animation-duration: .8s;
				-webkit-animation-iteration-count: 1;
				animation-iteration-count: 1;
				-webkit-animation-timing-function: steps(28);
				animation-timing-function: steps(28);
				background-position: right;
			}
		}
		
	}

	
</style>
<!-- <style lang="scss" scoped>
	#home {
		height: 100%;

		.main {
			padding: 41.666upx 31.25upx 0;

			.mask {
				display: flex;
				align-items: center;
				height: 122.916upx;
				padding: 20.833upx 25upx;
				box-shadow: 0 0 12.5upx 2.083upx rgba(200, 200, 204, 0.8);
				line-height: 1;

				.right {
					width:78%;
					height: 68.75upx;
					line-height: 68.75upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-left: 2.083upx solid #c8c8cc;
					padding-left: 31.25upx;
					margin-left: 31.25upx;
					font-size: 27.083upx;
					.notice{
						overflow:hidden;//超出的隐藏
						text-overflow:ellipsis;//省略号
						white-space:nowrap;//强制一行显示
					}
				}

				.left {
					text-align: center;
					font-size: 25upx;
					line-height: 1.4;

					image {
						height: 37.5upx;
						width: 37.5upx;
					}
				}
			}
		}

		.header {
			position: relative;
			height: 468.75upx;
			background: #ddd;
			/* url('~@/static/image/h4.jpg') */
			background-size: cover;
			color: #fff;
			padding-top: 58.333upx;

			.main {
				padding: 25upx;
			}

			.title {
				font-size: 62.5upx;
				height: 85.416upx;
				line-height: 85.416upx;
				text-align: center;
				position: relative;

				.hint {
					position: absolute;
					top: 0;
					right: 66.666upx;
					height: 85.416upx;
					line-height: 85.416upx;

					.badge {
						position: absolute;
						top: -41.666upx;
						left: 20.833upx;
					}

					image {
						width: 41.666upx;
						height: 41.666upx;
					}
				}
			}
		}
	}
</style> -->
