<template>
	<!-- 单个车迹详情页 -->
	<view id="signaltrack">
		<map style="width: 100%; height: 400px;" :polyline='polylines' :latitude="latitude" :longitude="longitude" :markers="markers"  show-location="true" scale="17">
		</map>
		
	</view>
</template>

<script>
	import {
		Show_CarTrack
	} from '@/api/cartrack.js'
	export default{
		data(){
			return{
				id:'',
				polylines: [],
				longitude: '',
				latitude: '',
				markers:[],
				
			}
		},
		onLoad(option) {
			this.id = option.id;
			console.log(this.id)
			this.searchTrackList();
		},
		methods:{
			searchTrackList(){
				Show_CarTrack({id:this.id}).then(({ data })=>{
				   uni.showToast({
					title: data.msg,
					icon: "none",
				   })
				 
				   	console.log(data.msg[0].record);
				       var a = data.msg[0].record;
				   	var b = JSON.parse(a);
				   	var points = []
				   	     b.forEach((item, index) => {
				   	      points.splice(index, 0, {
				   	       latitude: item[1],
				   	       longitude: item[0]
				   	      })
				   	     })
				   	console.log(points)
				   	this.latitude=points[0].latitude;
				   	this.longitude=points[0].longitude;
				   	this.polylines = [{
				   		points,
				   		color: "#0A98D5", //线的颜色
				   		width: 8, //线的宽度
				   		arrowLine: true,//带箭头的线 开发者工具暂不支持该属性
				   		
				   	}];
				   	this.markers = [{
				   		
				   		iconPath:'https://webapi.amap.com/images/car.png',
				   		latitude:points[0].latitude,
				   		longitude:points[0].longitude,
				   	},
				   	
				   	];
				   	
				   
				}) 
			}
		},
	}
</script>

<style lang="scss">
</style>
