<template>
<!-- 我的收藏 -->
    <view id="myclooect">
        <block v-for="(item,index) of router.line" :key="index">
			<view class="container section">
				<view class="detail">
					<view class="content">
						<view class="content-top">
							<image src="../../../static/image/face.jpg"></image>
							<view class="content-middle">
								<h4>{{item.creator_name}}</h4>
								<p>发布日期:{{item.create_date|dateFormat}}</p>
							</view>
							<view class="content-right" v-if="UserInfo.id != item.creator_id">
								<view class="content-right-follow" v-if="followClick" @tap="addConcern(item.id,index)">
									<view style="font-size: 24upx;" class="iconfont icon-jiahao"></view>
									<view>关注</view>
								</view>
								<view class="content-right-followover" v-else>
									<view style="font-size: 24upx;" class="iconfont icon-duigou"></view>
									<view>已关注</view>
								</view>
							</view>
						</view>
						<view class="place-list">
							<view class="place" v-for="(row,index) of item.via_list" :key="index">
								<view @tap="target('/pages/team/releaseRouter/signalRouterDetail?id='+item.id)">
									<view style="align-items: center;">
										<view class="place-left" v-if="row.sort == -1">
											<view>
												<view>{{row.parent_name}}</view>
												<view>{{row.area_name}}</view>
											</view>
											<image style="width:80upx ;height: 60upx;" src="../../../static/icons/youjiantou.png"></image>
										</view>
										<view class="place-left" v-if="row.sort == 0">
											<view>{{row.parent_name}}</view>
											<view>{{row.area_name}}</view>
										</view>
									</view>
									<view v-if="show">
										<view>{{row.parent_name}}</view>
										<view>{{row.area_name}}</view>
									</view>
								</view>
							</view>
							<view class="place-point" @tap="placePoint">
								<image style="height:40upx;width: 40upx;" src="../../../static/image/position.png"></image>
								<text>途经点</text>
							</view>
						</view>
						<view class="place-list">
							<view>
								<span style="font-weight: bold;">时间安排：</span>
								{{ item.start_date | dateFormat }}--{{ item.end_date | dateFormat }}
							</view>
						</view>
					</view>
				</view>
			</view>
        </block>
    </view>
</template>
<script>
import {getCollect} from '@/api/likeCollect'
import {
		addConcern
	} from '@/api/followsFans'
export default {
    data(){
        return{
            reward:[],//悬赏
            partner:[],//搭伴
            dynamic:[],//动态
           router:[],//路线
           giftList:[],//礼品
           comment:[],//评论
        }
    },
    onLoad(){
       this.getCollect();
    },
    methods:{
        getCollect(){
            getCollect({mine:""}).then(({data})=>{
                // console.log(data);
            [...data.msg].map(item =>{
                // console.log(item)
                switch(item.entity){
                    case 1:
                    this.reward = item;
                    break;
                    case 2:
                    this.partner = item;
                    break;
                    case 3:
                    this.dynamic = item;
                    break;
                    case 4:
                    this.router = item;
                    break;
                    case 5:
                    this.giftList = item;
                    break;
                    case 6:
                    this.comment = item;
                    break;
                }
            })
            })
        },
        //添加关注
			addConcern(id,key) {
				this.RouterList.forEach((item,index)=>{
                  if(index == key){
                   this.followClick = false;
				addConcern({follow_ids:id}).then(({data})=>{
				})}
				})	
			},
    }
}
</script>
<style lang="scss">
#myclooect{
    .section {
			padding-top: 25upx;

			.detail {
				// background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				padding: 20.833rpx;
				min-height: 212.5upx;
				border: 2.083upx solid #c8c8cc;
				// border: 2.083upx solid #ececec;
				// box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
				font-size: 27.083upx;

				.content {
					padding: 20.833rpx;
					flex: 0 1 100%;
					width: 100%;
					font-size: 27.083upx;

					.content-top {
						display: flex;
						justify-content: space-between;
						align-items: center;

						&>image {
							width: 90upx;
							height: 90upx;
							border-radius: 50%;
						}
					}

					.content-middle {
						padding-left: 15upx;
						-webkit-box-flex: 1;
						-webkit-flex: 1;
						flex: 1;
						min-width: 0;
					}

					.content-middle h4 {
						font-weight: 400;
						font-size: 16px;
						width: auto;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						word-wrap: normal;
						word-wrap: break-word;
						word-break: break-all;
						padding-bottom: 5px;
						color: #333;
					}

					.content-middle p {
						color: #848689;
						font-size: 13px;
						line-height: 1.2;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
					}

					.content-right {
						width: 20%;

						.content-right-follow {
							font-size: 24upx;
							height: 20px;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 50px;
							border: 1px solid #DF5000;
							color: #DF5000
						}

						.content-right-followover {
							font-size: 24upx;
							height: 20px;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 50px;
							border: 1px solid #c8c8cc;
						}
					}
				}

				.place-list {
					padding: 25upx 0upx;
					display: flex;
					justify-content: space-between;
				}

				.place {
					// width: 50%;
					font-size: 35upx;

				}

				.place-left {
					display: flex;
					align-items: center;
				}

				.place-point {
					// padding-left: 150upx;
				}
			}
    }
}
</style>