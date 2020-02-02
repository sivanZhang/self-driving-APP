<template>
	<view>
		<map
			id="mapContainer"
			ref="mapContainer"
			:longitude="mapCenter.longitude"
			:latitude="mapCenter.latitude"
			:polyline="polylines"
			@controltap="handleControllerTap"
			:controls="controls"
			:show-location="true"
			:markers="[carMarkers]"
		>
			<!-- cover-view中添加子元素有些平台可能会导致定位失效？？？ -->
			<cover-view class="map-btn" @click="stopGetLocation">停止</cover-view>
			<cover-view class="location-message1">{{ showLocation.longitude  }} {{ showLocation.latitude }} {{ showLocation.speed  }} </cover-view>
			<cover-view class="location-message2">{{ errorMessage }}</cover-view>
		</map>
	</view>
</template>

<script>
// 模拟数据
import { pathParam, pathParam2 } from './positions.js';
// 发送给后端位置信息的接口
import { postLocation } from '@/api/usercenter.js';
export default {
	data() {
		return {
			errorMessage: '',
			// 地图组件上面显示经纬度数值
			showLocation: {
				longitude: '',
				latitude: '',
				speed:'',
			},
			// 监听设备位置变化信息返回的ID ，用于后期注销监听
			watchId: null,
			// 当前地图的上下文对象
			mapContext: null,
			//  当前地图的中心点
			mapCenter: {
				longitude: null,
				latitude: null
			},
			// 地图划线
			polylines: [
				{
					color: '#DC143C',
					arrowLine: true,
					width: 4,
					points: []
				}
			],
			// “轿车”图标
			carMarkers: {
				id: 110,
				iconPath: '../../../static/car.png',
				width: 30,
				height: 30
			},
			// 地图的control组件 （按钮）
			controls: [
				{
					clickable: true,
					id: 1,
					position: {
						left:  '45%',
						bottom: 40,
						width: 50,
						height: 50
					},
					iconPath: '../../../static/end.png'
				}
			]
		};
	},
	methods: {
		getCurrentPosition() {
			// 系统检测判断
			if (uni.getSystemInfoSync().platform === 'android') {
				var g_wakelock = null;
				//允许程序后台运行，以持续获取GPS位置
				function wakeLock() {
					//Android
					var main = plus.android.runtimeMainActivity();
					var Context = plus.android.importClass('android.content.Context');
					var PowerManager = plus.android.importClass('android.os.PowerManager');
					var pm = main.getSystemService(Context.POWER_SERVICE);
					g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, 'ANY_NAME');
					g_wakelock.acquire();
				}
			}
			// plus监听设备位置变化信息
			let count = 0;
			 try {
				
				this.watchId = plus.geolocation.watchPosition(
					({ coords }) => {
						try{
							const LOCATION = {
								longitude: coords.longitude,
								latitude: coords.latitude
							};

							this.mapCenter = LOCATION;
							this.mapContext.moveToLocation();
							// 划线
							if (this.polylines[count].points.length <= 100) {
								this.polylines[count].points.push(LOCATION);
							} else {
								count++;
								this.polylines.splice(count, 0, {
									color: '#DC143C',
									arrowLine: true,
									width: 4,
									points: []
								});
								// 接上一根线最后一点
								this.polylines[count].points.push(this.polylines[count - 1].points[99]);
								this.polylines[count].points.push(LOCATION);
							}
							// 定位信息发送后端
							postLocation({ ...LOCATION, speed: coords.speed || 0 }).then(() => {
								this.showLocation = { ...LOCATION, speed: coords.speed || 0 };
							}); 
						}
						catch(e){
							console.log(e);
							let coods =  JSON.stringify(coords)
							let emsg =  JSON.stringify(e)
				            this.errorMessage =  `inner:${emsg}:${e.message} ${coods}`;
						}
						
					},
					err => {
						this.errorMessage = `${err.code}:${err.message}`;
					},
					{
						enableHighAccuracy: true,
						geocode: false
					}
				);
			 }
			 catch(e){
				console.log(e);
				let coods =  JSON.stringify(coords)
				let emsg =  JSON.stringify(e)
				this.errorMessage =  `outer:${emsg}:${e.message} ${coods}`;
			 }
		},
		handleControllerTap(e) {
			if (e.controlId === 1) {
				this.getCurrentPosition();
			}
		},
		handleMapReady() {
			// 注册关联map组件的上下文对象
			this.mapContext = uni.createMapContext('mapContainer');
			// 获取地理位置并设置为地图中心
			// uni.getLocation().then(result => {
			// 	this.mapCenter = {
			// 		longitude: result[1].longitude,
			// 		latitude: result[1].latitude
			// 	};
			// 	this.mapContext.moveToLocation();
			// });

			plus.geolocation.getCurrentPosition(
				({ coords }) => {
					const LOCATION = {
						longitude: coords.longitude,
						latitude: coords.latitude
					};

					this.mapCenter = LOCATION;
					this.mapContext.moveToLocation();
				},
				err => {
					this.errorMessage = `${err.code}:${err.message}`;
				},
				{
					enableHighAccuracy: true,
					geocode: false
				}
			);
		},
		stopGetLocation() {
			// 注销监听设备位置变化信息
			plus.geolocation.clearWatch(this.watchId);
		}
	},
	onReady() {
		this.handleMapReady();
		// 开启一直保持程序唤醒状态  
        plus.device.setWakelock( true ); 
	}
};
</script>

<style lang="scss" scoped>
#mapContainer {
	position: relative;
	width: 750rpx;
	height: 100vh;
}
.map-btn {
	position: absolute;
	right: 30rpx;
	top: 80rpx;
	text-align: center;
	border-radius: 8rpx;
	color: red;
	padding: 6rpx 12rpx;
	border: 2rpx solid red;
	background-color: #ffffff;
}
.location-message1 {
	position: absolute;
	bottom: 40rpx;
	right: 30rpx;
	font-size: 18rpx;
	color: red;
}
.location-message2 {
	position: absolute;
	display: block;
	bottom: 160rpx;
	right: 10rpx;
	left:10rpx;
	height: 200rpx;  
	color: #ff007f;
	white-space:pre-wrap;
}
</style>
