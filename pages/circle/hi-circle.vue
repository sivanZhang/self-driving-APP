<template>
	<view id="Webview">
		<view class="top" @tap="getLocation">
			<test>开启应用权限以保证正常记录轨迹</test>
		</view>
		<map :style="{height:height+'px',width:width+'px'}" :polyline='polylines' :latitude="latitude" :longitude="longitude"
		 :markers="markers" show-location="true" scale="17">
		</map>
		<view class="bottom">
			<view class="bottom-left">开始记录：</view>
			<image class="open_img" @tap="isLogin?track():toLogin()" src="/static/open.png" />
			<view class="bottom-right">结束记录：</view>
			<image class="close_img" @tap="isLogin?closetrack():toLogin()" src="/static/end.png" />
		</view>
	</view>
</template>

<script>
	import {
		CarTrack_Share,
		Record_CarTrack,
		Close_CarTrack,
		Show_CarTrack,
		Show_Unclosetrack
	} from '@/api/cartrack.js'
	// #ifdef APP-PLUS
	import permision from "@/common/permission.js"
	// #endif
	import util from "@/common/util.js"
	var formatLocation = util.formatLocation;
	export default {
		data() {
			return {
				hasLocation: false,
				location: {},
				locationinfo: '',
				speed: '',
				id: '',
				unclose_id: '',
				longitude: '',
				latitude: '',
				polylines: [],
				record: [],
				markers: [],
				test: [],
				newtest: [],
				oldtime: 0,
				correct_test: [],
				SI: '',
				count: 0,
				add: 0,
				new_record: [],
				newrecord: [],
				height: 0,
				width: 0,
				open: '',
				close: '',
			}
		},
		onShow: function() {
			this.doGetLocation();
			// this.unclose();
			this.locate();
		},
		computed: {
			isLogin() {
				return this.$store.state.estateToken || uni.getStorageSync('estateToken')
			},
		},
		onLoad() {
			this.getLocationTest();
			uni.getSystemInfo({
				success: (res) => {
					this.width = res.windowWidth
					this.height = res.windowHeight - 120
				}
			})
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/login-page"
				})
			},
			// unclose() {
			// 	Show_Unclosetrack().then(({
			// 		data
			// 	}) => {
			// 		// console.log(data.mark)
			// 		if (data.mark == 0) {
			// 			var that = this;
			// 			uni.showModal({
			// 				content: '您记录的车迹尚未结束,是否结束记录？',
			// 				cancelText: '继续记录',
			// 				confirmText: '结束记录',
			// 				success: function(res) {
			// 					if (res.confirm) {
			// 						that.unclose_id = data.car;
			// 						that.close = 0;
			// 						Close_CarTrack({
			// 							track_id: that.unclose_id,
			// 							tag: that.close,
			// 							method: 'put'
			// 						}).then(({
			// 							data
			// 						}) => {
			// 							uni.showToast({
			// 								title: data.msg,
			// 								icon: "none",
			// 							})
			// 							// console.log(data)
			// 						})

			// 					} else if (res.cancel) {
			// 						that.track();
			// 					}
			// 				}
			// 			});
			// 		}
			// 	});
			// },
			async getLocation() {
				// #ifdef APP-PLUS
				let status = await this.checkPermission();
				// #endif
				this.doGetLocation();
			},
			doGetLocation() {
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					altitude: true,
					success: (res) => {
						// console.log(res)
						this.locationinfo = res
						this.hasLocation = true;
						this.location = formatLocation(res.longitude, res.latitude);
						this.speed = res.speed
						// console.log(this.locationinfo)
					},
					fail: (err) => {
						// console.log(err)
						try {
							var time = new Date();
							var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
								':' + time.getMinutes() + ':' + time.getSeconds();
							var c = '这是fail里的err内容' + ':' + JSON.stringify(err) + '--' + time1
							var old = uni.getStorageSync('log_ge');

							uni.setStorageSync('log_ge', c.concat(old));

						} catch (e) {
							// error
						}
					},
					complete: (a) => {
						// console.log(a)
						try {
							var time = new Date();
							var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
								':' + time.getMinutes() + ':' + time.getSeconds();
							var c = '这是complete里的内容' + ':' + time1 + '--' + JSON.stringify(a)
							var old = uni.getStorageSync('log_ge');

							uni.setStorageSync('log_ge', c.concat(old));

						} catch (e) {
							// error
						}

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
							content: '为保证正常记录车迹请打开定位服务功能',
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
							content: '为保证正常记录车迹请打开定位服务功能',
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
			track() {
				this.doGetLocation();
				if (this.hasLocation === true) {
					this.open = 1;
					CarTrack_Share({
						tag: this.open
					}).then(({
						data
					}) => {
						if (data.status === 0) {
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
				this.add = 0;
				this.polylines = []
				this.doGetLocation();
				this.SI = setInterval(() => {
						this.doGetLocation();
						this.longitude = this.locationinfo.longitude;
						this.latitude = this.locationinfo.latitude;
						this.speed = this.locationinfo.speed;
						this.record = [this.longitude, this.latitude];
						this.test = JSON.stringify(this.locationinfo);
						var time = new Date();
						var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
							':' + time.getMinutes() + ':' + time.getSeconds();
						this.record1 = time1 + '--' + this.record + '--' + this.speed;
						this.newtest = this.newtest.concat(this.test);
						this.new_record = this.new_record.concat('[' + this.record + ']');
						this.newrecord = this.newrecord.concat('[' +
							this.record1 + ']');
						if (this.add == 0) {
							this.add = this.add + 1;
							this.oldtime = parseInt(time.getTime() / 1000);
							if (this.oldtime > 0) {
								var oldtest = {
									x: this.longitude.toFixed(6) * 1,
									y: this.latitude.toFixed(6) * 1,
									sp: this.speed,
									ag: 0,
									tm: this.oldtime
								}
							}
							var oldtast = JSON.stringify(oldtest);
							this.correct_test = this.correct_test.concat(oldtast);
						}
						console.log(this.new_record.length)
						if (this.new_record.length > 1) {
							if (this.add != 0) {
								var newtime = parseInt(time.getTime() / 1000) - this.oldtime;
								if (newtime > 0) {
									var oldtest = {
										x: this.longitude.toFixed(6) * 1,
										y: this.latitude.toFixed(6) * 1,
										sp: this.speed,
										ag: 0,
										tm: newtime
									}
								}
								var oldtast = JSON.stringify(oldtest);
								this.correct_test = this.correct_test.concat(oldtast);
							}
						}
						//同步获取位置信息
						try {
							uni.setStorageSync('log_geo', this.newrecord);

						} catch (e) {
							// error
						}
					
						Record_CarTrack({
							track_id: this.id,
							method: 'put',
							record: '[' + this.new_record + ']',
							test: '[' + this.newtest + ']',
							correct_test: '[' + this.correct_test + ']',
						}).then(({
							data
						}) => {
							// uni.showToast({
							// 	title: data.msg,
							// 	icon: "none",
							// })
							console.log(data) 
							Show_CarTrack({
								id: this.id
							}).then(({
								data
							}) => {
								var track = data.msg[0].record;
								var points = []
								track.forEach((item, index) => {
									points.splice(index, 0, {
										latitude: item[1],
										longitude: item[0]
									})
								})
								this.latitude = points[0].latitude;
								this.longitude = points[0].longitude;
								this.polylines = [{
									points,
									color: "#DF5000", //线的颜色
									width: 5, //线的宽度
									arrowLine: true, //带箭头的线 开发者工具暂不支持该属性					   		
								}];
								this.markers = [{
									iconPath: 'https://webapi.amap.com/images/car.png',
									latitude: points[0].latitude,
									longitude: points[0].longitude,
								}, ];
							})

						})
						console.log('[' + this.new_record + ']');
						this.new_record = []
						this.newtest = []
						this.add = 0;
						this.correct_test = []
					
				}, 1000)
		},
		closetrack() {
			clearInterval(this.SI)
			this.new_record = []
			this.correct_test = []
			this.newtest = []
			this.close = 0;
			this.polylines = []
			var that = this;
			if(that.open == 1){
				uni.showModal({
					content: '是否确认放弃记录轨迹？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							Close_CarTrack({
								track_id: that.id,
								tag: that.close,
								method: 'put'
							}).then(({
								data
							}) => {
								uni.showToast({
									title: data.msg,
									icon: "none",
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
			that.open = 0;
		},
		locate() {
			var watchId = plus.geolocation.watchPosition(function(p) {
				console.log("监听位置变化信息:");
				console.log(JSON.stringify(p));
				var f = JSON.stringify(p);
				try {
					var time = new Date();
					var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
						':' + time.getMinutes() + ':' + time.getSeconds();
					var lo = '这是监听位置变化信息的内容' + ':' + time1 + '--' + f
					var old = uni.getStorageSync('log_g');
					uni.setStorageSync('log_g', lo.concat(old));

				} catch (e) {
					// error
				}
			}, function(e) {
				console.log("监听位置变化信息失败：" + e.message);
				var g = e.message;
				try {
					var time = new Date();
					var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
						':' + time.getMinutes() + ':' + time.getSeconds();
					var lo = '这是监听位置变化信息的内容' + ':' + time1 + '--' + g
					var old = uni.getStorageSync('log_g');
					uni.setStorageSync('log_g', lo.concat(old));

				} catch (e) {
					// error
				}
			}, {
				'enableHighAccuracy': true,
				'geocode': false
			});
			var g_wakelock = null;
			//允许程序后台运行，以持续获取GPS位置  
			function wakeLock() {
				//Android  
				var main = plus.android.runtimeMainActivity();
				var Context = plus.android.importClass("android.content.Context");
				var PowerManager = plus.android.importClass("android.os.PowerManager");
				var pm = main.getSystemService(Context.POWER_SERVICE);
				g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ANY_NAME");
				g_wakelock.acquire();
			}
		},
	},
	}
</script>

<style lang="scss">
	#Webview {
		overflow-x: hidden;

		.top {
			position: relative;
			font-size: 35upx;
			text-align: center;
			color: #DF5000;
		}

		.bottom {
			position: relative;
			display: flex;
			flex-wrap: wrap;
            .bottom-left{
			position: relative;
			font-size: 35upx;
			color:#DF5000;
			top:0.6rem;
			left:10%;
			}
			.bottom-right{
				position: relative;
				font-size: 35upx;
				color:#DF5000;
				top:0.6rem;
				left:20%;
			}
			.open_img {
				width: 90upx;
				height: 90upx;
				position: relative;
				left: 10%;
			}

			.close_img {
				width: 90upx;
				height: 90upx;
				position: relative;
				left: 20%;
			}
		}
	}
</style>
