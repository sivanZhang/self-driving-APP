<template>
	<!-- 创建搭伴 -->
	<view id="createTeam">
		<view class="body">
			<form @submit="formSubmit" @reset="formReset">
				<view class="bodyList" style="display: flex;">
					<view style="display: flex;border-right: 2.083upx solid #c8c8cc;align-items: center;padding: 15upx 15upx;width: 50%;">
						<view>出发日：</view>
						<view>
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{ date }}</view>
							</picker>
						</view>
					</view>
					<view style="display: flex;align-items: center;padding: 15upx 15upx;width: 50%;">
						<view>返回日：</view>
						<view>
							<!-- <input type="text" /> -->
							<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2">
								<view class="uni-input">{{ date2 }}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">Submit</button>
					<button type="default" form-type="reset">Reset</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			date: currentDate,
			date2: currentDate
		};
	},
	components: {},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
		},
		bindDateChange2: function(e) {
			this.date2 = e.target.value;
		},
		formSubmit: function(e) {
			console.log(this.date);
			console.log(this.date2);
		}
	}
};
</script>

<style lang="scss">
#createTeam {
	.body {
		.bodyList {
			display: flex;
			// align-items: center;
			// padding: 25upx 30upx;
			border-bottom: 2.083upx solid #c8c8cc;
		}
	}
}
</style>
