import Ajax from '../libs/http'
//查看礼品
export function query_GiftDetail(params){
	return Ajax.get('/product/product/',{params})
}
//查看礼品规格
export function look_GiftDetail(params){
	return Ajax.get('/product/specifications/',{params})
}