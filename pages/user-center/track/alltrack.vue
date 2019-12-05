<template>

	<view id="track">

		<view class="header" v-if="showtoday">
			<map  style="width: 100%; height: 350px;" :polyline='polylines' :latitude="latitude" :longitude="longitude"
			 :markers="markers" scale="17">
			<cover-view class="time">{{ start_date | dateFormat }}--{{end_date | dateFormat}}</cover-view>
			<cover-view class="distance">{{mileage}}</cover-view>
			<cover-view class="part">km</cover-view>
			<cover-view class="start_point">{{start_point}}</cover-view>
			<cover-view class="flow">至</cover-view>
			<cover-view class="end_point">{{end_point}}</cover-view>
			<cover-view class="rank">排名{{rank}}</cover-view>
			</map>
			
			
			
		</view>	
		<view class="header" v-else-if="showhistory">
			<map  style="width: 100%; height: 350px;" :polyline='polyline' :latitude="latitude1"
			 :longitude="longitude1" :markers="markers" scale="17">
			 <cover-view class="time">{{ create_date | dateFormat }}--{{over_date | dateFormat}}</cover-view>
			 <cover-view class="distance">{{distance}}</cover-view>
			 <cover-view class="part1">km</cover-view>
			 <cover-view class="start_point">{{create_point}}</cover-view>
			 <cover-view class="flow">至</cover-view>
			 <cover-view class="end_point">{{over_point}}</cover-view>
			 <cover-view class="rank">排名{{rank}}</cover-view>
			</map>
		</view>


		<view class="container" >
            <view v-for="(item,index) of TrackList" :key="index" >
			<view class="content"  @tap="showTrack(item.id)">
			<view    class="content-top"></view>
			<view class="content-middle">
				<view class="uni-content-image">
					<image src="/static/icons/zuji.png" />
				</view>
                <view class="date">
                   {{ item.start_date | dateFormat }}--{{ item.end_date | dateFormat }}
                </view>
				<text class="mileage">{{item.mileage}}</text>
			</view>
            </view>
			</view>
		</view>
	</view>
</template>
<script>
	import {

		Show_CarTrack
	} from '@/api/cartrack.js'
	export default {
		data() {
			return {
				create_date:null,
				over_date:null,
				create_point:'',
				over_point:'',
				distance:0,
				start_point:'',
				end_point:'',
				start_date:null,
				end_date:null,
				mileage:0,
				rank:0,
				id: '',
				TrackList: [],
				showtoday: true,
				showhistory: false,
				polylines: [],
				longitude: '',
				latitude: '',
				polyline:[],
				latitude1:'',
				longitude1:'',
				markers: [],
			}
		},
		onNavigationBarButtonTap(val) {
			if (val.index == 0) {
				console.log(val)
			}
		},
		onLoad(option) {
			this.id = option.id;
			console.log(this.id)
           
		},
		onShow() {
			this.getTrackList();
			this.showTrackList();
		},
		methods: {
             showTrackList(){
				 Show_CarTrack().then(({ data })=>{
				 	 this.TrackList = data.msg;
				 			   
				 	})
			 },
			 showTrack: function(e) {
			 	console.log(e)
				this.showhistory = true;
				this.showtoday = false;
				Show_CarTrack({
					id: e
				}).then(({
					data
				}) => {
					
					var record = data.msg[0].record;
					var record1 = JSON.parse(record);
					var points = []
					record1.forEach((item, index) => {
						points.splice(index, 0, {
							latitude: item[1],
							longitude: item[0]
						})
					})
					
					this.latitude1 = points[0].latitude;
					this.longitude1 = points[0].longitude;
					this.polyline = [{
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
					this.create_date = data.msg[0].start_date;
					this.over_date = data.msg[0].end_date;
					this.distance = data.msg[0].mileage;
					this.create_point = data.msg[0].start_point;
					this.over_point = data.msg[0].end_point;
					this.rank = data.msg[0].rank;
				})
				
			 },
			 getTrackList() {
				 
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
				this.start_date = data.msg[0].start_date;	
				this.end_date = data.msg[0].end_date;
				this.mileage = data.msg[0].mileage;
				this.start_point = data.msg[0].start_point;
				this.end_point = data.msg[0].end_point;
				this.rank = data.msg[0].rank;
				})
			},
		},
	}
</script>
<style lang="scss">
	#track {
		overflow-x: hidden;

		.header {
			padding: 10upx;
			display:flex;
			.time{
				position:relative;
				font-size:45upx;
				left:5%;
				top:10%;
				
			}
			.part{
				position:relative;
				top:16%;
				left:13%;
				
			}
			.part1{
				position:relative;
				top:15%;
				left:28%;
				font-size:30upx;
			}
			.distance{
				position:relative;
				font-size:45upx;
				left:5%;
				top:25%;
				
			}
			.start_point{
				position:relative;
				font-size:45upx;
				top:35%;
				left:5%;
				
			}
			.flow{
				position:relative;
				left:5%;
				top:40%;
				font-size:30upx;
			}
			.end_point{
				position:relative;
				font-size:45upx;
				top:45%;
				left:5%;
			}
			.rank{
				top:10%;  
				left:78%;
				position:absolute;
				font-size:45upx;
				background-color: #4D4D4D;
				color: #FFFFFF;
				width: 120upx;
				padding:2%;
				text-align: center;
			}
		}

		.container {
			background-color:#F0F0F0;
			position: relative;
			padding-left:0px;
			padding-right:0px;
            .content{
				
				position:relative;
			}
			.content-top {
				padding-top: 4%;
				width: 70px;
				height: 0;
				border-width: 0 4px 10px 4px;
				border-style: solid solid solid;
				border-color: transparent transparent #fff;
				left: 5%;
				position: relative;
				
			}

			.content-middle {
				border-radius: 5px;
				background-color: #fff;
				position:relative;
				margin-bottom:-1rem;
				border-right:2px solid #fff;
			    display: flex;
			    flex-wrap: wrap;
				padding-top:3%;
				padding-left:6%;
				box-shadow: 2px 2px 2px #848689;
			   
                .uni-content-image{
					
					position:relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					image{
						left:8%;
						top:-0.5rem;
						position:relative;
						width: 70upx;
						height: 70upx;
						
					}
				}
				.date{
					padding-left:6%;
					padding-right:12%;
					padding-top:1%;
					position:relative;
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.mileage{
					padding-top:1%;
					position:relative;
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				
			}
		}

	}
</style>
