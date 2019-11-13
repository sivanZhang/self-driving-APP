import Ajax from '../libs/http'
//查看通知
export function look_Notice(params) {
	return Ajax.get('/notice/notice/', {params})
}
//修改通知
export function update_Notice(payload) {
	return Ajax.post('/notice/notice/?put', payload)
}
//删除通知
export function delete_Notice(payload){
	return Ajax.get('/notice/notice/?delete', payload)
}