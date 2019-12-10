<template>
	<view>
		<view style="width: 95%;">
			{{newrecord}}
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				newrecord:[]
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
				try {
					this.newrecord = uni.getStorageSync('storage_key');
					if (this.newrecord) {
						console.log("数据缓存")
					   this.newrecord = this.newrecord.toString()
					   console.log(this.newrecord )
				    }
				} catch (e) {
				    // error
				}
			}
				
		}
	}
</script>

<style>
</style>
