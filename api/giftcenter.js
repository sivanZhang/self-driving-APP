import Ajax from '../libs/http'
//查看礼品
export function query_GiftDetail(payload){
	return Ajax.get('/product/product/',{payload})
}
//查看礼品规格
export function look_GiftDetail(params){
	return Ajax.get('/product/specifications/',{params})
}