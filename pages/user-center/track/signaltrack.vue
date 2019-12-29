<template>
	<!-- 单个车迹详情页 -->
	<view id="signaltrack">
		<map style="width: 100%; height:400px;" :polyline='polylines' :latitude="latitude" :longitude="longitude" :markers="markers"
		 show-location="true" scale="17">
			<cover-view class="rank">排名{{rank}}</cover-view>
		</map>
		<view class="instruct" :style="{height:height+'px',width:width+'px'}">
			<view class="time">
				{{ create_date | dateFormat }}
			</view>
			<view class="middle">
				{{create_point}}-{{over_point}}
			</view>
			<view class="distance">{{distance}}
				<view class="part">里程(km)</view>
			</view>
		</view>
		<view class="footer" :style="{height:Height+'px',width:width+'px'}">
			<image class="footer-top" v-show="first" src="/static/image/journey/xin.png" @tap="collect()"></image>
			<image class="footer-top" v-show="!first" src="/static/image/journey/xin2.png" @tap="second()"></image>
			<view class="footer-center">收藏</view>
			<image class="footer-left" src="/static/image/journey/shar.png" @tap="shareInfo()"></image>
			<view class="footer-right">分享</view>
		</view>
	</view>
</template>

<script>
	import share from "@/common/share.js";
	import {
		Show_CarTrack
	} from '@/api/cartrack.js'
	export default {
		data() {
			return {
				id: '',
				polylines: [],
				longitude: '',
				latitude: '',
				markers: [],
				create_date: null,
				create_point: '',
				over_point: '',
				distance: 0,
				rank: 0,
				first: true,
				height: 0,
				Height: 0,
				width: 0,
			}
		},
		onLoad(option) {
			this.id = option.id;
			console.log(this.id)
			this.searchTrackList();
			uni.getSystemInfo({
				success: (res) => {
					this.width = res.windowWidth
					this.height = (res.windowHeight - 400) * 0.8
					this.Height = (res.windowHeight - 400) * 0.179
					console.log(res)
				}
			})
		},
		onBackPress() {
			//监听back键，关闭弹出菜单
			if (this.shareObj) {
				if (this.shareObj.shareMenu.isVisible()) {
					this.shareObj.shareMenu.hide();
					this.shareObj.alphaBg.hide();
					return true
				}
			}
		},
		methods: {
			collect() {
				this.first = false;
			},
			second() {
				this.first = true;
			},
			shareInfo() {
				let shareInfo = {
					href: "https://uniapp.dcloud.io",
					title: "我记录的车迹",
					desc: "快来瞧瞧吧",
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
			searchTrackList() {
				Show_CarTrack({
					id: this.id
				}).then(({
					data
				}) => {
					// console.log(data)
					var track = data.msg[0].record;
					if (track.length != 0) {
						var new_track = JSON.parse(track);
						var points = []
						new_track.forEach((item, index) => {
							points.splice(index, 0, {
								latitude: item[1],
								longitude: item[0]
							})
						})
						this.latitude = points[0].latitude;
						this.longitude = points[0].longitude;
						this.polylines = [{
							points,
							color: "#0A98D5", //线的颜色
							width: 8, //线的宽度
							arrowLine: true, //带箭头的线 开发者工具暂不支持该属性

						}];
						this.markers = [{
							iconPath: 'https://webapi.amap.com/images/car.png',
							latitude: points[0].latitude,
							longitude: points[0].longitude,
						}, ];
					}
					this.create_date = data.msg[0].start_date;
					this.distance = data.msg[0].mileage;
					this.create_point = data.msg[0].start_point;
					this.over_point = data.msg[0].end_point;
					this.rank = data.msg[0].rank;
				})
			}
		},
	}
</script>

<style lang="scss">
	#signaltrack {
     overflow: hidden;
		.rank {
			top: 10%;
			left: 80%;
			position: absolute;
			font-size: 45upx;
			background-color: #DF5000;
			color: #FFFFFF;
			width: 120upx;
			padding: 2%;
			text-align: center;
		}

		.instruct {
			margin-top: 0.85%;
			position: fixed;
			padding-left: 3%;
			// display: flex;
			// align-items: center;
			background-color: #DF5000;
			color: #fff;

			.time {
				font-size: 16px;
				padding-bottom: 2%; 
				position: relative;
			}

			.middle {
				position: relative;
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				padding-bottom: 2%;
			}

			.distance {
				position: relative;
				display: flex;
				flex-wrap: wrap;
				font-size: 25px;

				.part {
					display: flex;
					flex-wrap: wrap;
					font-size: 13px;
					padding-top: 2%;
					left: 2%;
					position: relative;
				}
			}
		}

		.footer {
			
			position: fixed;
			bottom: 0rpx;
			background-color: #DF5000;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			padding: 1%;
			color: #fff;

			.footer-top {
				width: 40upx;
				height: 40upx;
				position: relative;
				left: 20%;

			}

			.footer-center {
				position: relative;
				// padding-left: 2%;
				left: 21%;
				// top: 0.3rem;
				display: flex;
				align-items: center;
			}

			.footer-left {
				width: 40upx;
				height: 40upx;
				left: 55%;
				position: relative;

			}

			.footer-right {
				position: relative;
				// padding-left: 2%;
				left: 56%;
				// top: 0.3rem;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
