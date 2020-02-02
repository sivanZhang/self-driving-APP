<template>
	<view>
		<view  v-html="newrecord">  </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				newrecord:[],
			    
			}
			
		},
		onLoad(){

		},
		created() {
			this.getLocation();
		},
		methods:{
			//同步记录前端发给后端的位置信息
			getLocation(){
				let data = '';
				// try {
				//     uni.clearStorageSync('log_geo');
				// } catch (e) {
				//     // error
				// }
				try {
					this.newrecord = uni.getStorageSync('log'); 
					 
				} catch (e) {
				    // error
				}
			}
				
		}
	}
</script>

<style>
</style>
