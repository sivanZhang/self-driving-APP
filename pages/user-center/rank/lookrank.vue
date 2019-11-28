<template>
	<!-- 里程排行榜 -->
	<!-- #ifdef H5 -->
	<view id="rank">
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view id="rank" :style="{backgroundImage: 'url('+imageURL+')',backgroundAttachment:'fixed',backgroundSize:'cover',backgroundPosition:'center'}">
			<!-- #endif -->
		<view class="top">
			<view class="section">
				<button class="total" size="mini">总榜</button>
				<button class="month" size="mini">月榜</button>
			</view>
		</view>
		<view class="content">
			<view class="rank_data">
				<view v-for="(item,index) of List2" :key="index">
					<view class="part1" v-if="index==1">
						<view class="name">{{item.user_name}}</view>
						<image src="/static/image/face.jpg"></image>
						<view class="number">{{item.distance}}</view>
					</view>
					<view class="part2" v-if="index==0">
						<view class="name">{{item.user_name}}</view>
						<image src="/static/image/face.jpg"></image>
						<view class="number">{{item.distance}}</view>
					</view>
					<view class="part3" v-if="index==2">
						<view class="name">{{item.user_name}}</view>
						<image src="/static/image/face.jpg"></image>
						<view class="number">{{item.distance}}</view>
					</view>
				</view>
			</view>
			<view class="grade">
				<image class="second" src="/static/icons/second.png"></image>
				<image class="first" src="/static/icons/first.png"></image>
				<image class="third" src="/static/icons/third.png"></image>
			</view>
		</view>
		<view class="card">
			<view v-for="(item,index) of List" :key="index">
				<view class="aui-news-item" v-if="index > 2">
					<view class="aui-news-item-cd">
						{{index+1}}
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
				List2:[]
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
					    this.List2 = this.List.slice(0,3)
						console.log("----------")
						console.log(this.List)
						console.log(this.List2)
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
		overflow-x: hidden;
		min-height: 100vh;
		position: relative;
		/* #ifdef H5 */
		background-image: url(~@/static/image/background_rank.gif);
		background-size: cover;
		background-position: center;
		background-attachment:fixed;
		/* #endif */
		.top{
			position:fixed;
			z-index:10;
			background-color: #22262f;
			// margin:20upx 30upx;
			height:80upx;
			width:100%;
			color:#708090;
			font-size:32upx;
			.section{
				display:flex;
				flex-wrap: wrap;
				width:90%;
				background-color: #1d1e23;
			    border-radius: 20upx;
				margin-left:40upx;
				margin-top:10upx;
				button{
					background-color:#1d1e23;
					width:50%;
					text-align: center;
					color:#4a4b50;
				}
				button:hover{
					background:#262d37;
					color:white;
				}
				.total{
					
				}
				.month{
					
				}
			}
		}
	    .content{
			position: absolute;
			margin-left:20upx;
			color:white;
			.rank_data{
				display:flex;
				flex-wrap: nowrap;
				flex-direction: row;
				justify-content:space-between;
				display: -webkit-flex; /* Safari */
				font-size:32upx;
				image{
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
					margin-left:30upx;
					z-index:99;
					position:relative;
				}
					.name{
						padding-left:30upx;
					}
					.number{
						padding-left:30upx;
						margin-top:150upx;
					}
					.part1{
			            margin-left:130upx; 
						margin-top:130upx;
					}
					.part2{
						margin-top:210upx;
						margin-left:0upx;
					}
					.part3{
						margin-top:200upx;
						margin-left:130upx;
					}
			}
			.grade{
				position: absolute;
				display:flex;
				flex-wrap: nowrap;
				image{
					width:170upx;
					height:180upx;
				}
				.first{
					margin-top:-310upx;
					margin-left:110upx;
				}
				.second{
					margin-top:-270upx;
				}
				.third{
					margin-top:-230upx;
					margin-left:110upx;
				}
			}
		}
	    .card{
			background-color:#B3D4FC;
			height:auto;
			width:94%;
			margin-left:22upx;
			margin-top:600upx;
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
