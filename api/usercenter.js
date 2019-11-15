import Ajax from '../libs/http'
//查看关注
export function searchFollow(params) {
    return Ajax.get('/followfans/followfans/',{params});
}
//用户信息修改
export function update_users(payload){
	return Ajax.post('/users/users/?put',payload)
}
//上传附件
export function post_file(payload) {
    return Ajax.post('/appfile/appfile/',payload);
}