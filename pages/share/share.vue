<template>

	<view id="content">

		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					<button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button>
				</view>
			</view>
		</view>
		<image style="width:2rem;height:2rem;position:relative;left:17rem;top:1rem;" src="../../static/image/journey/s.png" @click="shareInfo">
		</image>
		<image style="position:relative;width:2rem;height:2rem;bottom:-29.5rem;left:7rem;" @tap="shareFc()" src="../../static/image/journey/a.png" />
		<text style="position:relative;width:2rem;height:2rem;bottom:-31rem;left:4.5rem;color:#fff;">生成图片</text>
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
		<view style="border-radius:5px;background:#fff;width:18rem;height:8rem;position:relative;top:1.5rem;left:1rem;">
			<text style="font-size:15px;top:-0.5rem;left:3rem;position:relative;">西安</text>
			<text style="font-size:15px;top:-0.5rem;left:11rem;position:relative;">延安</text>
			<text style="position:relative;left:-1rem;top:0.5rem;">2019.10.28</text>
			<text style="position:relative;left:4.9rem;top:0.5rem;">2019.10.30</text>
			<image style="width:3rem;height:3rem;position:relative;top:3rem;left:-8rem;" src="../../static/image/journey/e.png" @click="chooseLocation">
			</image>

			<block v-if="hasLocation === false">
				<view style="position:relative;left:2.3rem;top:3rem;">未选择位置</view>
			</block>
			<block v-if="hasLocation === true">
				<view style="position:relative;left:2.3rem;top:3rem;">
					{{locationAddress}}
				</view>
			</block>

		</view>
		<view style="border-radius:5px;background:#fff;width:18rem;height:8rem;position:relative;top:3rem;left:1rem;">
			<image style="width:4rem;height:4rem;left:1rem;top:-1rem;border-radius:50%;position:relative;" src="../../static/image/journey/1.jpeg">
			</image>
			<text style="position:relative;top:-1rem;left:2rem;">越野越执着</text>
			<text style="position:relative;left:-3rem;white-space:pre-wrap;font-weight:bold;font-size:18px;top:1rem;">107.53</text>
			<text style="position:relative;left:-3rem;top:0.9rem;">里程(km)</text>
			<view style="position:relative;border-radius:5px;width:16rem;height:3rem;left:1rem;background-color:#F0F0F0;top:0rem;">
				<text style="position:relative;font-weight:bold;top:0.5rem;left:1.5rem;font-size:16px;">48:00:00</text>
				<text style="position:relative;top:1.5rem;left:-2.5rem;">用时(时：分：秒)</text>
			</view>
		</view>
		<view style="border-radius:5px;background:#fff;width:18rem;height:3rem;position:relative;top:4rem;left:1rem;">
			<image style="width:2rem;height:2rem;position:relative;left:0.5rem;top:0.5rem;" src="../../static/image/journey/collection.png">
			</image>
			<text style="position:relative;left:0.5rem;top:0.5rem; ">收藏</text>
			<image style="width:2rem;height:2rem;position:relative;left:3rem;top:0.5rem;" src="../../static/image/journey/l.png">
			</image>
			<text style="position:relative;left:3.5rem;top:0.5rem;">评论</text>
			<div class="heart" id="like2" rel="like"></div>
			<text style="position:relative;left:15.5rem;top:-6rem;">点赞</text>
		</view>
	</view>

</template>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script>
	var util = require('../../common/util.js');
	var formatLocation = util.formatLocation;
	import share from "@/common/share.js";
	import _app from '@/common/util/QS-SharePoster/app.js';
	import getSharePoster from '@/common/util/QS-SharePoster/QS-SharePoster.js';
	export default {
		data() {
			return {
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				hasLocation: false,
				location: {},
				locationAddress: '',
			}
		},
		methods: {


			chooseLocation: function() {
				uni.chooseLocation({
					success: (res) => {
						this.hasLocation = true,
							this.location = formatLocation(res.longitude, res.latitude),
							this.locationAddress = res.address
					}
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
			async shareFc() {
				try {
					if (!this.poster.finalPath) {
						const d = await getSharePoster({
							type: 'testShareType',
							posterCanvasId: this.canvasId,
							qrCodeArray: ({
								bgObj,
								type,
								bgScale
							}) => {
								return [{
									text: '你好，我是取舍',
									size: bgObj.width * 0.2,
									dx: bgObj.width * 0.05,
									dy: bgObj.height - bgObj.width * 0.25
								}]
							},
							imagesArray: ({
								bgObj,
								type,
								bgScale
							}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
								const dx = bgObj.width * 0.3;
								return [{
									url: '/static/image/journey/5.jpg',
									dx,
									dy: bgObj.height - bgObj.width * 0.25,
									infoCallBack(imageInfo) {
										let scale = bgObj.width * 0.2 / imageInfo.height;
										return {
											circleSet: {
												x: imageInfo.width * scale / 2,
												y: bgObj.width * 0.2 / 2,
												r: bgObj.width * 0.2 / 2
											}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
											dWidth: imageInfo.width * scale, // 因为设置了圆形图片 所以要乘以2
											dHeight: bgObj.width * 0.2,
											roundRectSet: { // 圆角矩形
												r: imageInfo.width * .1
											}
										}
									}
								}]
							},
							textArray: ({
								bgObj,
								type,
								bgScale
							}) => {
								const fontSize = bgObj.width * 0.045;
								const lineHeight = bgObj.height * 0.04;
								return [{
									fontStyle: 'italic',
									text: '取舍',
									size: fontSize,
									color: 'white',
									alpha: .5,
									textAlign: 'left',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										_app.log('index页面的text的infocallback ，textlength:' + textLength);
										return {
											dx: bgObj.width - textLength - fontSize,
											dy: bgObj.height - lineHeight * 3
										}
									}
								}, {
									text: '取舍',
									fontWeight: 'bold',
									size: fontSize,
									color: 'white',
									alpha: .75,
									textAlign: 'left',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										return {
											dx: bgObj.width - textLength - fontSize,
											dy: bgObj.height - lineHeight * 2
										}
									}
								}, {
									text: '取舍',
									size: fontSize,
									color: 'white',
									alpha: 1,
									textAlign: 'left',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										return {
											dx: bgObj.width - textLength - fontSize,
											dy: bgObj.height - lineHeight
										}
									}
								}, ]
							},
							setCanvasWH: ({
								bgObj,
								type,
								bgScale
							}) => { // 为动态设置画布宽高的方法，
								this.poster = bgObj;
							},
							setDraw: ({
								Context,
								bgObj,
								type,
								bgScale
							}) => {
								Context.setFillStyle('black');
								Context.setGlobalAlpha(0.3);
								Context.fillRect(0, bgObj.height - bgObj.height * 0.2, bgObj.width, bgObj.height * 0.2);
							}
						});
						console.log('海报生成成功， 临时路径: ' + d.poster.tempFilePath)
						this.poster.finalPath = d.poster.tempFilePath;
					}
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;
			}
		}
	}
</script>

<style>
	.heart {
		background: url(http://demo.htmleaf.com/1511/201511131551/images/web_heart_animation.png);
		height: 90px;
		width: 90px;
		position: relative;
		top: -3rem;
		left: 12rem;
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

	#content {
		background-color: #3B4144;
		width: 750rpx;
		height: 612px;
		overflow: hidden;
	}

	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(3);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
