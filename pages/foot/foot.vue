<template>
<view class="page-body">
        <image style="width:2rem;height:2rem;position:relative;left:17rem;top:1rem;"
            src="../../static/image/journey/s.png" @click="shareInfo">
        	</image> 
	    <view  style="position:relative;width:20rem;height:2.5rem;background-color:#F0F0F0;top:29.5rem;">
		<div class="heart" id="like2" rel="like" style="position:relative;top:-1.1rem;left:0rem;"></div>
	    <text style="position:relative;left:3.5rem;top:-4.5rem;">点赞</text>
	    <image style="width:2rem;height:2rem;position:relative;left:6rem;top:-4.7rem;" src="../../static/image/journey/l.png">
	    </image>
	    <text style="position:relative;left:6.5rem;top:-4.5rem;">评论</text>
	    <image style="width:1.5rem;height:1.5rem;position:relative;left:9rem;top:-4.5rem;" src="../../static/image/journey/collection.png">
	    </image>
	    <text style="position:relative;left:9.5rem;top:-4.5rem; ">收藏</text>
		</view>
    </view>
</template>
<style>
		.page-body{
			width:100%;
			height: 612px;
			background-color: #3B4144;
			overflow: hidden;
		}
		.heart {
			background: url(http://demo.htmleaf.com/1511/201511131551/images/web_heart_animation.png);
			height: 90px;
			width: 90px;
			position: relative;
			
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
</style>
<script>
	 import share from "@/common/share.js";
	export default{
		data(){
			return{
				
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

