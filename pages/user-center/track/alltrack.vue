<template>
<view id="track">
	  
	  <view class="header">
		<text class="text" >今天</text>
		   <image src="../../../static/icons/addchange.png" @tap="target('/pages/user-center/my-account')"></image> 
	  </view>
	  
	  <block v-for="(item,index) of TrackList" :key="index" >
	  	<view class="container">
	  				<view class="content" @tap="targe('/pages/user-center/track/signaltrack?id='+item.id)">
						<view class="time">
								<span class="date">{{ item.start_date | dateFormat }}</span>
							    <image class="icon"  src="../../../static/icons/more.png"></image>
						</view>
	  					<view >
						<image class="i" :src="'https://tl.chidict.com'+'/'+thumbnail_portait"></image>
						<text class="mileage">里程数：{{item.mileage}}</text>
						</view>
	  					<view class="content-middle">
	  						<h4>{{item.creator_name}}</h4>
	  					</view>
	  					<view>
						起止日期：{{ item.start_date | dateFormat }}--{{ item.end_date | dateFormat }}
						</view>
	  				
					</view>
	  			
	  	</view>
	
	  </block>
		
</view>
</template>
<script>
	import {
		search_users
	} from '@/api/usercenter'
	import {
		
		Show_CarTrack
	} from '@/api/cartrack.js'
	export default{
		data(){
			return{    
				thumbnail_portait: '',
				TrackList:[],  
			}
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			},
			
		},
		onShow() {
			this.search();
		    this.getTrackList();
		},
		methods:{
			target(url) {
				uni.switchTab({
					url
				})
			},
			targe(url){
				uni.navigateTo({
					url
				})
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
					this.creater_name = data.msg[0].username;
					
				})
			},
			getTrackList(){
				Show_CarTrack().then(({ data })=>{
				 this.TrackList = data.msg;
				   
				})
			},
		},
	}
	</script>
<style lang="scss">
	#track{
		overflow-x: hidden;
		.header{
		display: flex;
		flex-wrap: wrap;
		padding:10upx;
		position:relative;
		width:100%;
		background-color:#DAC2A6;
		
		.text{
			position:relative;
			padding-top:5%;
			padding-left:20upx;
			padding-right:5%;
			font-size:20px;
			font-weight:bold;
		}
		image{
			width:125upx;
			height:120upx;
			
		}
		}
		
		.container{
			padding-top:10upx;
			padding-left:20upx;
			padding-right:20upx;
			
			
			.content{
				background-color:#DAC2A6;
				padding:20upx;
				justify-content:space-between;
				.time{
					padding-bottom:10upx;
					.date{
						font-weight:bold;
						padding-right:12rem;
					}
				}
				.i {
					width: 130rpx;
					height: 130rpx;
					border-radius: 50%;
					box-shadow: 1px 1px 2px #F2F2F2;
					border: 1.5px solid #F2F2F2;
					
				}
				.icon{
					position:relative;
					width:50upx;
					height:50upx;
					
				}
				.mileage{
					padding-left:10%;
				}
			}
		}
		
	}
</style>