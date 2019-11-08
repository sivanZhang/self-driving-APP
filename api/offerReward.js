import Ajax from '../libs/http'
//发布悬赏
export function publish_reward(payload){
	return Ajax.post('/wanted/wanted/',payload)
}
//发布悬赏回答
export function publish_RewardAnswer(payload){
	return Ajax.post('/wanted/answer/',payload)
}
//删除悬赏回答
export function delete_RewardAnswer(payload){
	return Ajax.post('/wanted/answer/?delete',payload)
}
//删除悬赏
export function delete_Reward(payload){
	return Ajax.post('/wanted/wanted/?delete',payload)
}
//修改悬赏回答
export function edit_RewardAnswer(payload){
	return Ajax.post('/wanted/answer/?put',payload)
}
//查看悬赏回答
export function look_RewardAnswer(payload){
	return Ajax.get('/wanted/answer/',{payload})
}
//悬赏详情
export function query_RewardDetail(payload){
	return Ajax.get('/wanted/wanted/',{payload})
}