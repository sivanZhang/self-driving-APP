<template>
	<view class="m-item" :id="'message'+id">
		<view class="m-left">
			<image class="head_icon" :src="abosultPaht+user.home.img" v-if="message.user=='home'"></image>
		</view>
		<view class="m-content">
			<view class="m-content-head" :class="{'m-content-head-right':message.user=='customer'}">
				<view :class="'m-content-head-'+message.user">{{message.content}} </view>
			</view>
		</view>
		<view class="m-right">
			<image class="head_icon" :src="abosultPaht+user.customer.img" v-if="message.user=='customer'"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				abosultPaht: "../../../"
			}
		},
		props: ['message', 'id'],
		computed: mapState(['user'])
	}
</script>

<style>
	.m-item {
		display: flex;
		flex-direction: row;
		padding-top: 10px;
	}
	.m-left {
		display: flex;
		width: 60px;
		justify-content: center;
		align-items: center;
	}
	.m-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		word-break: break-all;
	}
	.m-right {
		display: flex;
		width: 60px;
		justify-content: center;
		align-items: center;
	}
	.head_icon {
		width: 40px;
		height: 40px;
		border-radius: 10%;
	}
	.m-content-head {
		position: relative;
		display: inherit;
	}
	.m-content-head-right {
		display: flex;
		justify-content: flex-end;
	}
	.m-content-head-home {
		text-align: left;
		background: #1482d1;
		border: 1px #1482d1 solid;
		border-radius: 10px;
		padding: 18upx 15px;
		color: white;
	}
	.m-content-head-home:before {
		border: 10px solid transparent;
		border-right: 15px solid #1482d1;
		left: -18px;
		width: 0;
		height: 0;
		position: absolute;
		content: ' '
	}
	.m-content-head-customer {
		border: 1px #1AAD19 solid;
		background: #1AAD19;
		border-radius: 10px;
		padding: 18upx 15px;
		color: white;
	}
	.m-content-head-customer:after {
		border: 10px solid transparent;
		border-left: 15px solid #1AAD19;
		top: 12px;
		right: -18px;
		width: 0;
		height: 0;
		position: absolute;
		content: ' '
	}
</style>
