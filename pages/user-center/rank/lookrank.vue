<template>
	<!-- 里程排行榜 -->
	<!-- #ifdef H5 -->
	<view id="rank">
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view id="rank" :style="{backgroundImage: 'url('+imageURL+')',backgroundSize:'cover',backgroundPosition:'center'}">
			<!-- #endif -->
		<view class="top">
			<view class="total">总榜</view>
			<view class="month">月榜</view>
		</view>
		<view class="content">
			<image class="avatar" src="/static/image/face.jpg"></image>
			<view class="grade">
				<image class="second" src="/static/icons/second.png"></image>
				<image class="first" src="/static/icons/first.png"></image>
				<image class="third" src="/static/icons/third.png"></image>
			</view>
		</view>
		<view class="card">
			<view class="aui-news-item" v-for="(item,index) of List" :key="index">
				<view class="aui-news-item-cd">
					{{index+4}}
				</view>
				<view class="aui-news-item-hd">
					<image src="/static/image/p10.jpg"></image>
				</view>
				<view class="aui-news-item-bd">
					{{item.user_name}}
				</view>
			    <view class="aui-news-item-fr">{{item.distance}}km</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCard from "@/components/uni-card/uni-card"
	import {
		Track_Rank,
	} from '@/api/track.js'
	export default {
		components: {
			uniCard
		},
		data() {
			return {
				imageURL: '/static/image/background_rank.gif',
				List:[],
			};
		},
		computed: {
			
		},
		methods: {
			lookrank(){
				let data = {
					week:'',
					month:'',
					year:'',
					total:''
				}
				Track_Rank(data).then(({
					data
				}) => {
					if(data.status === 0){
						this.List = [...data.msg];
						console.log("----------")
						console.log(this.List)
					}
					console.log(data)
				})
			}

		},
		onLoad() {
			this.lookrank()
		},
		onShow(){
			
		},
	};
	
</script>

<style lang="scss">
	#rank{
		min-height: 100vh;
		position: relative;
		/* #ifdef H5 */
		min-height: 100vh;
		background-image: url(~@/static/image/background_rank.gif);
		background-size: cover;
		background-position: center;
		/* #endif */
		.top{
			position:absolute;
			background-color: #222222;
			margin:20upx 30upx;
			height:70upx;
			width:92%;
			color:#708090;
			font-size:35upx;
			display:flex;
			flex-wrap: wrap;
			border-radius: 20upx;
			.total{
				padding-top:10upx;
				padding-left:20upx;
				width:50%;
				color:#FFFFFF;
				background-color:#708090;
				border-radius: 20upx;
				text-align: center;
			}
			.month{
				padding-top:10upx;
				padding-left:20upx;
				width:50%;
				text-align: center;
			}
		}
	    .content{
			position: absolute;
			margin-top:200upx;
			margin-left:20upx;
			.grade{
				display:flex;
				flex-wrap: wrap;
			}
			image{
				width:170upx;
				height:180upx;
			}
			.avatar{
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				margin-left:30upx;
				z-index:999;
				position:absolute
			}
			.first{
				margin-top:10upx;
				margin-left:90upx;
			}
			.second{
				margin-top:80upx;
			}
			.third{
				margin-top:60upx;
				margin-left:110upx;
			}
		}
	    .card{
			background-color:#B3D4FC;
			height:auto;
			width:94%;
			margin-left:20upx;
			margin-top:500upx;
			position:absolute;
			border-radius: 20upx;
			.aui-news-item {
			    padding: 20upx;
			    position: relative;
			    display: -webkit-box;
			    display: -webkit-flex;
			    display: flex;
			    -webkit-box-align: center;
			    -webkit-align-items: center;
			    align-items: center;
			}
			
			.aui-news-item-cd {
			    margin-right: .4em;
			    text-align: center;
				font-size:35upx;
			}
			.aui-news-item-hd {
			    margin-right: .8em;
			    width: 90upx;
			    height: 90upx;
				border-radius: 50%;
			    line-height: 80upx;
			    text-align: center;
			}
			
			.aui-news-item-hd image {
			    width: 100%;
			    max-height: 100%;
				border-radius: 50%;
				vertical-align: top;
			}
			
			.aui-news-item-bd {
			    -webkit-box-flex: 1;
			    -webkit-flex: 1;
			    flex: 1;
			    min-width: 0;
				font-size:35upx;
			}
			.aui-news-item:before {
			    position: absolute;
			    z-index: 2;
			    -webkit-transform: scaleY(0.5);
			    transform: scaleY(0.5);
			    -webkit-transform-origin: 0 100%;
			    transform-origin: 0 100%;
			}
			
			.aui-news-item-fr {
			    text-align: right;
			    font-size: 35upx;
			}
		}
	}
</style>
