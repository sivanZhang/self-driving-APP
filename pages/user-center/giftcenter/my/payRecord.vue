<template>
	<!-- 支付记录 -->
	<view id="expensesRecord">
		<block v-for="(item,index) of recordList" :key="index" style="margin-top:20upx">
			<view class="recordTime">{{item.create_date| dateTimeFormat}}</view>
			<view class="container section">  
				<view class="detail">
					<view class="content">
						<view class="header">
							支付详情
						</view>
						<view class="middle">
							支付虚拟币
							<view class="number">
								{{item.money}}币
							</view>
						</view>
						<view class="footer">
							<view class="footer-item">支付时间: {{item.create_date| TimeFormat}}</view>
							<view class="footer-item">支付方式: {{way}}</view>
							<view class="footer-item">支付说明: 兑换{{name}}花费{{item.money}}币</view>
						</view>
					</view>
				 </view>
			</view>
		</block>
	</view>
</template>

<script>
import dayjs from "dayjs"
import { Pay_List } from '@/api/pay.js'
export default{
	data(){
		return{
			recordList:[],
			way:'',
			date:''
		}
	},
	methods:{
		lookCoin(){
			Pay_List().then(({ data }) =>{
			    if(data.status == 0){
					console.log(data)
				    this.recordList = [...data.msg],
					[...data.msg].map((item,index)=>{
						if(item.way == 0){
							this.way = "微信支付"
						} else if(item.way == 1){
							this.way = "支付宝支付"
						} else {
							this.way = "虚拟币支付"
						}
					})
			   }
			})
		}
	},
	onLoad() {
		this.lookCoin();
	},
}
</script>

<style lang="scss" scoped>
	#expensesRecord{
		background-color: #f0eff5;
		min-height: 100vh;
		position: relative;
		.recordTime{
			text-align: center;
			font-size:30upx;
			padding-top:34upx;
		}
		.section {
			padding: 25upx;
			.detail {
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				padding: 20upx;
				border: 2upx solid #ececec;
				border-radius: 20upx;
				.content {
					flex: 0 1 100%;  
					width: 0;
					.header{
						display:flex;
						padding-bottom: 15upx;
						margin-left:16upx;
						font-size:32upx;
						border-bottom: #CCCCCC solid 1upx;
					}
					.middle{
						padding-top:10upx;
						padding-bottom:20upx;
						font-size: 28upx;
						text-align: center;
						color:#CCCCCC;
						line-height: 1.8;
						.number{
							color: #000000;
						}
					}
					.footer{
						margin-top:20upx;
						margin-left:16upx;
						font-size:30upx;
						.footer-item{
							margin-top: 20upx;
						}
					}
				}
			}
		}
	}
</style>

