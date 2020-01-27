import Ajax from '../libs/http'
// //查看关注
// export function searchFollow(params) {
//     return Ajax.get('/followfans/followfans/',{params});
// }
//用户信息修改
export function update_users(payload){
	return Ajax.post('/users/users/?put',payload)
}
//上传附件
export function post_file(payload) {
    return Ajax.post('/appfile/appfile/',payload);
}
//查看用户
export function search_users(params){
	return Ajax.get('/users/list/',{params});
}
//测试定位
export function testPosition(params){
	return Ajax.get('/track/track/?test',{params});
}