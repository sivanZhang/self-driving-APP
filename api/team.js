import Ajax from '../libs/http'
// 创建搭伴
export function CREATE_TEAM(payload) {
    return Ajax.post('/partner/partner/', payload)
};
//搭伴详情
export function QUERY_TEAMDETAIL(params){
	return Ajax.get('/partner/partner/',{params})
}
//修改搭伴
export function EDIT_TEAM(payload){
	return Ajax.post('/partner/partner/',payload)
}
//删除搭伴
export function DELETE_TEAM(payload){
	return Ajax.post('/partner/partner/?delete',payload)
}
//申请搭伴
export function APPLY_TEAM(payload){
	return Ajax.post('/partner/apply/',payload)
}
//取消搭伴申请
export function DELETEAPPLY_TEAM(payload){
	return Ajax.post('/partner/apply/',payload)
}
//搭伴处理
export function HANDLE_TEAM(payload){
	return Ajax.post('/partner/handle/',payload)
}



