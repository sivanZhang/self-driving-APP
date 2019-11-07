<template>
	<view class="page-body">
		
		<view class="uni-padding-wrap">
			<image style="width:4rem;height:4rem;left:0.7rem;top:-1rem;position:relative;border-radius:50%;"
			    src="../../static/image/journey/1.jpeg">
				</image>
				<text  style="position:relative;top:-1rem;left:2rem;" class="t">张三</text>
				<text style="position:relative;top:0rem;left:-1rem;">2019年10月22日</text>
				<text style="position:relative;top:1rem;left:-5.5rem;">我去了北京</text>
				
			<image style="width:3rem;height:3rem;left:-13.4rem;top:2.5rem;position:relative;"
			    src="../../static/image/journey/e.png" @click="chooseLocation">
				</image>  
				<block v-if="hasLocation === false">
					<view style="position:relative;left:0.9rem;top:2rem;">未选择位置</view>
				</block>
				<block v-if="hasLocation === true">
					<view style="position:relative;left:0.9rem;top:2rem;">
						{{locationAddress}}
					</view>
				</block>
				<!-- <button type="primary" @tap="chooseLocation">选择位置</button> -->
				<image style="width:2rem;height:2rem;position:relative;left:16rem;top:-6rem;"
				    src="../../static/image/journey/s.png" @click="shareInfo">
					</image> 
				<image style="width:3rem;height:4rem;position:relative;top:-1rem;left:3rem;" src="../../static/image/journey/1.jpg"></image>							
				<image style="width:3rem;height:4rem;position:relative;top:-1rem;left:3.5rem;" src="../../static/image/journey/2.jpg"></image>
					<image style="width:3rem;height:4rem;position:relative;top:-1rem;left:4rem;" src="../../static/image/journey/3.jpg"></image>
					<div class="heart" id="like2" rel="like"></div>
					<text style="position:relative;left:3.5rem;top:-5rem;">点赞</text>
					<image style="width:2rem;height:2rem;position:relative;left:5.5rem;top:-5.5rem;" src="../../static/image/journey/l.png">
					</image>
					<text style="position:relative;left:6rem;top:-5rem;">评论</text>
					<image style="width:1.5rem;height:1.5rem;position:relative;left:8.5rem;top:-5.5rem;" src="../../static/image/journey/collection.png">
					</image>
					<text style="position:relative;left:9rem;top:-5rem; ">收藏</text>
		</view>
		<view style="width: 18.5rem;height:200px;position:relative;background-color:#fff;border-radius:5px;left:0.8rem;top:3rem;">
			<image style="width:4rem;height:4rem;left:0.7rem;top:-1rem;position:relative;border-radius:50%;"
			    src="../../static/image/journey/1.jpeg">
				</image>
				<image style="width:2rem;height:2rem;position:relative;left:12rem;top:-1rem;"
				    src="../../static/image/journey/s.png" @click="shareInfo">
					</image> 
			
			<div class="heart" id="like2" rel="like" style="position:relative;top:3rem;left:0rem;"></div>
			<text style="position:relative;left:3.5rem;top:0rem;">点赞</text>
			<image style="width:2rem;height:2rem;position:relative;left:6rem;top:-0.5rem;" src="../../static/image/journey/l.png">
			</image>
			<text style="position:relative;left:6.5rem;top:0rem;">评论</text>
			<image style="width:1.5rem;height:1.5rem;position:relative;left:9rem;top:-0.5rem;" src="../../static/image/journey/collection.png">
			</image>
			<text style="position:relative;left:9.5rem;top:0rem; ">收藏</text>		
		</view>
		     <navigator url="/pages/foot/foot" hover-class="navigator-hover" >
		            <button style="position:relative;width:9rem;height:2.5rem;background-color:#F0F0F0;top:5rem;left:-4.5rem;border:0px;">足迹</button> 
		     </navigator>
			<navigator url="/pages/activity/activity" hover-class="navigator-hover" >
			<button style="position:relative;width:9rem;height:2.5rem;background-color:#F0F0F0;top:2.5rem;left:4.7rem;border:0px;">动态</button>
		    </navigator>
	</view>
</template>
<script>
	
	
	var util = require('../../common/util.js');
	var formatLocation = util.formatLocation;
    import share from "@/common/share.js";
	export default {
		data() {
			return {
				title:'Hello',
				hasLocation: false,
				location: {},
				locationAddress: '',
				
				
			}
		},
		onBackPress() {
			//监听back键，关闭弹出菜单
			if (this.shareObj.shareMenu.isVisible()) {
				this.shareObj.shareMenu.hide();
				this.shareObj.alphaBg.hide();
				return true
			}
		},
		methods: {
			chooseLocation: function () {
				uni.chooseLocation({
					success: (res) => {
						this.hasLocation = true,
							this.location = formatLocation(res.longitude, res.latitude),
							this.locationAddress = res.address
					}
				})
			},
			shareInfo(){
				let shareInfo={
					href:"https://uniapp.dcloud.io",
					title:"分享测试",
					desc:"分享测试",
					imgUrl:"/static/logo.png"
				};
				let shareList=[
					{
						icon:"/static/image/journey/sharemenu/wx.png",
						text:"微信好友",
					},
					{
						icon:"/static/image/journey/sharemenu/pyq.png",
						text:"朋友圈"
					},
					{
						icon:"/static/image/journey/sharemenu/weibo.png",
						text:"微博"
					},
					{
						icon:"/static/image/journey/sharemenu/qq.png",
						text:"QQ"
					},
					{
						icon:"/static/image/journey/sharemenu/copy.png",
						text:"复制"
					},
					{
						icon:"/static/image/journey/sharemenu/more.png",
						text:"更多"
					},
				];
				this.shareObj=share(shareInfo,shareList,function(index){
					console.log("点击按钮的序号: " + index);
					let shareObj={
						href:shareInfo.href||"",
						title:shareInfo.title||"",
						summary:shareInfo.desc||"",
						success:(res)=>{
							console.log("success:" + JSON.stringify(res));
						},
						fail:(err)=>{
							console.log("fail:" + JSON.stringify(err));
						}
					};
					switch (index) {
						case 0:
							shareObj.provider="weixin";
							shareObj.scene="WXSceneSession";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider="weixin";
							shareObj.scene="WXSenceTimeline";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 2:
							shareObj.provider="sinaweibo";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 3:
							shareObj.provider="qq";
							shareObj.type=1;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 4:
							uni.setClipboardData({
								data:shareInfo.href,
								complete() {
									uni.showToast({
										title: "已复制到剪贴板"
									})
								}
							})
							break;
						case 5:
							plus.share.sendWithSystem({
								type:"web",
								title:shareInfo.title||"",
								thumbs:[shareInfo.imgUrl||""],
								href:shareInfo.href||"",
								content: shareInfo.desc||"",
							})
							break;
					};
				});
				this.$nextTick(()=>{
					this.shareObj.alphaBg.show();
					this.shareObj.shareMenu.show();
				})
			},
			
			
		}
	}
</script>



<style>
	
	.page-body{
		width: 100%;
		height: 612px;
		background-color: #3B4144;
	}
	.t{
	     position:relative;
		 left:1.5rem;
		 top:-3rem;
		 
	}
	.heart {
		background: url(http://demo.htmleaf.com/1511/201511131551/images/web_heart_animation.png);
		height: 90px;
		width: 90px;
		position: relative;
		top: -2rem;
		left: 0rem;
		background-size: 2900%;
	}
	
	.heart:hover,
	.heart:focus {
		background-position: right;
	}
	
	@-webkit-keyframes heartBlast {
		from {
			background-position: left;
		}
	
		to {
			background-position: right;
		}
	}
	
	@keyframes heartBlast {
		from {
			background-position: left;
		}
	
		to {
			background-position: right;
		}
	}
	
	.heartAnimation {
		-webkit-animation-name: heartBlast;
		animation-name: heartBlast;
		-webkit-animation-duration: .8s;
		animation-duration: .8s;
		-webkit-animation-iteration-count: 1;
		animation-iteration-count: 1;
		-webkit-animation-timing-function: steps(28);
		animation-timing-function: steps(28);
		background-position: right;
	}
	.uni-padding-wrap{
		
		background-color: #fff;
		
		width: 18.5rem;
		height:200px;
		top: 1.5rem;
		left: 0.8rem;
		border-width: 0;
		border-radius: 0.4rem;
		
		position: relative;
	}
	
</style>
