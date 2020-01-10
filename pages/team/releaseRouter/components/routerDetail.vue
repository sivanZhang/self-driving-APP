<template>
	<view id="routerDetail">
		<block v-for="(item,index) of RouterList" :key="index">
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
							<view class="content-right" v-else>
								<view @tap="deleteRouter(item.id)">
								  <image style="height:50upx;width: 50upx;" src="../../../static/icons/more.png"></image>
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
                <view class="footer" v-if="UserInfo.id == item.creator_id">
					<view class="footer-left" @tap="target('/pages/team/createTeam/index?id='+item.id)">创建搭伴</view>
					<view class="footer-right" @tap="target('/pages/team/releaseRouter/signalRouterChange?id='+item.id)">修改</view>
					<!-- <view class="footer-right" @tap="deleteRouter(item.id)">删除</view> -->
				</view>
				<view class="footer" v-else>
                    <view class="footer-left" v-if="item.partner_id!=null">
                         <view  @tap="applyPartner(item.partner_id)">组队</view>
                    </view>
                    <view class="footer-left" v-else>
                         <view>邀请创建组队</view>
                    </view>
					<view class="footer-right" @tap="addCollect(item.id)">收藏</view>
				</view>
			</view>
		</block>
	</view>
</template>
<script>
import {
		deleteRouter
	} from '@/api/router'
	import {
		addConcern
	} from '@/api/followsFans'
	import {
		applyPartner
	} from '@/api/partner'
	import {
		addCollect
	} from '@/api/likeCollect'
export default {
    data() {
			return {
				show: false,
				followClick: true,
				activeColor: '#fbb10e',
			};
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			},
		},
		onShow() {
			console.log(this.UserInfo)
		},
    props: ["RouterList"],
    methods:{
       //添加收藏
			addCollect(id){
				addCollect({entity:4,instance:id}).then(({data})=>{
					if(data.status == 0){
					  uni.showToast({
							title: '收藏成功',
							duration: 2000
						});
				  }
				})
			},
			//申请组队
            applyPartner(partner_id){
				// console.log(creator_id)
              applyPartner({partner_id:partner_id}).then(({data })=>{
				  if(data.status == 0){
					  uni.showToast({
							title: '申请成功',
							duration: 2000
						});
				  }
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
			//删除路线
			deleteRouter(id) {
				var that = this;
				uni.showModal({
					content: '确定删除此路线吗？',
					confirmColor: "#FF0000",
					success: function(res) {
						if (res.confirm) {
							deleteRouter({
								method: "delete",
								ids: id
							}).then(({
								data
							}) => {
								if (data.status == 0) {
									uni.showToast({
										title: '删除成功',
										duration: 2000
									});
									that.$emit('getRouterList');
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			//展示途经点
			placePoint() {
				this.show = !this.show
			},
			//页面跳转
			target(url) {
				uni.navigateTo({
					url
				});
			},
    },
}
</script>
<style lang="scss">

</style>
