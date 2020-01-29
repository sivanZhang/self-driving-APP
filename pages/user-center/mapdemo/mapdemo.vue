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
			<cover-view class="location-message">lon:{{ showLocation.longitude.toFixed(2) }} lat:{{ showLocation.latitude.toFixed(2) }}</cover-view>
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
		const polyline = {
			color: '#DC143C',
			arrowLine: true,
			width: 4,
			points: []
		};
		return {
			// 地图组件上面显示经纬度数值
			showLocation: {
				longitude: null,
				latitude: null
			},
			// 监听设备位置变化信息返回的ID ，用于后期注销监听
			watchId: null,
			// setInterval返回的ID信息，用于后期注销
			lineInterval: null,
			// 当前地图的上下文对象
			mapContext: null,
			//  当前地图的中心点
			mapCenter: {
				longitude: null,
				latitude: null
			},
			// 地图划线
			polylines: [polyline],
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
						left: 5,
						top: 5,
						width: 36,
						height: 36
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
			this.watchId = plus.geolocation.watchPosition(
				({ coords }) => {
					const LOCATION = {
						longitude: coords.longitude,
						latitude: coords.latitude
					};

					this.mapCenter = LOCATION;
					this.mapContext.moveToLocation();
					this.showLocation = LOCATION;
					// 划线
					this.polylines[0].points.push(LOCATION);
					// 定位信息发送后端
					postLocation({ ...LOCATION, speed: coords.speed || 0 }).then(() => {
						console.log('成功发送了http请求');
					});
					console.log('走');
				},
				err => {
					console.log('监听位置变化信息失败：' + err.message);
				},
				{
					enableHighAccuracy: true,
					geocode: false
				}
			);
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
			uni.getLocation().then(result => {
				this.mapCenter = {
					longitude: result[1].longitude,
					latitude: result[1].latitude
				};
				this.mapContext.moveToLocation();
			});
		},
		stopGetLocation() {
			// 注销监听设备位置变化信息
			plus.geolocation.clearWatch(this.watchId);
		}
	},
	onReady() {
		this.handleMapReady();
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
	top: 30rpx;
	text-align: center;
	border-radius: 8rpx;
	color: red;
	padding: 6rpx 12rpx;
	border: 2rpx solid red;
	background-color: #ffffff;
}
.location-message {
	position: absolute;
	bottom: 20rpx;
	right: 0;
	color: red;
}
</style>
