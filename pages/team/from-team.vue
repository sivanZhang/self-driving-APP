<template>
	<view>
		组队
		<uni-card title="Dcloud" mode="title" :is-shadow="true" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg" extra="技术没有上限" note="Tips">
			那是一个秋意盎然、金风送爽的日子,我和父母一起来到了位于上师大旁的康健园.一踏进公园,一股浓郁的桂香扑鼻而来,泌人心脾,让我心旷神怡,只见一朵朵开得正烈的金色桂花,迎风而立,仿佛在向我招手.我们追着这桂香,走进了清幽的公园.
		</uni-card>
		 <button type="primary" @tap="target('createTeam/index')">页面主操作 Normal</button>
	</view>
</template>

<script>
import uniCard from '@/components/uni-card/uni-card';
export default {
	data() {
		return {};
	},
	components: {
		uniCard
	},
	methods: {
		target(url) {
			uni.navigateTo({
				url
			})
		},
	}
};
</script>

<style></style>
