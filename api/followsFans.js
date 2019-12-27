import Ajax from '../libs/http'
//添加关注
export function addConcern(data) {
    return Ajax.post('/followfans/followfans/',data);
}
//取消关注
export function deleteConcern(data) {
    return Ajax.post('/followfans/followfans/?delete',data);
}
//查看关注
export function searchFollow(params){
	return Ajax.get('/followfans/followfans/',{params})
}