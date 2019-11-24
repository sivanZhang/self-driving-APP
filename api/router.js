import Ajax from '../libs/http'
//路线详情
export function queryRouterDetail(params){
	return Ajax.get('/line/line/',{params})
}
//添加路线
export function createRouterDetail(payload) {
    return Ajax.post('/line/line/', payload)
};
//删除路线
export function deleteRouter(payload){
	return Ajax.post('/line/line/?delete',payload)
}
//修改路线
export function editRouter(payload){
	return Ajax.post('/line/line/?put',payload)
}
