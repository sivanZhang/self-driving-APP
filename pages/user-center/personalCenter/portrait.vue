<template>
	<view id="portrait">
		
		<cropper  selWidth="750rpx" selHeight="700rpx" @upload="myUpload" :avatarSrc="imageurl" avatarStyle="width:95%;height: 700rpx;position:relative;margin-top:25%;left:2.5%;border: 1px solid #F2F2F2;">
		</cropper>
	</view>
</template>

<script>
	import cropper from "@/components/cropper.vue";
	export default{
		data(){
			return{
				imageurl:'https://tl.chidict.com'+'/'+this.$store.state.UserInfo.thumbnail_portait,
			};
		},
		components: {
			cropper
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			}
		},
		methods:{
			myUpload(rsp) {
				console.log(rsp)
				const self = this;
				self.imageurl = rsp.path; //更新头像方式一	
				uni.uploadFile({
					url: 'https://tl.chidict.com/users/portrait_backimage/',
					filePath:rsp.path,  
					name: 'portrait_file', 
					header: {
						"Content-Type": "multipart/form-data",
						'Authorization': uni.getStorageSync('estateToken') || this.$store.state.estateToken,
					},
					success: (res) => {
						// let data = JSON.parse(res.data)
						// this.msg = data.msg
						// console.log(this.msg)
						uni.showToast({
							title: '修改成功',
							icon: "none",
						});
					},
					fail: () => {
						uni.showToast({
							title: '修改失败'
						});
					}
				});
				uni.reLaunch({
					url:'/pages/login/login-page',
					animationDuration: 200
				});
			//	rsp.avatar.imgSrc = rsp.path; //更新头像方式二
			},
		}
	}
</script>

<style lang="scss">
	#portrait{
		background-color:#3B4144;
		overflow-x: hidden;
		width:100%;
		height:100vh;
	}
	
</style>
