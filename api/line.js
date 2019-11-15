import Ajax from '../libs/http'
//路线详情
export function query_LineDetail(payload){
	return Ajax.get('/line/line/',{payload})
}