<template>
	<!-- 我的首页 -->
	<view id="MyAccount">
		<view class="wall">
			<view style="margin-top:80upx;margin-left:20upx;font-size:35upx">{{longitude}}--{{latitude}}--{{speed}}</view>
			<view class="header" @tap="target('/pages/user-center/track/alltrack')">
				<view class="top-left">
					<view class="milage">
						总里程数
					</view>
					<view class="total">
						<view class="number">{{isLogin?randomNumber:"---"}}</view>
						<view class="kilometers">公里</view>
					</view>
				</view>
				<!-- <image class="img" src="/static/image/journey/start.png" @tap="click"/>  -->
				<view class="top-right">
					<view class="showrank">
						<view class="name">名次</view>
						<view class="num">{{isLogin?10000-randomNumber:"--"}}</view>
					</view>
					<view class="look" @tap="target('/pages/user-center/rank/lookrank')">
						<image src="/static/icons/rank.png"></image>
						<view class="lookrank">查看排行</view>
					</view>
				</view>
			</view>
			
			<view class="wall-top">
				<image v-if="isLogin" class="img" :src="'https://tl.chidict.com'+'/'+thumbnail_portait" @tap="target('/pages/user-center/personalCenter/personalCenter')"></image>
				<image v-else class="img" src="/static/icons/zhuce.png"></image>
				<view class="top">
					<view class="information">
						<view v-if="sex == '女'">
							<image src="/static/icons/women.png"></image>
						</view>
						<view v-else>
							<image src="/static/icons/men.png"></image>
						</view>
						<template v-if="isLogin">
							<view class="username" @tap="target('/pages/user-center/personalCenter/personalCenter')">
								<span>{{username||UserInfo.phone}}</span>
							</view>
						</template>
						<navigator class="username" v-else url="/pages/login/login-page">登录 / 注册</navigator>
					</view>
					<view class="position">
						<image @tap="getLocation" src="../../static/image/position.png"></image>
						<view class="address">
							<view v-if="hasLocation === false">
								获取定位
							</view>
							<view v-if="hasLocation === true">
								{{address.province}}{{address.city}}{{address.district}}{{address.street}}{{address.streetNum}}{{address.poiName}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="uni-content">
				<view class="uni-content-box" @tap="target('/pages/foot/my-foot')">
					<view class="uni-content-image">
						<image src="/static/icons/zuji.png" />
					</view>
					<view class="uni-content-text">车迹</view>
				</view>
				<view class="uni-content-box" @tap="target('/pages/activity/activity')">
					<view class="uni-content-image">
						<image src="/static/icons/dongtai.png" />
					</view>
					<view class="uni-content-text">动态</view>
				</view>
				<view class="uni-content-box">
					<view class="uni-content-image">
						<image class="img" v-show="stop" @tap="isLogin?track():toLogin()" src="/static/image/journey/start.png" />
						<image class="img2" v-show="!stop" @tap="isLogin?closetrack():toLogin()" src="/static/icons/open.jpg" />
					</view>
				</view>
				<view class="uni-content-box">
					<view class="uni-content-image">
						<image src="/static/icons/xuanshang2.png" />
					</view>
					<view class="uni-content-text">悬赏</view>
				</view>
				<view class="uni-content-box">
					<view class="uni-content-image" @tap="target('/pages/user-center/message/mymessage')">
						<image src="/static/icons/xiaoxi.png" />
					</view>
					<view class="uni-content-text">通知</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="section" @tap="target('/pages/journey/journey')">
				<view>
					<image class="icon" src="/static/icons/mydriving.png"></image>
					正在进行的自驾之旅
				</view>
				<view>
					<block v-if="noticeData.length>0">
						<uni-badge type="error" class="badge" :text="String(noticeData.length)"></uni-badge>
					</block>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section">
				<view>
					<image class="icon" src="/static/icons/save.png"></image>
					我的收藏
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>

			<view class="section" @tap="target('/pages/user-center/browser-history')">
				<view>
					<image class="icon" src="/static/icons/viewhistory.png"></image>
					浏览历史
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<!-- <view class="section">
				<view>
					<image class="icon" src="/static/icons/invited.png"></image>
					邀请好友
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view> -->

			<view class="section" @tap="target('/pages/user-center/giftcenter/giftcenter')">
				<view>
					<image class="icon" src="../../static/image/journey/gift.png"></image>
					礼品中心

				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section" @tap="target('/pages/user-center/user-settings')">
				<view>
					<image class="icon" src="/static/icons/setting.png"></image>
					设置
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section">
				<view>
					<image class="icon" src="/static/icons/fankui.png"></image>
					意见反馈
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
		</view>
		<view class="foot">
			版本:12.321.33.22
		</view>
		<uni-popup ref="popup" type="bottom">
			<map style="width: 100%; height: 300px;" :polyline='polylines' :latitude="latitude" :longitude="longitude" :markers="markers"
			 show-location="true" scale="17">
			</map>
		</uni-popup>
	</view>
</template>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script>
	// var wv;
	import {
		search_users
	} from '@/api/usercenter'
	import {
		GET_Notice
	} from '@/api/notice'
	import {
		CarTrack_Share,
		Record_CarTrack,
		Close_CarTrack,
		Show_CarTrack
	} from '@/api/cartrack.js'
	// import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	// #ifdef APP-PLUS
	import permision from "@/common/permission.js"
	// #endif
	import util from "@/common/util.js"
	var formatLocation = util.formatLocation;
	export default {
		components: {
			// uniBadge,
			uniIcon,
			uniPopup
		},
		data() {
			return {
				noticeData: [],
				thumbnail_portait: '',
				username: '',
				hasLocation: false,
				province:'',
				city:'',
				district:'',
				street:'',
				streetNum:'',
				location: {},
				address: {},
				polylines: [],
				type: '',
				speed:'',
				sex: '',
				name: null,
				stop: true,
				open: '',
				close: '',
				id: '',
				longitude: '',
				latitude: '',
				markers: [],
				record: [],
				newrecord: [],
				locationinfo: '',
				SI: '',
				count:0
			};
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			},
			isLogin() {
				return this.$store.state.estateToken || uni.getStorageSync('estateToken')
			},
			randomNumber() {
				return Math.floor(Math.random() * (10000 - 10 + 1) + 10)
			}
		},
		methods: {

			async getLocation() {
				// #ifdef APP-PLUS
				let status = await this.checkPermission();
				// if (status !== 1) {
				// 	console.log(status)
				// 	return;
				// }
				// #endif
				this.doGetLocation();
				// this.chooseLocation()
			},
			doGetLocation() {
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: (res) => {
						// console.log(res)
						this.locationinfo = res
						this.hasLocation = true;
						this.location = formatLocation(res.longitude, res.latitude);
						this.speed = res.speed
						this.address = res.address
						this.name = res.address.poiName
						// console.log(this.locationinfo)
					},
					fail: (err) => {
						console.log((err))
					}
				})
			},
			async checkPermission() {
				if (uni.getSystemInfoSync().platform == 'android') {
					// 判断平台
					var context = plus.android.importClass("android.content.Context");
					var locationManager = plus.android.importClass("android.location.LocationManager");
					var main = plus.android.runtimeMainActivity();
					var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
					if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
						uni.showModal({
							title: '提示',
							content: '请打开定位服务功能',
							showCancel: true, // 显示取消按钮
							success: function(res) {
								if (res.confirm) {
									if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
										var Intent = plus.android.importClass('android.content.Intent');
										var Settings = plus.android.importClass('android.provider.Settings');
										var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
										main.startActivity(intent); // 打开系统设置GPS服务页面

									} else {
										this.doGetLocation();
										console.log('GPS功能已开启');
									}
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					} else {
						this.doGetLocation();
					}
				} else {
					var cllocationManger = plus.ios.import("CLLocationManager");
					var enable = cllocationManger.locationServicesEnabled();
					var status = cllocationManger.authorizationStatus();
					plus.ios.deleteObject(cllocationManger);
					console.log("enable:" + enable);
					console.log("status:" + status);
					if (enable && status != 2) {
						console.log("手机系统的定位已经打开");
					} else {
						console.log("手机系统的定位没有打开");
						uni.showModal({
							title: '提示',
							content: '请打开定位服务功能',
							showCancel: true, // 不显示取消按钮
							success: function(res) {
								if (res.confirm) {
									var UIApplication = plus.ios.import("UIApplication");
									var application2 = UIApplication.sharedApplication();
									var NSURL2 = plus.ios.import("NSURL");
									var setting2 = NSURL2.URLWithString("App-Prefs:root=Privacy&path=LOCATION");
									application2.openURL(setting2);
									plus.ios.deleteObject(setting2);
									plus.ios.deleteObject(NSURL2);
									plus.ios.deleteObject(application2);
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			},
			getLocationTest() {
				if (this.hasLocation === true) {
					let SI = setInterval(() => {
						this.doGetLocation();
					}, 1000)
				} else {
					this.getLocation();
				}
			},
			search() {
				let data = '';
				data = this.UserInfo.id;
				search_users({
					userid: data
				}).then(({
					data
				}) => {
					this.thumbnail_portait = data.msg[0].thumbnail_portait;
					this.username = data.msg[0].username;
					this.sex = data.msg[0].sex;

				})
			},
			target(url) {
				if(this.isLogin){
					uni.navigateTo({
						url
					})
				}else{
					//为了将来返回页面
					this.$store.commit("redirect/SetRedirect",url)
					this.toLogin()
				}
			},
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/login-page"
				})
			},
			track() {
				this.doGetLocation();
				if (this.hasLocation === true) {
					this.$refs.popup.open();
					this.open = 1;
					CarTrack_Share({
						tag: this.open
					}).then(({
						data
					}) => {
						if (data.status === 0) {
							this.stop = false
							this.id = data.car_track_id
							uni.showToast({
								title: data.msg,
								icon: "none",
							})
							this.recordtrack();
						}
					})
				} else {
					uni.showToast({
						title: "请开启定位服务",
						icon: "none",
					})
				}
			},
			recordtrack() {
				this.SI = setInterval(() => {
					this.doGetLocation();
					this.longitude = this.locationinfo.longitude;
				    this.latitude = this.locationinfo.latitude;
					this.record = [this.longitude, this.latitude];
					this.speed = this.locationinfo.speed;
					this.newrecord = '[' + this.record + ']';
					if(this.speed == 0){
						this.count += 1;
					}
					// this.newrecord = this.newrecord.concat('[' + this.record + ']');
					// this.newrecord = '[' + this.record + ']';
					// console.log('[' + this.newrecord + ']')
					// if ((this.newrecord).length > 9) {
						//console.log(this.newrecord)
						if((this.speed == 0 && this.count ==1)||this.speed != 0){
							Record_CarTrack({
								track_id: this.id,
								method: 'put',
								record: '[' + this.newrecord + ']',
								// location:this.location
							}).then(({
								data
							}) => {
								// uni.showToast({
								// 	title: data.msg,
								// 	icon: "none",
								// })
								//console.log(data)
								Show_CarTrack({
									id: this.id
								}).then(({
									data
								}) => {	
									var track = data.msg[0].record;
									var track1 = JSON.parse(track);
									var points = []
									track1.forEach((item, index) => {
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
								})
							})
							this.newrecord = []
                        }
					// }
				}, 1000)
			},
			closetrack() {
				clearInterval(this.SI)
				this.newrecord = []
				this.close = 0;
				Close_CarTrack({
					track_id: this.id,
					tag: this.close,
					method: 'put'
				}).then(({
					data
				}) => {
					this.stop = true
					uni.showToast({
						title: data.msg,
						icon: "none",
					})
					console.log(data)
				})

			}
		},
		onLoad() {
			//     // #ifdef APP-PLUS
			//      wv = plus.webview.create("","custom-webview",{
			//          plusrequire:"none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
			//           'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
			//          top:uni.getSystemInfoSync().statusBarHeight,//放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
			// height:100,
			//      })
			//      wv.loadURL("/hybrid/html/background.html")
			//      var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			//      currentWebview.append(wv);//一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			//      setTimeout(function() {
			//          console.log(wv.getStyle())
			//      }, 1000);//如果是首页的onload调用时需要延时一下，二级页面无需延时，可直接获取
			//      // #endif

			setTimeout(function() {
				uni.showToast({
					title: "点击中间的按钮可以开始记录车迹哦",
					icon: "none",
				})
			}, 1000);
			this.getLocationTest();
		},
		onShow: function() {
			this.doGetLocation();
			this.search();

		},
	};
</script>

<style lang="scss">
	#MyAccount {
		overflow-x: hidden;

		.wall {
			height: 360rpx;
			position: relative;
			background: #fff;

			.header {
				padding-left: 30upx;
				padding-top: 50upx;
				display: flex;
				flex-wrap: wrap;

				// flex-direction: column;
				// align-items: center;
				// justify-content: center;
				// .img {
				// 	position:absolute;
				// 	width: 100upx;
				// 	height: 100upx;
				// 	margin-top:100upx;
				// 	margin-left:320upx;
				// }
				.top-left {
					padding-top: 36upx;
					padding-left: 14upx;

					// display:flex;
					// flex-direction: column;
					.milage {
						text-align: center;
						font-size: 30upx;
						border-bottom: 10upx solid #DF5000;
						width: 130upx;
					}

					.total {
						display: flex;
						// flex-wrap: wrap;
						padding-top: -10upx;

						.number {
							font-size: 90upx;
							// width:230upx;
							letter-spacing: -6upx;
						}

						.kilometers {
							font-size: 30upx;
							padding-left: 8upx;
							margin-top: 70upx;
						}
					}
				}

				.top-right {
					position: absolute;
					padding-top: 91upx;
					padding-left: 426upx;
					display: flex;
					flex-wrap: wrap;

					.showrank {

						padding: 0 10upx;
						padding-top: 8upx;
						background-color: #4D4D4D;
						height: 100upx;
						width: 100upx;
						color: #FFFFFF;
						text-align: center;

						.num {
							padding-top: 7upx;
							font-weight: bold;
						}
					}

					.look {
						padding-top: 8upx;
						display: flex;
						flex-direction: column;
						background-color: #DF5000;
						height: 100upx;
						width: 150upx;

						image {
							width: 98upx;
							height: 45upx;
							padding-left: 52upx;
						}

						.lookrank {
							color: #FFFFFF;
							padding-top: 2upx;
							// font-size:32upx;
							padding-left: 22upx;
						}
					}
				}
			}

			.wall-top {
				display: flex;
				position: absolute;
				z-index: 2;
				left: 25upx;
				top: 290upx;
				font-size: 32upx;

				.img {
					position: relative;
					left: 3%;
					width: 130rpx;
					height: 130rpx;
					border-radius: 50%;
					box-shadow: 1px 1px 2px #F2F2F2;
					border: 1.5px solid #F2F2F2;
				}

				.top {
					padding-top: 12upx;
					padding-left: 10upx;
					color: #848689;
                    width:480upx;
					.information {
						display: flex;

						image {
							width: 62upx;
							height: 28upx;
							padding-left: 34upx;
							z-index: 2;
						}

						.username {
							position: relative;
							padding-top: 6upx;
							left: 0.3rem;
						}
					}

					.position {
						padding-top: 5upx;

						image {
							width: 66upx;
							height: 32upx;
							padding-left: 30upx;
							z-index: 2;
						}

						.address {
							padding-top: 16upx;
							position: relative;
							top: -1.5rem;
							left: 2rem;
							right:2rem;
						}
					}
				}
			}
		}

		.main {
			height: 220upx;

			.uni-content {
				display: flex;
				flex-wrap: wrap;
				padding-left: 0upx;
				padding-top: 120upx;
				padding-right: 5upx;
			}

			.uni-content-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 20%;
				box-sizing: border-box;
			}

			.uni-content-image {
				display: flex;
				justify-content: center;
				align-items: center;

				.img {
					width: 80upx;
					height: 80upx;
				}

				.img2 {
					margin-top: -10upx;
					width: 90upx;
					height: 100upx;
				}

				image {
					width: 70upx;
					height: 70upx;
				}
			}

			.uni-content-text {
				font-size: 26upx;
				color: #333;
				padding-top: 5px;
				padding-bottom: 10px;
			}
		}

		.badge {
			background-color: #e60000 !important;
			font-size: 25upx !important;
		}

		.content {
			position: relative;
			top: -2.5rpx;

			.section {
				padding: 0 41.666upx;
				// height: 125upx;
				height: 118upx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				// border-bottom: 2.083upx solid #c8c8cc;
				&>view:nth-child(1) {

					// font-weight: bold;
					.icon {
						width: 62.5upx;
						height: 62.5upx;
						display: inline-block;
						margin-right: 37.5upx;
					}
				}

				&>view:nth-child(2) {
					color: #c8c8cc;
					display: flex;
					align-items: center;
				}
			}

			.profile {
				padding: 0 31.25rpx;
				width: 100%;
				display: flex;
				align-items: flex-end;

				image {
					width: 125rpx;
					height: 125rpx;
					border-radius: 50%;
				}
			}
		}

		.foot {
			padding-top: 40upx;
			opacity: 0.5;
			color: black;
			font-size: 25upx;
			display: flex;
			justify-content: center;
		}
	}
</style>
