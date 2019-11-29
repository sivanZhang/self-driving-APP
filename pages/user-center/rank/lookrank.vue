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
				<button class="total" :style="{background:background,
					color:color}" size="mini" @tap="lookrank_total">总榜</button>
				<button class="month" size="mini" @tap="lookrank_month">月榜</button>
			</view>
		</view>
		<view class="content">
			<view class="rank_data">
				<view v-for="(item,index) of List2" :key="index">
					<view class="part2" v-if="index==1">
						<view class="name">{{item.user_name}}</view>
						<image class="i2" :src="'https://tl.chidict.com'+'/'+item.user__thumbnail_portait"></image>
						<view class="number">{{item.distance}}</view>
						<view class="km">km</view>
					</view>
					<view class="part1" v-if="index==0">
						<view class="name">{{item.user_name}}</view>
						<image class="i1" :src="'https://tl.chidict.com'+'/'+item.user__thumbnail_portait"></image>
						<view class="number">{{item.distance}}</view>
						<view class="km">km</view>
					</view>
					<view class="part3" v-if="index==2">
						<view class="name">{{item.user_name}}</view>
						<image class="i3" :src="'https://tl.chidict.com'+'/'+item.user__thumbnail_portait"></image>
						<view class="number">{{item.distance}}</view>
						<view class="km">km</view>
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
						<image class="i" :src="'https://tl.chidict.com'+'/'+item.user__thumbnail_portait"></image>
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
				background:'#262d37',
			    color:'white',
				thumbnail_portait:'',
				imageURL: '/static/image/background_rank.gif',
				List:[],
				List2:[]
			};
		},
		computed: {
			
		},
		methods: {
			lookrank_total(){
				let data = {
					year:''
				}
				Track_Rank(data).then(({
					data
				}) => {
					if(data.status === 0){
						this.background = '#262d37'
						this.color = 'white'
						this.List = [...data.msg];
					    this.List2 = this.List.slice(0,3)
						this.thumbnail_portait = "0"
						console.log(this.List)
						console.log(this.thumbnail_portait)
					}
					console.log(data)
				})
			},
			lookrank_month(){
				let data = {
					month:''
				}
				Track_Rank(data).then(({
					data
				}) => {
					if(data.status === 0){
						this.background = '#1d1e23'
						this.color = '#4a4b50'
						this.List = [...data.msg];
					    this.List2 = this.List.slice(0,3)
						this.thumbnail_portait = "0"
						console.log(this.List)
						console.log(this.thumbnail_portait)
					}
					console.log(data)
				})
			}

		},
		onLoad() {
			this.lookrank_total()
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
		.i1,.i2,.i3,.i {
			position: relative;
			left: 3%;
			width: 130rpx;
			height: 130rpx;
			border-radius: 50%;
			// box-shadow: 1px 1px 2px #F2F2F2;
			border: 1.5px solid #F2F2F2;
			background-color: #EFEFEF;
		}
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
			}
		}
	    .content{
			// position: absolute;
			margin-left:20upx;
			color:white;
			.rank_data{
				display:flex;
				flex-wrap: nowrap;
				flex-direction: row;
				// justify-content:space-between;
				// display: -webkit-flex; /* Safari */
				font-size:32upx;
				image{
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
					margin-left:30upx;
					z-index:9;
					// position:absolute;
				}
					.name{
						// padding-left:30upx;
						margin-top:120upx;
						text-align: center;
					}
					.number{
						// padding-left:30upx;
						margin-top:170upx;
						text-align: center;
					}
					.km{
						// margin-left:60upx;
						text-align: center;
					}
					.part1{
						text-align: center;
			            margin-left:290upx; 
						margin-top:10upx;
						.i1{
							margin-left:-30upx;
						}
					}
					.part2{
						margin-top:170upx;
						margin-left:-780upx;
						.i2{
							margin-left:325upx;
						}
					}
					.part3{
						text-align: center;
						margin-top:200upx;
						margin-left:100upx;
						.i3{
							margin-left:20upx;
						}
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
					margin-top:-380upx;
					margin-left:110upx;
				}
				.second{
					margin-top:-330upx;
				}
				.third{
					margin-top:-300upx;
					margin-left:110upx;
				}
			}
		}
	    .card{
			background-color:#B3D4FC;
			height:auto;
			width:94%;
			margin-left:22upx;
			margin-top:50upx;
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
