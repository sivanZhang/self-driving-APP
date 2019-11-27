<template>
	<view>
		<view v-for="(item,index) of List" :key="index">
			{{item.user_id}}
		</view>
	</view>
</template>

<script>
	import {
		Track_Rank,
	} from '@/api/track.js'
	export default {
		components: {
			
		},
		data() {
			return {
				List:[],
			};
		},
		computed: {
			
		},
		methods: {
			lookrank(){
				let data = {
					week:'',
					month:'',
					year:'',
					total:''
				}
				Track_Rank(data).then(({
					data
				}) => {
					if(data.status === 0){
						this.List = [...data.msg];
						console.log("----------")
						console.log(this.List)
					}
					console.log(data)
				})
			}

		},
		onLoad() {
			this.lookrank()
		},
		onShow(){
			
		},
	};
	
</script>

<style>
</style>
