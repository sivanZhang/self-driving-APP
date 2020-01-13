<template>
	<!-- 支付记录 -->
	<view id="expensesRecord">
		<block v-for="(item,index) of recordList" :key="index" style="margin-top:20upx">
			<view class="recordTime">{{item.modify_date| dateTimeFormat}}</view>
			<view class="container section">  
				<view class="detail">
					<view class="content">
						<view class="header">
							消费记录提醒
						</view>
						<view class="middle">
							变动金额(虚拟币)
							<view class="number">
								{{item.action}}.00币
							</view>
						</view>
						<view class="footer">
							<view class="footer-item">变动时间: {{item.modify_date| TimeFormat}}</view>
							<view class="footer-item">变动类型: {{type}}</view>
							<view class="footer-item">变动原因: {{(item.reason=="")?'无':item.reason}}</view>
						</view>
					</view>
				 </view>
			</view>
		</block>
	</view>
</template>

<script>
import dayjs from "dayjs"
import { Look_Coin } from '@/api/currency.js'
import { Pay_List } from '@/api/pay.js'
export default{
	data(){
		return{
			recordList:[],
			type:'',
			date:''
		}
	},
	methods:{
		lookCoin(){
			look_Coin({detail:''}).then(({ data }) =>{
			    if(data.status == 0){
				    this.recordList = [...data.msg]
					this.recordList.forEach((item,index)=>{
						switch (item.entity) {
							case 1:
								this.type = "悬赏"
							break;
							case 2:
								this.type = "搭伴"
							break;
							case 3:
								this.type = "动态"
							break;
							case 4:
								this.type = "路线"
							break;
							case 5:
								this.type = "礼品中心"
							break;
							case 6:
								this.type = "评论"
							break;
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
			padding-top:30upx;
		}
		.section {
			padding-top: 15upx;
			.detail {
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				padding: 18upx;
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
							margin-top: 10upx;
						}
					}
				}
			}
		}
	}
</style>

