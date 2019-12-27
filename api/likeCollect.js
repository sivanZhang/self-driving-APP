import Ajax from '../libs/http'
//添加点赞功能
export function addLike(payload) {
    return Ajax.post('/comment/like/', payload)
};
//添加收藏功能
export function addCollect(payload) {
    return Ajax.post('/comment/collect/', payload)
};
//取消收藏
export function deleteCollect(payload) {
    return Ajax.post('/comment/collect/?delete', payload)
};
//查看点赞
export function getLike(params){
	return Ajax.get('/comment/like/',{params})
}
//查看收藏
export function getCollect(params){
	return Ajax.get('/comment/collect/',{params})
}
